from django.urls import path
from . import views

app_name = 'enquiries'
urlpatterns = [
    path('contact/', views.contact, name='contact'),
    path('franchise/', views.franchise, name='franchise'),
]
