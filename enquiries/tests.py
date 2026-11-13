from django.test import TestCase, Client
from django.urls import reverse
from enquiries.models import ContactEnquiry, FranchiseEnquiry


class EnquiriesViewsTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_contact_get(self):
        url = reverse('enquiries:contact')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'core/contact.html')

    def test_contact_post_valid(self):
        url = reverse('enquiries:contact')
        data = {
            'name': 'Rahul Verma',
            'email': 'rahul@example.com',
            'phone': '9876543210',
            'subject': 'Bulk Catering Query',
            'message': 'Need 200 samosas for an event.'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(ContactEnquiry.objects.filter(email='rahul@example.com').exists())

    def test_contact_post_invalid(self):
        url = reverse('enquiries:contact')
        data = {
            'name': '',
            'email': 'rahul@example.com',
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 200)
        self.assertFalse(ContactEnquiry.objects.filter(email='rahul@example.com').exists())

    def test_franchise_get(self):
        url = reverse('enquiries:franchise')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'core/franchise.html')

    def test_franchise_post_valid(self):
        url = reverse('enquiries:franchise')
        data = {
            'full_name': 'Amit Patel',
            'email': 'amit@example.com',
            'phone': '9123456789',
            'city': 'Ahmedabad',
            'state': 'Gujarat',
            'preferred_location': 'SG Highway',
            'message': 'Interested in opening a franchise outlet.'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(FranchiseEnquiry.objects.filter(email='amit@example.com').exists())
