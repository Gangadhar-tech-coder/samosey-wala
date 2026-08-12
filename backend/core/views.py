from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (
    ProductCategory, Product, Store, BusinessMetric,
    GrowthPhase, FinancialMetric, ContactInquiry, SiteSettings
)
from .serializers import (
    ProductCategorySerializer, ProductSerializer, StoreSerializer,
    BusinessMetricSerializer, GrowthPhaseSerializer, FinancialMetricSerializer,
    ContactInquirySerializer, SiteSettingsSerializer
)

class ProductCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(active=True)
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        category_slug = self.request.query_params.get('category', None)
        if category_slug is not None:
            queryset = queryset.filter(category__slug=category_slug)
        return queryset


class StoreViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Store.objects.filter(active=True)
    serializer_class = StoreSerializer


class BusinessMetricViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BusinessMetric.objects.all()
    serializer_class = BusinessMetricSerializer


class GrowthPhaseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GrowthPhase.objects.all()
    serializer_class = GrowthPhaseSerializer


class FinancialMetricViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FinancialMetric.objects.all()
    serializer_class = FinancialMetricSerializer


class ContactInquiryCreateView(generics.CreateAPIView):
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquirySerializer

    def create(self, request, *args, **kwargs):
        # Allow creating contact inquiry with support for custom inquiries
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Message sent successfully.", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Unable to send. Please try again.", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class SiteSettingsView(APIView):
    def get(self, request, *args, **kwargs):
        settings = SiteSettings.objects.first()
        if not settings:
            # Create default settings if they do not exist
            settings = SiteSettings.objects.create(
                tagline="HOT & CRISPY",
                phone="+91 XXXXX XXXXX",
                email="hello@samosawala.co",
                address="India",
                cta_text="PARTNER WITH US"
            )
        serializer = SiteSettingsSerializer(settings, context={'request': request})
        return Response(serializer.data)
