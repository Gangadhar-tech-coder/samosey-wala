# SAMOSEY WALA — Premium QSR Business Website

A complete, production-quality business website and investor prospectus application for **Samosey Wala** — a premium Indian QSR (Quick Service Restaurant) snacking brand built around **Quality, Hygiene, Freshness, and Affordability**.

The application translates the Samosey Wala Business Project Report into an interactive digital story using scroll-driven animations, dynamic financial models, and a robust Django REST API backend.

---

## 🛠️ Technology Stack

* **Frontend:** React.js, Tailwind CSS v4, Lucide Icons, Axios
* **Backend:** Django, Django REST Framework (DRF), django-cors-headers, python-dotenv
* **Database:** PostgreSQL (Production support via `DATABASE_URL` environment variables) / SQLite (Local development fallback)
* **Animation:** GSAP (GreenSock Animation Platform) + ScrollTrigger

---

## 📁 Repository Structure

```
samosey-wala/
├── backend/                   # Django Backend Project
│   ├── core/                  # Django REST API application (models, views, serializers)
│   ├── samosey_project/       # Django Project configuration settings
│   ├── venv/                  # Local Python virtual environment
│   ├── db.sqlite3             # Seeded Local Database
│   ├── .env                   # Local Environment variables
│   ├── .env.example           # Example Environment variables template
│   ├── requirements.txt       # Python package dependencies
│   └── seed_data.py           # Database seeder containing report data
├── frontend/                  # React Frontend Project (Vite-based)
│   ├── src/
│   │   ├── components/        # UI/UX interactive animation components
│   │   │   ├── Navbar.jsx          # Glassmorphic nav + scroll progress bar
│   │   │   ├── Hero.jsx            # 16-fragment scroll-pinned shatter animation
│   │   │   ├── ProblemSolution.jsx # Narrative intro + clip-path split screen reveal
│   │   │   ├── FeatureGrid.jsx     # 3x3 sequential stagger card reveals
│   │   │   ├── FoodShowcase.jsx    # Cinematic product scroll & zoom showcase
│   │   │   ├── MarketOpportunity.jsx # Scroll-driven GSAP number counter stats
│   │   │   ├── CompetitionTable.jsx  # Interactive competitive landscape comparisons
│   │   │   ├── BusinessModel.jsx    # FOCO SVG connector lifeline drawing
│   │   │   ├── StoreFormats.jsx     # Parallax slide comparison of kiosks vs cafes
│   │   │   ├── StoreGallery.jsx     # Horizontal scroll gallery (swipes on mobile)
│   │   │   ├── RevenueSection.jsx   # Revenue projections & Interactive calculator
│   │   │   ├── ProfitSection.jsx    # EBITDA donut chart drawing animation
│   │   │   ├── GrowthTimeline.jsx   # Horizontal growth progress timeline
│   │   │   ├── FounderSection.jsx   # Word-by-word visionary text reveal
│   │   │   ├── ContactSection.jsx   # Franchise inquiry contact form validation
│   │   │   └── Footer.jsx           # Minimal dark footer
│   │   ├── services/
│   │   │   └── api.js              # API client with offline mock fallback
│   │   ├── App.jsx            # Main app shell & API state coordinator
│   │   └── index.css          # Core CSS typography & Tailwind v4 themes
│   ├── .env                   # Frontend API configurations
│   ├── .env.example           # Frontend configurations template
│   ├── package.json           # Node package dependencies
│   └── vite.config.js         # Vite configuration with Tailwind v4 plugin
└── README.md                  # Project setup documentation
```

---

## ⚡ Development Setup

### 1. Backend Setup (Django)

1. Open a terminal in the `backend/` directory:
   ```bash
   cd backend
   ```
2. Activate the pre-created virtual environment:
   * **Windows Powershell:**
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   * **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```
3. Install dependencies (if they are not already installed):
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Populate the database with the report's business data:
   ```bash
   python seed_data.py
   ```
   * *This seeds all categories, products, stores, site settings, and financial metrics, and creates a default superuser.*
6. Start the backend development server:
   ```bash
   python manage.py runserver
   ```
   * The API will run locally at `http://localhost:8000/api/`

#### 🔑 Admin Credentials
* **Username:** `admin`
* **Password:** `admin123`
* **Admin Panel:** `http://localhost:8000/admin/`

---

### 2. Frontend Setup (React)

1. Open a terminal in the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   * The website will run locally at `http://localhost:5173/`
4. Build for production (to check compilation and minification):
   ```bash
   npm run build
   ```

---

## 🎬 Animation Flow & Storyboarding

The website is engineered around a cohesive, scroll-driven visual story:

1. **HERO SECTION:** A full-viewport visual of premium Samosa frying is pinned. As the user scrolls, the image splits into 16 distinct rotating fragments (6 on mobile for optimization) that disperse outwards, revealing the core brand statements behind.
2. **NARRATIVE INTRO:** Follows the path from street food problems to the franchise opportunity, sliding up sequentially.
3. **PROBLEM & PROMISE:** A scroll-pinned split-screen panel. A vertical divider sweeps across from right to left using a GSAP `clip-path` mask, transforming a dark street food warning section into a clean, certified orange Samosey Wala promise section.
4. **CORE PILLARS:** A 3x3 card grid reveals sequential features (freshness, healthy oil monitoring, wheat-crust ratio) using GSAP staggers.
5. **FOOD SHOWCASE:** Pinned viewport gallery showcasing Samosas, Tea, Coffee, and Chaats. On scroll, images scale up and rotate, and ingredient badges fade in.
6. **MARKET OPPORTUNITY:** Giant counting animations that count up to ₹250,000+ Cr and ~85% unorganized market size as they enter the screen.
7. **FOCO MODEL:** An interactive flowchart where a glowing orange connecting SVG path line draws itself from left to right as the user scrolls, lighting up each card stage.
8. **STORE GALLERY:** Desktop users scroll vertically to slide a horizontal gallery of store storefronts and interiors. Mobile users can natively swipe this gallery.
9. **REVENUE & PROFIT:** A dynamic counter summing baseline daily totals to ₹10,000/day, paired with an interactive calculator. Below, a multi-segment SVG donut chart draws its margins (COGS 50%, Rent 15%, Salary 15%, EBITDA 15%) as it scrolls into focus.
10. **GROWTH TIMELINE:** Pins in viewport, translating a horizontal growth chart (from 1 outlet to 1,000+ stores) with drawing lines.
11. **FOUNDER VISION:** A cinematic quote section where words light up one by one from dark charcoal to bright white as the user scrolls, ending with the founder's bio.
