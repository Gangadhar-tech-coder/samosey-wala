import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import SiteConfiguration, Testimonial
from products.models import Category, Product


def run_seed():
    print("Seeding SiteConfiguration...")
    config = SiteConfiguration.get_config()
    config.site_name = "Samosey Wala"
    config.tagline = "Hot and Crispy Samosas"
    config.phone = "+91 93981 15836"
    config.email = "hello@samoseywala.com"
    config.address = "Shop #12, Food Street, Connaught Place, New Delhi - 110001"
    config.whatsapp_number = "919398115836"
    config.business_hours = "10:00 AM - 10:00 PM (Daily)"
    config.facebook_url = "https://www.facebook.com/share/1FCbzKgvAb/"
    config.instagram_url = "https://www.instagram.com/samoseywala?obrf=bDJmM3h2amJoM29t"
    config.google_maps_embed = "https://share.google/4vIexwh28SNf4u6KO"
    config.twitter_url = "https://twitter.com/samoseywala"
    config.youtube_url = "https://youtube.com/samoseywala"
    config.save()

    print("Seeding Testimonials...")
    testimonials_data = [
        {
            "customer_name": "Aarav Sharma",
            "rating": 5,
            "review": "The Paneer Tikka Samosa here is absolute magic! Fresh, piping hot, and full of flavour.",
            "is_active": True,
        },
        {
            "customer_name": "Pooja Verma",
            "rating": 5,
            "review": "Best Samosa Chaat in the city without a doubt. Crispy samosas soaked in tangy chole with mint chutney!",
            "is_active": True,
        },
        {
            "customer_name": "Rohan Mehta",
            "rating": 5,
            "review": "Ordered for our office evening snacks party via WhatsApp — quick delivery and everyone loved the Cheese Corn samosas!",
            "is_active": True,
        },
        {
            "customer_name": "Simran Kaur",
            "rating": 4,
            "review": "Chocolate Samosa was surprisingly delicious! And their kulhad chai is heavenly.",
            "is_active": True,
        },
    ]
    for t_data in testimonials_data:
        Testimonial.objects.get_or_create(
            customer_name=t_data["customer_name"],
            defaults=t_data,
        )

    print("Seeding Categories...")
    categories_data = [
        {
            "name": "Classic Samosas",
            "slug": "classic-samosas",
            "description": "Traditional recipe samosas with authentic potato and spice stuffing.",
            "display_order": 1,
            "is_active": True,
        },
        {
            "name": "Fusion Samosas",
            "slug": "fusion-samosas",
            "description": "Modern twists featuring cheese, paneer, pizza, and international flavours.",
            "display_order": 2,
            "is_active": True,
        },
        {
            "name": "Sweet Samosas",
            "slug": "sweet-samosas",
            "description": "Decadent dessert samosas stuffed with chocolate and mawa.",
            "display_order": 3,
            "is_active": True,
        },
        {
            "name": "Chaats & Sides",
            "slug": "chaats-sides",
            "description": "Crispy samosas served with spicy chole, dahi, and tangy chutneys.",
            "display_order": 4,
            "is_active": True,
        },
        {
            "name": "Chai & Beverages",
            "slug": "beverages",
            "description": "Piping hot tea, kulhad chai, and refreshing cool drinks.",
            "display_order": 5,
            "is_active": True,
        },
    ]

    cat_map = {}
    for c_data in categories_data:
        cat, _ = Category.objects.get_or_create(
            slug=c_data["slug"],
            defaults=c_data,
        )
        cat_map[c_data["slug"]] = cat

    print("Seeding Products...")
    products_data = [
        {
            "category": cat_map["classic-samosas"],
            "name": "Classic Aloo Samosa",
            "slug": "classic-aloo-samosa",
            "description": "Golden crispy crust stuffed with spiced potatoes, green peas, and fragrant cumin.",
            "price": "20.00",
            "image": "products/aloo_samosa.png",
            "is_vegetarian": True,
            "is_featured": True,
            "is_available": True,
        },
        {
            "category": cat_map["classic-samosas"],
            "name": "Punjabi Masala Samosa",
            "slug": "punjabi-masala-samosa",
            "description": "Big, hearty Punjabi style samosa with crushed coriander seeds, anardana, and cashews.",
            "price": "25.00",
            "image": "products/special_samosa.png",
            "is_vegetarian": True,
            "is_featured": True,
            "is_available": True,
        },
        {
            "category": cat_map["fusion-samosas"],
            "name": "Paneer Tikka Samosa",
            "slug": "paneer-tikka-samosa",
            "description": "Marinated paneer cubes in tandoori spices and capsicum wrapped in a crunchy crust.",
            "price": "40.00",
            "image": "products/paneer_samosa.png",
            "is_vegetarian": True,
            "is_featured": True,
            "is_available": True,
        },
        {
            "category": cat_map["fusion-samosas"],
            "name": "Cheese Corn Samosa",
            "slug": "cheese-corn-samosa",
            "description": "Melted mozzarella, sweet golden corn, and herbs in every cheesy bite.",
            "price": "45.00",
            "image": "products/cheese_corn.png",
            "is_vegetarian": True,
            "is_featured": True,
            "is_available": True,
        },
        {
            "category": cat_map["fusion-samosas"],
            "name": "Pizza Samosa",
            "slug": "pizza-samosa",
            "description": "Loaded with Italian herbs, tomato concasse, olives, jalapenos, and melted cheese.",
            "price": "50.00",
            "image": "products/special_samosa.png",
            "is_vegetarian": True,
            "is_featured": True,
            "is_available": True,
        },
        {
            "category": cat_map["sweet-samosas"],
            "name": "Chocolate Samosa",
            "slug": "chocolate-samosa",
            "description": "Rich molten Belgian chocolate filling served warm with powdered sugar dusting.",
            "price": "35.00",
            "is_vegetarian": True,
            "is_featured": True,
            "is_available": True,
        },
        {
            "category": cat_map["chaats-sides"],
            "name": "Delhi Samosa Chaat",
            "slug": "delhi-samosa-chaat",
            "description": "Crushed samosas topped with spicy chole, chilled sweet curd, mint chutney, and sev.",
            "price": "60.00",
            "image": "products/samosa_chaat.png",
            "is_vegetarian": True,
            "is_featured": True,
            "is_available": True,
        },
        {
            "category": cat_map["chaats-sides"],
            "name": "Chole Samosa",
            "slug": "chole-samosa",
            "description": "Two hot samosas served with rich Amritsari chole gravy and pickled onions.",
            "price": "55.00",
            "is_vegetarian": True,
            "is_featured": False,
            "is_available": True,
        },
        {
            "category": cat_map["beverages"],
            "name": "Special Masala Chai",
            "slug": "special-masala-chai",
            "description": "Freshly brewed milk tea infused with crushed cardamom, ginger, and cloves.",
            "price": "20.00",
            "is_vegetarian": True,
            "is_featured": True,
            "is_available": True,
        },
        {
            "category": cat_map["beverages"],
            "name": "Kulhad Ginger Chai",
            "slug": "kulhad-ginger-chai",
            "description": "Steaming hot ginger chai served in an authentic earthen clay kulhad.",
            "price": "25.00",
            "is_vegetarian": True,
            "is_featured": False,
            "is_available": True,
        },
        {
            "category": cat_map["beverages"],
            "name": "Mango Lassi",
            "slug": "mango-lassi",
            "description": "Thick and creamy yogurt blended with Alphonso mango pulp and cardamom.",
            "price": "50.00",
            "is_vegetarian": True,
            "is_featured": True,
            "is_available": True,
        },
    ]

    for p_data in products_data:
        Product.objects.get_or_create(
            slug=p_data["slug"],
            defaults=p_data,
        )

    print(f"Seed complete! Categories: {Category.objects.count()}, Products: {Product.objects.count()}, Testimonials: {Testimonial.objects.count()}")


if __name__ == "__main__":
    run_seed()
