import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'samosey_project.settings')
django.setup()

from django.contrib.auth.models import User
from core.models import (
    ProductCategory, Product, Store, BusinessMetric,
    GrowthPhase, FinancialMetric, SiteSettings
)

def seed():
    print("Seeding database...")

    # 1. Create Superuser if it doesn't exist
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser("admin", "admin@samosawala.co", "admin123")
        print("Created superuser: admin / admin123")

    # 2. Site Settings
    SiteSettings.objects.all().delete()
    site_settings = SiteSettings.objects.create(
        tagline="HOT & CRISPY",
        phone="+91 XXXXX XXXXX",
        email="hello@samosawala.co",
        address="India",
        cta_text="PARTNER WITH US",
        logo_url="https://raw.githubusercontent.com/antigravity-qsr/assets/main/logo.png",
        hero_image_url="https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=1200&auto=format&fit=crop" # Premium samosa frying
    )
    print("Created Site Settings.")

    # 3. Product Categories
    ProductCategory.objects.all().delete()
    categories_data = ["Samosa", "Tea", "Coffee", "Chaats", "Premium Snacks"]
    categories = {}
    for cat_name in categories_data:
        cat = ProductCategory.objects.create(name=cat_name)
        categories[cat_name] = cat
        print(f"Created category: {cat_name}")

    # 4. Products
    Product.objects.all().delete()
    products_data = [
        # Samosas
        {
            "name": "Classic Aloo Samosa",
            "category": categories["Samosa"],
            "price": 20.00,
            "description": "Our signature crispy golden pastry stuffed with spiced mashed potatoes, green peas, and authentic Indian herbs.",
            "image_url": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600",
            "featured": True,
            "display_order": 1
        },
        {
            "name": "Cheese & Corn Samosa",
            "category": categories["Samosa"],
            "price": 30.00,
            "description": "A delicious modern twist featuring rich melted mozzarella cheese, sweet golden corn, and mild green chillies.",
            "image_url": "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=600",
            "featured": True,
            "display_order": 2
        },
        {
            "name": "Paneer Tikka Samosa",
            "category": categories["Samosa"],
            "price": 35.00,
            "description": "Richly spiced paneer chunks marinated in tandoori paste, stuffed inside a crispy triangular crust.",
            "image_url": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600",
            "featured": True,
            "display_order": 3
        },
        # Tea
        {
            "name": "Masala Chai",
            "category": categories["Tea"],
            "price": 15.00,
            "description": "Standard premium tea brewed with freshly crushed ginger, green cardamom pods, cloves, and cinnamon.",
            "image_url": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600",
            "featured": True,
            "display_order": 4
        },
        {
            "name": "Elaichi Chai",
            "category": categories["Tea"],
            "price": 15.00,
            "description": "Sweet milk tea infused with the refreshing fragrance and taste of premium green cardamoms.",
            "image_url": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600",
            "featured": False,
            "display_order": 5
        },
        # Coffee
        {
            "name": "Traditional Filter Coffee",
            "category": categories["Coffee"],
            "price": 20.00,
            "description": "Traditional South Indian style decoction coffee frothed with boiling hot milk.",
            "image_url": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600",
            "featured": True,
            "display_order": 6
        },
        # Chaats
        {
            "name": "Samosa Chaat",
            "category": categories["Chaats"],
            "price": 50.00,
            "description": "Crushed crispy samosas smothered with warm spicy chickpea gravy (ragda), sweetened yogurt, green coriander chutney, and sweet tamarind sauce.",
            "image_url": "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600",
            "featured": True,
            "display_order": 7
        },
        {
            "name": "Dahi Puri",
            "category": categories["Chaats"],
            "price": 45.00,
            "description": "Puris loaded with boiled potatoes, custom spice powders, sweet yogurt, sev, and coriander leaves.",
            "image_url": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600",
            "featured": False,
            "display_order": 8
        },
        # Premium Snacks
        {
            "name": "Bread Pakora",
            "category": categories["Premium Snacks"],
            "price": 25.00,
            "description": "Sliced bread coated with spiced chickpea flour batter (besan) and deep-fried to a perfect golden brown.",
            "image_url": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600",
            "featured": False,
            "display_order": 9
        }
    ]

    for prod_info in products_data:
        Product.objects.create(**prod_info)
        print(f"Created product: {prod_info['name']}")

    # 5. Stores
    Store.objects.all().delete()
    stores_data = [
        {
            "name": "Noida Sector 62 Grab & Go",
            "format": "Street",
            "location": "Noida, UP",
            "description": "A compact kiosk designed for high footfall corporate areas. Offers lightning fast grab-and-go service of hot samosas and piping hot chai.",
            "image_url": "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=600",
            "active": True
        },
        {
            "name": "Connaught Place Flagship Café",
            "format": "Premium",
            "location": "New Delhi",
            "description": "Our premium full-service dine-in cafe. Features comfortable, premium seating, a warm modern ambiance, and our entire premium snack menu including premium chaats.",
            "image_url": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600",
            "active": True
        }
    ]
    for store_info in stores_data:
        Store.objects.create(**store_info)
        print(f"Created store: {store_info['name']}")

    # 6. Business Metrics
    BusinessMetric.objects.all().delete()
    metrics_data = [
        {
            "metric_name": "Indian Snacks Market",
            "metric_value": "250,000+",
            "unit": "Cr",
            "description": "The massive, fast-growing Indian snack and street food market.",
            "display_order": 1
        },
        {
            "metric_name": "Samosas Consumed",
            "metric_value": "Millions",
            "unit": "/day",
            "description": "Samosas remain the absolute default choice of snack across India.",
            "display_order": 2
        },
        {
            "metric_name": "Unorganised Market",
            "metric_value": "85",
            "unit": "%",
            "description": "The current market is highly fragmented and dominated by local unhygienic vendors, representing a massive consolidation opportunity.",
            "display_order": 3
        },
        {
            "metric_name": "Organised Segment",
            "metric_value": "Fast-Growing",
            "unit": "",
            "description": "Rising demand for certified, hygienic, zero-preservative branded snacks.",
            "display_order": 4
        }
    ]
    for metric_info in metrics_data:
        BusinessMetric.objects.create(**metric_info)
        print(f"Created metric: {metric_info['metric_name']}")

    # 7. Growth Phases
    GrowthPhase.objects.all().delete()
    phases_data = [
        {
            "phase_number": 1,
            "title": "Own Outlet",
            "stores": "1 Store",
            "revenue": "₹36 Lakhs",
            "formula": "1 × ₹36L",
            "display_order": 1
        },
        {
            "phase_number": 2,
            "title": "Establish Foothold",
            "stores": "10 Stores",
            "revenue": "₹3.6 Crore",
            "formula": "10 × ₹36L",
            "display_order": 2
        },
        {
            "phase_number": 3,
            "title": "Regional Expansion",
            "stores": "100 Stores",
            "revenue": "₹36 Crore",
            "formula": "100 × ₹36L",
            "display_order": 3
        },
        {
            "phase_number": 4,
            "title": "National Presence",
            "stores": "500 Stores",
            "revenue": "₹180 Crore",
            "formula": "500 × ₹36L",
            "display_order": 4
        },
        {
            "phase_number": 5,
            "title": "Market Dominance",
            "stores": "1000+ Stores",
            "revenue": "₹360+ Crore",
            "formula": "1000+ × ₹36L",
            "display_order": 5
        }
    ]
    for phase_info in phases_data:
        GrowthPhase.objects.create(**phase_info)
        print(f"Created growth phase: {phase_info['title']}")

    # 8. Financial Metrics
    FinancialMetric.objects.all().delete()
    financials_data = [
        {"name": "COGS", "percentage": 50.00, "daily_value": 5000.00, "monthly_value": 150000.00},
        {"name": "Rent", "percentage": 15.00, "daily_value": 1500.00, "monthly_value": 45000.00},
        {"name": "Salary", "percentage": 15.00, "daily_value": 1500.00, "monthly_value": 45000.00},
        {"name": "Marketing", "percentage": 3.00, "daily_value": 300.00, "monthly_value": 9000.00},
        {"name": "Others", "percentage": 2.00, "daily_value": 200.00, "monthly_value": 6000.00},
        {"name": "EBITDA", "percentage": 15.00, "daily_value": 1500.00, "monthly_value": 45000.00},
    ]
    for fin_info in financials_data:
        FinancialMetric.objects.create(**fin_info)
        print(f"Created financial metric: {fin_info['name']}")

    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed()
