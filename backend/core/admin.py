from django.contrib import admin
from .models import (
    ProductCategory, Product, Store, BusinessMetric,
    GrowthPhase, FinancialMetric, ContactInquiry, SiteSettings
)

@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'featured', 'active', 'display_order')
    list_editable = ('price', 'featured', 'active', 'display_order')
    list_filter = ('category', 'featured', 'active')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ('name', 'format', 'location', 'active')
    list_editable = ('active',)
    list_filter = ('format', 'active')
    search_fields = ('name', 'location', 'description')


@admin.register(BusinessMetric)
class BusinessMetricAdmin(admin.ModelAdmin):
    list_display = ('metric_name', 'metric_value', 'unit', 'display_order')
    list_editable = ('metric_value', 'unit', 'display_order')
    search_fields = ('metric_name', 'description')


@admin.register(GrowthPhase)
class GrowthPhaseAdmin(admin.ModelAdmin):
    list_display = ('phase_number', 'title', 'stores', 'revenue', 'formula')
    list_editable = ('title', 'stores', 'revenue', 'formula')
    search_fields = ('title',)


@admin.register(FinancialMetric)
class FinancialMetricAdmin(admin.ModelAdmin):
    list_display = ('name', 'percentage', 'daily_value', 'monthly_value')
    list_editable = ('percentage', 'daily_value', 'monthly_value')
    search_fields = ('name',)


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'inquiry_type', 'status', 'created_at')
    list_editable = ('status',)
    list_filter = ('inquiry_type', 'status', 'created_at')
    search_fields = ('name', 'email', 'phone', 'message')
    readonly_fields = ('name', 'email', 'phone', 'inquiry_type', 'message', 'created_at')

    def has_add_permission(self, request):
        return False  # Inquiries should only come from frontend submissions


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ('tagline', 'phone', 'email', 'address', 'cta_text')
    
    def has_add_permission(self, request):
        # Limit to a single settings instance
        if SiteSettings.objects.exists():
            return False
        return True

    def has_delete_permission(self, request, obj=None):
        return False
