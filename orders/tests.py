import json
from decimal import Decimal
from django.test import TestCase, Client
from django.urls import reverse
from products.models import Category, Product
from orders.models import Order, OrderItem


class OrdersViewsTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.category = Category.objects.create(name='Snacks', slug='snacks')
        self.product = Product.objects.create(
            category=self.category,
            name='Crispy Samosa',
            slug='crispy-samosa',
            price=Decimal('25.00'),
            is_available=True
        )

    def test_order_page_view(self):
        url = reverse('orders:order_page')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'orders/order.html')
        self.assertIn('products_by_category', response.context)

    def test_place_order_success(self):
        url = reverse('orders:place_order')
        payload = {
            'customer_name': 'Ramesh Kumar',
            'phone': '9876543210',
            'email': 'ramesh@example.com',
            'delivery_type': 'pickup',
            'address': '',
            'special_instructions': 'Extra mint chutney please',
            'items': [
                {
                    'product_id': self.product.id,
                    'name': self.product.name,
                    'price': str(self.product.price),
                    'quantity': 3
                }
            ]
        }
        response = self.client.post(
            url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('order_id', data)
        self.assertIn('whatsapp_url', data)
        self.assertTrue(
            data['whatsapp_url'].startswith('https://api.whatsapp.com/send') or
            data['whatsapp_url'].startswith('https://wa.me/')
        )

        # Verify DB records
        order = Order.objects.get(order_id=data['order_id'])
        self.assertEqual(order.customer_name, 'Ramesh Kumar')
        self.assertEqual(order.total_amount, Decimal('75.00'))
        self.assertEqual(order.items.count(), 1)
        item = order.items.first()
        self.assertEqual(item.quantity, 3)
        self.assertEqual(item.price, Decimal('25.00'))
        self.assertEqual(item.subtotal, Decimal('75.00'))

    def test_place_order_empty_cart(self):
        url = reverse('orders:place_order')
        payload = {
            'customer_name': 'Ramesh Kumar',
            'phone': '9876543210',
            'items': []
        }
        response = self.client.post(
            url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'Cart is empty')

    def test_place_order_missing_name(self):
        url = reverse('orders:place_order')
        payload = {
            'customer_name': '',
            'phone': '9876543210',
            'items': [{'product_id': self.product.id, 'quantity': 1}]
        }
        response = self.client.post(
            url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
