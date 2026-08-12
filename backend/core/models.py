from django.db import models
from django.utils.text import slugify

class ProductCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)

    class Meta:
        verbose_name_plural = "Product Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name="products")
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    image_url = models.URLField(blank=True, null=True, help_text="Fallback web URL or CDN path if no file is uploaded")
    featured = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - ₹{self.price}"


class Store(models.Model):
    FORMAT_CHOICES = [
        ('Street', 'Street Format'),
        ('Premium', 'Premium Experience'),
    ]

    name = models.CharField(max_length=150)
    format = models.CharField(max_length=20, choices=FORMAT_CHOICES)
    location = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="stores/", blank=True, null=True)
    image_url = models.URLField(blank=True, null=True, help_text="Fallback store image URL")
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.get_format_display()})"


class BusinessMetric(models.Model):
    metric_name = models.CharField(max_length=100)
    metric_value = models.CharField(max_length=100, help_text="Value like 250,000+ or 85%")
    unit = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.metric_name}: {self.metric_value} {self.unit}"


class GrowthPhase(models.Model):
    phase_number = models.IntegerField(unique=True)
    title = models.CharField(max_length=100)
    stores = models.CharField(max_length=50)
    revenue = models.CharField(max_length=100)
    formula = models.CharField(max_length=150, help_text="Formula representation like 100 * ₹36L")
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['phase_number']

    def __str__(self):
        return f"Phase {self.phase_number}: {self.title}"


class FinancialMetric(models.Model):
    name = models.CharField(max_length=100, help_text="COGS, Rent, Salary, Marketing, Others, EBITDA")
    percentage = models.DecimalField(max_digits=5, decimal_places=2, help_text="Percentage from 0 to 100")
    daily_value = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    monthly_value = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.percentage}%)"


class ContactInquiry(models.Model):
    INQUIRY_CHOICES = [
        ('Franchise', 'Franchise Partner'),
        ('Investment', 'Investment'),
        ('Partnership', 'Partnership'),
        ('General', 'General Inquiry'),
    ]
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Reviewed', 'Reviewed'),
        ('Archived', 'Archived'),
    ]

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    inquiry_type = models.CharField(max_length=20, choices=INQUIRY_CHOICES)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')

    class Meta:
        verbose_name_plural = "Contact Inquiries"
        ordering = ['-created_at']

    def __str__(self):
        return f"Inquiry from {self.name} ({self.inquiry_type}) - {self.status}"


class SiteSettings(models.Model):
    logo_url = models.URLField(blank=True, null=True, help_text="URL of logo image")
    hero_image = models.ImageField(upload_to="site/", blank=True, null=True)
    hero_image_url = models.URLField(blank=True, null=True, help_text="Fallback hero image URL")
    tagline = models.CharField(max_length=250, default="HOT & CRISPY")
    phone = models.CharField(max_length=50, default="+91 XXXXX XXXXX")
    email = models.EmailField(default="hello@samosawala.co")
    address = models.TextField(default="India")
    cta_text = models.CharField(max_length=100, default="PARTNER WITH US")
    facebook_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return "Site Settings configuration"
