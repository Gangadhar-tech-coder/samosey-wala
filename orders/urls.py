from django.urls import path
from . import views

app_name = 'orders'
urlpatterns = [
    path('', views.order_page, name='order_page'),
    path('place/', views.place_order, name='place_order'),
]
