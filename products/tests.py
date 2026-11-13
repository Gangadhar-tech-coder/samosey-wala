from django.test import TestCase, Client
from django.urls import reverse
from products.models import Category, Product


class ProductsViewsTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.cat1 = Category.objects.create(name='Classic', slug='classic', display_order=1)
        self.cat2 = Category.objects.create(name='Fusion', slug='fusion', display_order=2)
        self.prod1 = Product.objects.create(
            category=self.cat1,
            name='Classic Aloo',
            slug='classic-aloo',
            price=20.00,
            is_available=True
        )
        self.prod2 = Product.objects.create(
            category=self.cat2,
            name='Paneer Tikka',
            slug='paneer-tikka',
            price=40.00,
            is_available=True
        )

    def test_menu_view(self):
        url = reverse('products:menu')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'products/menu.html')
        self.assertEqual(len(response.context['products']), 2)

    def test_menu_category_filter(self):
        url = reverse('products:menu') + '?category=classic'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context['products']), 1)
        self.assertEqual(response.context['products'][0].name, 'Classic Aloo')

    def test_menu_search_filter(self):
        url = reverse('products:menu') + '?search=Paneer'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context['products']), 1)
        self.assertEqual(response.context['products'][0].name, 'Paneer Tikka')

    def test_product_api(self):
        url = reverse('products:product_api')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['name'], 'Classic Aloo')
