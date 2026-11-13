from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('subtotal',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'order_id', 'customer_name', 'phone', 'delivery_type',
        'total_amount', 'status', 'created_at',
    )
    list_filter = ('status', 'delivery_type', 'created_at')
    search_fields = ('order_id', 'customer_name', 'phone', 'email')
    readonly_fields = ('order_id',)
    inlines = [OrderItemInline]
