from django.urls import path
from . import views

app_name = 'products'
urlpatterns = [
    path('', views.menu, name='menu'),
    path('api/products/', views.product_api, name='product_api'),
]
