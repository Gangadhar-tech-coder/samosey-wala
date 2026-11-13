from django.shortcuts import render
from products.models import Product, Category
from .models import Testimonial


def home(request):
    featured_products = Product.objects.filter(
        is_featured=True, is_available=True
    )[:8]
    categories = Category.objects.filter(is_active=True)
    testimonials = Testimonial.objects.filter(is_active=True)
    context = {
        'featured_products': featured_products,
        'categories': categories,
        'testimonials': testimonials,
    }
    return render(request, 'core/home.html', context)


def about(request):
    return render(request, 'core/about.html')
