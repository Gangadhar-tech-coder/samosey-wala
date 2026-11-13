# SAMOSEY WALA – Premium Restaurant Website

**Brand Tagline:** HOT AND CRISPY  
**Brand Positioning:** Premium Quality. Affordable Price. Hygienic Food.  
**Business Category:** Indian Quick Service Restaurant (QSR)  

---

## 1. Overview
A production-ready, responsive, server-rendered Django web application for **SAMOSEY WALA** built from scratch without external frontend frameworks (using Django templates, custom CSS, Bootstrap 5 utilities, Swiper.js, AOS, and Font Awesome).

### Official Brand Color Palette
- **Primary Brand Color (Copper Brown):** `#A15B23` / `rgb(161, 91, 35)`
- **Deep Brown:** `#542B18`
- **Burnt Orange:** `#C66A27`
- **Warm Cream:** `#FAF6EF`
- **Golden Accent:** `#E8C99D`
- **Charcoal:** `#211C18`
- **White:** `#FFFFFF`

### Typography
- **Headings & Editorial:** *Playfair Display*
- **Body & Controls:** *Poppins*

---

## 2. Project Architecture
```text
Samosa/
├── manage.py
├── requirements.txt
├── .env.example
├── .env
├── db.sqlite3
├── seed_data.py
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
├── core/
│   ├── models.py             (SiteConfiguration, Testimonial)
│   ├── admin.py
│   ├── views.py              (Home, About)
│   ├── urls.py
│   ├── context_processors.py (Global site configuration)
│   └── tests.py
├── products/
│   ├── models.py             (Category, Product)
│   ├── admin.py
│   ├── views.py              (Menu view, JSON API)
│   ├── urls.py
│   └── tests.py
├── orders/
│   ├── models.py             (Order, OrderItem)
│   ├── admin.py
│   ├── views.py              (Order Online page, WhatsApp Place Order POST)
│   ├── urls.py
│   └── tests.py
├── enquiries/
│   ├── models.py             (ContactEnquiry, FranchiseEnquiry)
│   ├── admin.py
│   ├── views.py              (Contact & Franchise form handling)
│   ├── urls.py
│   └── tests.py
├── templates/
│   ├── base.html
│   ├── includes/
│   │   ├── navbar.html
│   │   ├── footer.html
│   │   └── whatsapp_button.html
│   ├── core/
│   │   ├── home.html         (11 sections including Hero, Bestsellers, etc.)
│   │   ├── about.html
│   │   ├── contact.html
│   │   └── franchise.html
│   ├── products/
│   │   └── menu.html
│   └── orders/
│       └── order.html
├── static/
│   ├── css/
│   │   ├── style.css
│   │   ├── components.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js           (Navbar scroll, Swiper sliders, Toast notifications)
│   │   ├── menu.js           (Menu filtering, localStorage cart sync)
│   │   └── cart.js           (Cart management & WhatsApp checkout flow)
│   └── images/
└── media/
    └── products/
```

---

## 3. Installation & Local Development Setup

### 3.1 Prerequisites
- Python 3.10+ installed
- Pip and virtualenv (recommended)

### 3.2 Install Dependencies
```bash
pip install -r requirements.txt
```

### 3.3 Configure Environment Variables
Copy `.env.example` to `.env` if not already present:
```bash
copy .env.example .env
```

Contents of `.env`:
```ini
SECRET_KEY=django-insecure-samosey-wala-super-secret-key-12345
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,testserver
WHATSAPP_NUMBER=919999999999
```

### 3.4 Run Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 3.5 Seed Initial Data & Create Admin Account
A seed script is provided that populates initial categories, products with images, site configuration, customer testimonials, and an administrator account:
```bash
python seed_data.py
```
**Default Admin Credentials:**
- **Username:** `admin`
- **Password:** `admin123`

You can also create a custom superuser at any time:
```bash
python manage.py createsuperuser
```

### 3.6 Run Unit Tests
```bash
python manage.py test
```
All 15 test suites across `core`, `products`, `orders`, and `enquiries` should execute and pass with `OK`.

### 3.7 Start the Development Server
```bash
python manage.py runserver
```
Visit the website at: **`http://127.0.0.1:8000/`**  
Django Admin dashboard: **`http://127.0.0.1:8000/admin/`**

---

## 4. Key Pages & Features

1. **Home (`/`)**:
   - Sticky navbar with brand logo, smooth transitions, and mobile drawer.
   - High-impact Hero section with brand taglines and CTA buttons.
   - Brand story & highlights ("Not Just a Samosa. It's an Experience").
   - Customer Favourites / Bestseller carousel with Swiper.js.
   - Food Category showcase.
   - Why Choose Us & Food Philosophy blocks.
   - Promotional callouts and Testimonials slider.
   - Contact info preview and rich dark chocolate footer.
   - Floating WhatsApp button with animated pulse.

2. **About Us (`/about/`)**:
   - Brand storytelling, vision & mission, hygiene & preparation standards, and speciality items.

3. **Menu (`/menu/`)**:
   - Dynamic product grid fetched via Django ORM.
   - Category filtering (All, Classic, Special, Fusion, Fries, Chaats, Beverages).
   - Real-time search query filtering.
   - Veg / Non-Veg badge indicators.
   - "Add to Cart" integration updating localStorage and navbar badge.

4. **Order Online (`/order/`)**:
   - Product selection with live interactive cart sidebar.
   - Increment/decrement quantity controls and subtotal calculation.
   - Pickup vs. Delivery toggle with conditional address requirement.
   - WhatsApp order formatting: Submits order to Django SQLite database and redirects customer to WhatsApp with a pre-filled, formatted order summary.

5. **Contact Us (`/contact/`)**:
   - Restaurant location, operating hours, and inquiry form with server-side validation and database persistence.

6. **Franchise Enquiry (`/franchise/`)**:
   - Store models, partner benefits, and dedicated franchise lead generation form saved to SQLite.

---

## 5. Django Admin Management

Access `http://127.0.0.1:8000/admin/` to manage:
- **Site Configuration:** Business hours, phone, address, and WhatsApp ordering number.
- **Products & Categories:** Upload food photography, set prices, mark items as featured or veg/non-veg, and toggle stock availability.
- **Orders:** View real-time customer orders, items ordered, delivery preferences, and update fulfillment status (Pending, Confirmed, Preparing, Ready, Delivered, Cancelled).
- **Enquiries:** Review Contact and Franchise submissions.

---

## 6. Production Deployment Preparation
- Set `DEBUG=False` in `.env`.
- Provide a secure, unique `SECRET_KEY`.
- Set your production domain in `ALLOWED_HOSTS`.
- Run `python manage.py collectstatic`.
- Serve using WSGI (Gunicorn / uWSGI) behind Nginx or via standard Python hosting platforms.

