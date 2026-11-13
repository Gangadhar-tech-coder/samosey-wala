from django.contrib import admin
from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'display_order')
    list_editable = ('display_order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'category', 'price', 'is_vegetarian',
        'is_featured', 'is_available',
    )
    list_filter = ('category', 'is_vegetarian', 'is_featured', 'is_available')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('price', 'is_featured', 'is_available')
