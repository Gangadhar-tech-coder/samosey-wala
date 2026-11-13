from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class SiteConfiguration(models.Model):
    site_name = models.CharField(max_length=200, default='Samosey Wala')
    tagline = models.CharField(max_length=200, default='Hot and Crispy')
    phone = models.CharField(max_length=20, default='+91 XXXXX XXXXX')
    email = models.EmailField(default='info@samoseywala.com')
    address = models.TextField(default='[Address to be configured]')
    whatsapp_number = models.CharField(max_length=20, default='919999999999')
    business_hours = models.CharField(max_length=200, default='10:00 AM - 10:00 PM')
    google_maps_embed = models.TextField(blank=True)
    facebook_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)

    class Meta:
        verbose_name = 'Site Configuration'
        verbose_name_plural = 'Site Configuration'

    def save(self, *args, **kwargs):
        # singleton pattern
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def get_config(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return self.site_name


class Testimonial(models.Model):
    customer_name = models.CharField(max_length=100)
    rating = models.IntegerField(
        default=5,
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    review = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.customer_name
