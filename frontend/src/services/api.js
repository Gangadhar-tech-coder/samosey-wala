import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Premium mock data matching Django seeder exactly for robust offline fallback
const MOCK_DATA = {
  products: [
    {
      id: 1,
      name: "Classic Aloo Samosa",
      category_name: "Samosa",
      price: 20.00,
      description: "Our signature crispy golden pastry stuffed with spiced mashed potatoes, green peas, and authentic Indian herbs.",
      image_display: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600",
      featured: true
    },
    {
      id: 2,
      name: "Cheese & Corn Samosa",
      category_name: "Samosa",
      price: 30.00,
      description: "A delicious modern twist featuring rich melted mozzarella cheese, sweet golden corn, and mild green chillies.",
      image_display: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=600",
      featured: true
    },
    {
      id: 3,
      name: "Paneer Tikka Samosa",
      category_name: "Samosa",
      price: 35.00,
      description: "Richly spiced paneer chunks marinated in tandoori paste, stuffed inside a crispy triangular crust.",
      image_display: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600",
      featured: true
    },
    {
      id: 4,
      name: "Masala Chai",
      category_name: "Tea",
      price: 15.00,
      description: "Standard premium tea brewed with freshly crushed ginger, green cardamom pods, cloves, and cinnamon.",
      image_display: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600",
      featured: true
    },
    {
      id: 5,
      name: "Elaichi Chai",
      category_name: "Tea",
      price: 15.00,
      description: "Sweet milk tea infused with the refreshing fragrance and taste of premium green cardamoms.",
      image_display: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600",
      featured: false
    },
    {
      id: 6,
      name: "Traditional Filter Coffee",
      category_name: "Coffee",
      price: 20.00,
      description: "Traditional South Indian style decoction coffee frothed with boiling hot milk.",
      image_display: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600",
      featured: true
    },
    {
      id: 7,
      name: "Samosa Chaat",
      category_name: "Chaats",
      price: 50.00,
      description: "Crushed crispy samosas smothered with warm spicy chickpea gravy (ragda), sweetened yogurt, green coriander chutney, and sweet tamarind sauce.",
      image_display: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600",
      featured: true
    },
    {
      id: 8,
      name: "Dahi Puri",
      category_name: "Chaats",
      price: 45.00,
      description: "Puris loaded with boiled potatoes, custom spice powders, sweet yogurt, sev, and coriander leaves.",
      image_display: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600",
      featured: false
    },
    {
      id: 9,
      name: "Bread Pakora",
      category_name: "Premium Snacks",
      price: 25.00,
      description: "Sliced bread coated with spiced chickpea flour batter (besan) and deep-fried to a perfect golden brown.",
      image_display: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600",
      featured: false
    }
  ],
  categories: [
    { id: 1, name: "Samosa", slug: "samosa" },
    { id: 2, name: "Tea", slug: "tea" },
    { id: 3, name: "Coffee", slug: "coffee" },
    { id: 4, name: "Chaats", slug: "chaats" },
    { id: 5, name: "Premium Snacks", slug: "premium-snacks" }
  ],
  stores: [
    {
      id: 1,
      name: "Noida Sector 62 Grab & Go",
      format_display: "Street Format",
      location: "Noida, UP",
      description: "A compact kiosk designed for high footfall corporate areas. Offers lightning fast grab-and-go service of hot samosas and piping hot chai.",
      image_display: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=600"
    },
    {
      id: 2,
      name: "Connaught Place Flagship Café",
      format_display: "Premium Experience",
      location: "New Delhi",
      description: "Our premium full-service dine-in cafe. Features comfortable, premium seating, a warm modern ambiance, and our entire premium snack menu including premium chaats.",
      image_display: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600"
    }
  ],
  metrics: [
    { metric_name: "Indian Snacks Market", metric_value: "250,000+", unit: "Cr", description: "The massive, fast-growing Indian snack and street food market." },
    { metric_name: "Samosas Consumed", metric_value: "Millions", unit: "/day", description: "Samosas remain the absolute default choice of snack across India." },
    { metric_name: "Unorganised Market", metric_value: "85", unit: "%", description: "The current market is highly fragmented and dominated by local unhygienic vendors, representing a massive consolidation opportunity." },
    { metric_name: "Organised Segment", metric_value: "Fast-Growing", unit: "", description: "Rising demand for certified, hygienic, zero-preservative branded snacks." }
  ],
  phases: [
    { phase_number: 1, title: "Own Outlet", stores: "1 Store", revenue: "₹36 Lakhs", formula: "1 × ₹36L" },
    { phase_number: 2, title: "Establish Foothold", stores: "10 Stores", revenue: "₹3.6 Crore", formula: "10 × ₹36L" },
    { phase_number: 3, title: "Regional Expansion", stores: "100 Stores", revenue: "₹36 Crore", formula: "100 × ₹36L" },
    { phase_number: 4, title: "National Presence", stores: "500 Stores", revenue: "₹180 Crore", formula: "500 × ₹36L" },
    { phase_number: 5, title: "Market Dominance", stores: "1000+ Stores", revenue: "₹360+ Crore", formula: "1000+ × ₹36L" }
  ],
  financials: [
    { name: "COGS", percentage: 50.00, daily_value: 5000.00, monthly_value: 150000.00 },
    { name: "Rent", percentage: 15.00, daily_value: 1500.00, monthly_value: 45000.00 },
    { name: "Salary", percentage: 15.00, daily_value: 1500.00, monthly_value: 45000.00 },
    { name: "Marketing", percentage: 3.00, daily_value: 300.00, monthly_value: 9000.00 },
    { name: "Others", percentage: 2.00, daily_value: 200.00, monthly_value: 6000.00 },
    { name: "EBITDA", percentage: 15.00, daily_value: 1500.00, monthly_value: 45000.00 }
  ],
  settings: {
    tagline: "HOT & CRISPY",
    phone: "+91 XXXXX XXXXX",
    email: "hello@samosawala.co",
    address: "India",
    cta_text: "PARTNER WITH US",
    logo_display: "https://raw.githubusercontent.com/antigravity-qsr/assets/main/logo.png",
    hero_image_display: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=1200&auto=format&fit=crop"
  }
};

export const apiService = {
  async getProducts() {
    try {
      const response = await apiClient.get('/products/');
      return response.data;
    } catch (error) {
      console.warn('API getProducts failed, using mock data:', error.message);
      return MOCK_DATA.products;
    }
  },

  async getCategories() {
    try {
      const response = await apiClient.get('/categories/');
      return response.data;
    } catch (error) {
      console.warn('API getCategories failed, using mock data:', error.message);
      return MOCK_DATA.categories;
    }
  },

  async getStores() {
    try {
      const response = await apiClient.get('/stores/');
      return response.data;
    } catch (error) {
      console.warn('API getStores failed, using mock data:', error.message);
      return MOCK_DATA.stores;
    }
  },

  async getBusinessMetrics() {
    try {
      const response = await apiClient.get('/business-metrics/');
      return response.data;
    } catch (error) {
      console.warn('API getBusinessMetrics failed, using mock data:', error.message);
      return MOCK_DATA.metrics;
    }
  },

  async getGrowthStrategy() {
    try {
      const response = await apiClient.get('/growth-strategy/');
      return response.data;
    } catch (error) {
      console.warn('API getGrowthStrategy failed, using mock data:', error.message);
      return MOCK_DATA.phases;
    }
  },

  async getFinancialMetrics() {
    try {
      const response = await apiClient.get('/financial-metrics/');
      return response.data;
    } catch (error) {
      console.warn('API getFinancialMetrics failed, using mock data:', error.message);
      return MOCK_DATA.financials;
    }
  },

  async getSiteSettings() {
    try {
      const response = await apiClient.get('/site-settings/');
      return response.data;
    } catch (error) {
      console.warn('API getSiteSettings failed, using mock data:', error.message);
      return MOCK_DATA.settings;
    }
  },

  async submitContactInquiry(data) {
    try {
      const response = await apiClient.post('/contact/', data);
      return response.data;
    } catch (error) {
      console.error('API submitContactInquiry failed:', error);
      // Simulate successful submission locally in offline mode for demonstration
      if (error.code === 'ERR_NETWORK' || error.message.includes('timeout')) {
        return {
          message: "Message sent successfully (Offline Mock).",
          data: data
        };
      }
      throw error.response?.data || error;
    }
  }
};
