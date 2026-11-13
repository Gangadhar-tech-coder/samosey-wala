/**
 * Samosey Wala - Menu Page JavaScript
 */

const CART_STORAGE_KEY = 'sw_cart';

// Cart Helper Functions
function getCart() {
    try {
        const cartJson = localStorage.getItem(CART_STORAGE_KEY);
        return cartJson ? JSON.parse(cartJson) : [];
    } catch (e) {
        console.error('Error reading cart from localStorage', e);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        updateCartBadge();
    } catch (e) {
        console.error('Error saving cart to localStorage', e);
    }
}

function updateCartBadge() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 0), 0);
    
    let badges = document.querySelectorAll('.cart-badge');
    if (badges.length === 0) {
        const cartIcons = document.querySelectorAll('.nav-cart-icon, [data-cart-icon]');
        cartIcons.forEach(icon => {
            const badge = document.createElement('span');
            badge.className = 'cart-badge';
            icon.appendChild(badge);
        });
        badges = document.querySelectorAll('.cart-badge');
    }

    badges.forEach(badge => {
        badge.textContent = totalCount;
        badge.style.display = totalCount > 0 ? 'inline-flex' : 'none';
    });
}

function addToCart(id, name, price, image) {
    const cart = getCart();
    const cleanId = String(id);
    const numPrice = parseFloat(price) || 0;
    
    const existingIndex = cart.findIndex(item => String(item.id) === cleanId);
    if (existingIndex > -1) {
        cart[existingIndex].quantity = (parseInt(cart[existingIndex].quantity, 10) || 1) + 1;
    } else {
        cart.push({
            id: cleanId,
            name: name || 'Samosa Item',
            price: numPrice,
            image: image || '',
            quantity: 1
        });
    }

    saveCart(cart);

    if (typeof showToast === 'function') {
        showToast(`Added "${name}" to cart!`, 'success');
    } else {
        alert(`Added ${name} to cart!`);
    }
}

// Export for other scripts if needed
window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.updateCartBadge = updateCartBadge;

document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();

    // Event delegation for Add to Cart buttons
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn-add-cart');
        if (!btn) return;
        
        e.preventDefault();
        const id = btn.getAttribute('data-id') || btn.dataset.id;
        const name = btn.getAttribute('data-name') || btn.dataset.name || 'Item';
        const price = btn.getAttribute('data-price') || btn.dataset.price || '0';
        const image = btn.getAttribute('data-image') || btn.dataset.image || '';

        addToCart(id, name, price, image);
    });

    // Category Filtering
    const filterButtons = document.querySelectorAll('.category-filter .filter-btn');
    const productItems = document.querySelectorAll('.menu-item-col, .product-card-col, [data-category]');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter') || 'all';

            productItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category') || '';
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Search Filtering
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();

            productItems.forEach(item => {
                const title = item.querySelector('.card-title, h5, h4')?.textContent?.toLowerCase() || '';
                const desc = item.querySelector('.card-text, p')?.textContent?.toLowerCase() || '';

                if (title.includes(query) || desc.includes(query)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});
