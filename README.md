# SAMOSEY WALA – Premium Restaurant Website

**Brand Tagline:** HOT AND CRISPY  
**Brand Positioning:** Premium Quality. Affordable Price. Hygienic Food.  
**Business Category:** Indian Quick Service Restaurant (QSR)  

---

## 1. Overview
A production-grade, responsive, server-rendered Django web application for **SAMOSEY WALA** built from scratch without external frontend frameworks (Django templates, custom CSS design system matching the official 3D logo, Bootstrap 5 utilities, Swiper.js, AOS, and Font Awesome).

### Official Brand Color Palette
- **Primary Brand Color (Flame Orange):** `#FF5500` / `#D84000` *(matches the 3D logo background)*
- **Deep Brown / Charcoal:** `#140C08` / `#18120F`
- **Warm Milk/Cream:** `#FFF9F5`
- **Golden Accent:** `#FFB347`
- **White:** `#FFFFFF`

### Typography
- **Headings & Editorial:** *Playfair Display*
- **Body & Brand Controls:** *Poppins*

---

## 2. Local Development Setup

### 2.1 Prerequisites
- Python 3.10+
- Git

### 2.2 Install Dependencies
```bash
pip install -r requirements.txt
```

### 2.3 Local Environment Variables
Create or verify `.env` in the root folder:
```ini
SECRET_KEY=django-insecure-samosey-wala-super-secret-key-12345
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,testserver
CSRF_TRUSTED_ORIGINS=http://localhost:8000,http://127.0.0.1:8000
WHATSAPP_NUMBER=919398115836
```

### 2.4 Run Database Migrations & Seed Data
```bash
python manage.py migrate
python seed_data.py
```
*Default Admin Credentials:* `admin` / `admin123`

### 2.5 Run Unit Tests
```bash
python manage.py test
```
All 15 test suites will run and pass with `OK`.

### 2.6 Start the Local Server
```bash
python manage.py runserver
```
Visit: `http://127.0.0.1:8000/`

---

## 3. Render Production Deployment Guide

This project is fully pre-configured for seamless 1-click or manual deployment on **Render**.

### 3.1 Architecture on Render
- **Web Service:** Python 3.10 runtime running **Gunicorn** (`config.wsgi:application`).
- **Static Asset Serving:** **WhiteNoise** with `CompressedManifestStaticFilesStorage` (pre-compressed, cached, and hashed static files).
- **Database:** Render Managed **PostgreSQL** (`DATABASE_URL`), with seamless fallback to SQLite locally.
- **Media Storage:** Configured to support persistent storage (Render Disk or AWS S3).
- **Security:** HSTS, SSL redirect, secure session and CSRF cookies, XSS protection, and dynamic `ALLOWED_HOSTS` & `CSRF_TRUSTED_ORIGINS` bound to Render's URL.

---

### 3.2 Step-by-Step Deployment Instructions

#### Step 1: Create a PostgreSQL Database on Render
1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** → **PostgreSQL**.
3. Name: `samosey-wala-db`
4. Database Name: `samosey_db`
5. User: `samosey_user`
6. Region: Select your closest region (e.g. *Singapore* or *Oregon*).
7. Plan: **Free**.
8. Click **Create Database**.
9. Once created, copy the **Internal Database URL** (or External URL).

#### Step 2: Create a Web Service on Render
1. Click **New +** → **Web Service**.
2. Select **Build and deploy from a Git repository**.
3. Connect your repository: `Gangadhar-tech-coder/samosey-wala`.
4. Fill in the service configuration:
   - **Name:** `samosey-wala`
   - **Region:** Same region as your PostgreSQL database.
   - **Branch:** `main`
   - **Root Directory:** *(leave blank)*
   - **Runtime:** `Python 3`
   - **Build Command:**
     ```bash
     ./build.sh
     ```
   - **Start Command:**
     ```bash
     gunicorn config.wsgi:application
     ```
   - **Plan:** **Free**.

#### Step 3: Configure Environment Variables on Render
Under the **Environment** tab of your new Web Service, add the following environment variables:

| Key | Recommended Value | Notes |
|---|---|---|
| `PYTHON_VERSION` | `3.10.10` | Ensures Python 3.10 runtime |
| `DEBUG` | `False` | Disables debug mode for security |
| `SECRET_KEY` | *(Click "Generate" in Render or use a long random string)* | Required |
| `DATABASE_URL` | *(Paste the Internal Database URL from Step 1)* | Connects PostgreSQL |
| `ALLOWED_HOSTS` | `.onrender.com,localhost` | Render hostname |
| `CSRF_TRUSTED_ORIGINS` | `https://*.onrender.com` | Prevents CSRF errors on forms |
| `WHATSAPP_NUMBER` | `919398115836` | Restaurant ordering WhatsApp |

*(Note: `RENDER_EXTERNAL_HOSTNAME` is automatically provided by Render, and the application will dynamically whitelist it in `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS`.)*

#### Step 4: Deploy
1. Click **Create Web Service**.
2. Render will automatically execute `./build.sh`:
   - Installs packages from `requirements.txt`.
   - Runs `collectstatic` with WhiteNoise.
   - Runs `migrate` to create database tables on PostgreSQL.
   - Runs `seed_data.py` to populate initial categories, products, site settings, and the default admin (`admin`/`admin123`).
3. Your website will be live at `https://samosey-wala.onrender.com`!

---

### 3.3 Creating an Admin User on Render
To create a personalized superuser on your live production database:
1. Go to your Web Service in Render.
2. Click the **Shell** tab on the left menu.
3. Run:
   ```bash
   python manage.py createsuperuser
   ```
4. Follow the prompts to set your custom username, email, and password.

---

### 3.4 Persistent Media Storage (Optional AWS S3)
By default, food images committed to the repository (in `media/` and `static/`) are served automatically. If you plan to upload new product photos via the Django Admin in production, add these variables in Render:
- `USE_S3=True`
- `AWS_ACCESS_KEY_ID=<your-key>`
- `AWS_SECRET_ACCESS_KEY=<your-secret>`
- `AWS_STORAGE_BUCKET_NAME=<your-bucket-name>`
- `AWS_S3_REGION_NAME=ap-south-1`

---

## 4. Testing & Verification Checklist
- [x] Production settings pass `python manage.py check --deploy` with 0 warnings.
- [x] All 15 unit tests pass (`python manage.py test`).
- [x] WhiteNoise collects and hashes all 158 static assets.
- [x] PostgreSQL & SQLite dual database compatibility via `dj-database-url`.
- [x] Gunicorn WSGI production server configured.
