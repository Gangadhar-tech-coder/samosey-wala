from django.test import TestCase, Client
from django.urls import reverse
from core.models import SiteConfiguration, Testimonial
from products.models import Category, Product


class CoreViewsTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.config = SiteConfiguration.get_config()
        self.category = Category.objects.create(name='Classic', slug='classic')
        self.product = Product.objects.create(
            category=self.category,
            name='Aloo Samosa',
            slug='aloo-samosa',
            price=20.00,
            is_featured=True,
            is_available=True
        )
        self.testimonial = Testimonial.objects.create(
            customer_name='Aarav',
            rating=5,
            review='Delicious samosas!'
        )

    def test_home_view(self):
        url = reverse('core:home')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'core/home.html')
        self.assertIn('featured_products', response.context)
        self.assertIn('categories', response.context)
        self.assertIn('testimonials', response.context)
        self.assertIn('site_config', response.context)
        self.assertEqual(len(response.context['featured_products']), 1)

    def test_about_view(self):
        url = reverse('core:about')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'core/about.html')
