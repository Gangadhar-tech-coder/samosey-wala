import json
from decimal import Decimal
from urllib.parse import quote

from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_POST

from products.models import Product, Category
from .models import Order, OrderItem


def order_page(request):
    categories = Category.objects.filter(is_active=True).prefetch_related('products')
    products_by_category = []
    for cat in categories:
        prods = cat.products.filter(is_available=True)
        if prods.exists():
            products_by_category.append({
                'category': cat,
                'products': prods,
            })
    context = {
        'products_by_category': products_by_category,
    }
    return render(request, 'orders/order.html', context)


@require_POST
def place_order(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    cart_items = data.get('items', [])
    if not cart_items:
        return JsonResponse({'error': 'Cart is empty'}, status=400)

    customer_name = data.get('customer_name', '').strip()
    phone = data.get('phone', '').strip()
    email = data.get('email', '').strip()
    delivery_type = data.get('delivery_type', 'pickup')
    address = data.get('address', '').strip()
    special_instructions = data.get('special_instructions', '').strip()

    if not customer_name or not phone:
        return JsonResponse(
            {'error': 'Customer name and phone are required'}, status=400
        )

    # Create order
    order = Order.objects.create(
        customer_name=customer_name,
        phone=phone,
        email=email,
        delivery_type=delivery_type,
        address=address,
        special_instructions=special_instructions,
    )

    total = Decimal('0.00')
    message_lines = [
        f'🧾 *New Order: {order.order_id}*',
        f'👤 Name: {customer_name}',
        f'📞 Phone: {phone}',
        f'🚗 Type: {delivery_type.title()}',
    ]
    if address:
        message_lines.append(f'📍 Address: {address}')
    message_lines.append('')
    message_lines.append('*Items:*')

    for item in cart_items:
        product_id = item.get('product_id')
        quantity = int(item.get('quantity', 1))

        try:
            product = Product.objects.get(id=product_id, is_available=True)
        except Product.DoesNotExist:
            continue

        price = product.price
        subtotal = price * quantity
        total += subtotal

        OrderItem.objects.create(
            order=order,
            product=product,
            product_name=product.name,
            quantity=quantity,
            price=price,
            subtotal=subtotal,
        )
        message_lines.append(
            f'• {product.name} x{quantity} — ₹{subtotal}'
        )

    order.total_amount = total
    order.save()

    message_lines.append('')
    message_lines.append(f'*Total: ₹{total}*')
    if special_instructions:
        message_lines.append(f'📝 Instructions: {special_instructions}')

    import os
    from core.models import SiteConfiguration
    site_config = SiteConfiguration.get_config()
    # Prioritize environment variable if set on Render, then database, then hardcoded fallback
    whatsapp_number = os.environ.get('WHATSAPP_NUMBER') or site_config.whatsapp_number or '919398115836'
    # Sanitize whatsapp_number to only digits
    whatsapp_number = ''.join(c for c in str(whatsapp_number) if c.isdigit())
    if not whatsapp_number:
        whatsapp_number = '919398115836'

    message_text = '\n'.join(message_lines)
    whatsapp_url = f'https://api.whatsapp.com/send?phone={whatsapp_number}&text={quote(message_text)}'

    return JsonResponse({
        'order_id': order.order_id,
        'whatsapp_url': whatsapp_url,
    })
