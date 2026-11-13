from django.contrib import admin
from .models import SiteConfiguration, Testimonial


@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'phone', 'email')

    def has_add_permission(self, request):
        # Singleton: only allow add if none exists
        if SiteConfiguration.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'rating', 'is_active', 'created_at')
    list_filter = ('is_active', 'rating', 'created_at')
    search_fields = ('customer_name', 'review')
