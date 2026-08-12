from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductCategoryViewSet, ProductViewSet, StoreViewSet,
    BusinessMetricViewSet, GrowthPhaseViewSet, FinancialMetricViewSet,
    ContactInquiryCreateView, SiteSettingsView
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'categories', ProductCategoryViewSet, basename='category')
router.register(r'stores', StoreViewSet, basename='store')
router.register(r'business-metrics', BusinessMetricViewSet, basename='business-metric')
router.register(r'growth-strategy', GrowthPhaseViewSet, basename='growth-strategy')
router.register(r'financial-metrics', FinancialMetricViewSet, basename='financial-metric')

urlpatterns = [
    path('', include(router.urls)),
    path('site-settings/', SiteSettingsView.as_view(), name='site-settings'),
    path('contact/', ContactInquiryCreateView.as_view(), name='contact-inquiry'),
]
