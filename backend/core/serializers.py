from rest_framework import serializers
from .models import (
    ProductCategory, Product, Store, BusinessMetric,
    GrowthPhase, FinancialMetric, ContactInquiry, SiteSettings
)

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    image_display = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_image_display(self, obj):
        request = self.context.get('request')
        if obj.image:
            # Build full URL if request context is available
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url


class StoreSerializer(serializers.ModelSerializer):
    image_display = serializers.SerializerMethodField()
    format_display = serializers.CharField(source='get_format_display', read_only=True)

    class Meta:
        model = Store
        fields = '__all__'

    def get_image_display(self, obj):
        request = self.context.get('request')
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url


class BusinessMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessMetric
        fields = '__all__'


class GrowthPhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrowthPhase
        fields = '__all__'


class FinancialMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialMetric
        fields = '__all__'


class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = '__all__'
        read_only_fields = ('created_at', 'status')


class SiteSettingsSerializer(serializers.ModelSerializer):
    logo_display = serializers.SerializerMethodField()
    hero_image_display = serializers.SerializerMethodField()

    class Meta:
        model = SiteSettings
        fields = '__all__'

    def get_logo_display(self, obj):
        return obj.logo_url

    def get_hero_image_display(self, obj):
        request = self.context.get('request')
        if obj.hero_image:
            if request:
                return request.build_absolute_uri(obj.hero_image.url)
            return obj.hero_image.url
        return obj.hero_image_url
