from django.contrib import admin
from .models import ContactEnquiry, FranchiseEnquiry


@admin.register(ContactEnquiry)
class ContactEnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subject', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'phone', 'subject', 'message')
    readonly_fields = ('name', 'email', 'phone', 'subject', 'message', 'created_at')


@admin.register(FranchiseEnquiry)
class FranchiseEnquiryAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'city', 'state', 'created_at')
    list_filter = ('state', 'created_at')
    search_fields = ('full_name', 'email', 'phone', 'city', 'state')
    readonly_fields = (
        'full_name', 'email', 'phone', 'city', 'state',
        'preferred_location', 'message', 'created_at',
    )
