from django.shortcuts import render
from django.http import JsonResponse
from .models import Product, Category


def menu(request):
    categories = Category.objects.filter(is_active=True)
    products = Product.objects.filter(is_available=True).select_related('category')

    selected_category = request.GET.get('category', '')
    search_query = request.GET.get('search', '')

    if selected_category:
        products = products.filter(category__slug=selected_category)
    if search_query:
        products = products.filter(name__icontains=search_query)

    context = {
        'products': products,
        'categories': categories,
        'selected_category': selected_category,
        'search_query': search_query,
    }
    return render(request, 'products/menu.html', context)


def product_api(request):
    products = Product.objects.filter(is_available=True).select_related('category')
    data = []
    for p in products:
        data.append({
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'price': str(p.price),
            'image': p.image.url if p.image else '',
            'category': p.category.name,
            'is_vegetarian': p.is_vegetarian,
        })
    return JsonResponse(data, safe=False)
