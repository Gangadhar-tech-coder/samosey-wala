/**
 * Samosey Wala - Cart & Order Management JavaScript
 */

const CART_KEY = 'sw_cart';

// -----------------------------------------------------------------------------
// Cart State & Helper Functions
// -----------------------------------------------------------------------------
function getCart() {
    try {
        const cartJson = localStorage.getItem(CART_KEY);
        return cartJson ? JSON.parse(cartJson) : [];
    } catch (e) {
        console.error('Error reading cart from localStorage', e);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
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

function calculateSubtotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + ((parseFloat(item.price) || 0) * (parseInt(item.quantity, 10) || 1)), 0);
}

function calculateTotal() {
    return calculateSubtotal();
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
    renderCart();

    if (typeof showToast === 'function') {
        showToast(`Added "${name}" to cart!`, 'success');
    }
}

function removeFromCart(id) {
    let cart = getCart();
    const cleanId = String(id);
    const item = cart.find(i => String(i.id) === cleanId);
    cart = cart.filter(i => String(i.id) !== cleanId);
    saveCart(cart);
    renderCart();

    if (typeof showToast === 'function' && item) {
        showToast(`Removed "${item.name}" from cart`, 'info');
    }
}

function updateQuantity(id, change) {
    const cart = getCart();
    const cleanId = String(id);
    const item = cart.find(i => String(i.id) === cleanId);
    
    if (item) {
        let currentQty = parseInt(item.quantity, 10) || 1;
        let newQty = currentQty + change;
        if (newQty < 1) newQty = 1; // min 1
        item.quantity = newQty;
        saveCart(cart);
        renderCart();
    }
}

// -----------------------------------------------------------------------------
// Render Cart UI
// -----------------------------------------------------------------------------
function renderCart() {
    const container = document.querySelector('.cart-items-container');
    if (!container) return;

    const cart = getCart();
    const subtotalEl = document.querySelector('.cart-subtotal, #cart-subtotal');
    const totalEl = document.querySelector('.cart-total-amount, #cart-total, .total-amount');
    const placeOrderBtn = document.querySelector('#place-order-btn, .btn-place-order');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty.</p>
                <a href="/menu/" class="btn btn-outline-sw btn-sm mt-2">Explore Menu</a>
            </div>
        `;
        if (subtotalEl) subtotalEl.textContent = '₹0.00';
        if (totalEl) totalEl.textContent = '₹0.00';
        if (placeOrderBtn) {
            placeOrderBtn.disabled = true;
            placeOrderBtn.classList.add('disabled');
        }
        return;
    }

    if (placeOrderBtn) {
        placeOrderBtn.disabled = false;
        placeOrderBtn.classList.remove('disabled');
    }

    let itemsHtml = '';
    cart.forEach(item => {
        const itemSubtotal = (parseFloat(item.price) || 0) * (parseInt(item.quantity, 10) || 1);
        itemsHtml += `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">₹${parseFloat(item.price).toFixed(2)}</div>
                </div>
                <div class="qty-controls">
                    <button type="button" class="btn-qty-minus" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                    <span class="item-qty">${item.quantity}</span>
                    <button type="button" class="btn-qty-plus" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
                </div>
                <div class="item-subtotal text-end" style="min-width: 60px;">
                    <div class="fw-bold">₹${itemSubtotal.toFixed(2)}</div>
                </div>
                <button type="button" class="remove-item" data-action="remove" data-id="${item.id}" title="Remove item" aria-label="Remove item">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    });

    container.innerHTML = itemsHtml;

    const total = calculateTotal();
    if (subtotalEl) subtotalEl.textContent = `₹${total.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `₹${total.toFixed(2)}`;
}

// -----------------------------------------------------------------------------
// Utilities: CSRF Token & WhatsApp Message Fallback
// -----------------------------------------------------------------------------
function getCSRFToken() {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, 10) === 'csrftoken=') {
                cookieValue = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }
    if (!cookieValue) {
        const csrfInput = document.querySelector('input[name="csrfmiddlewaretoken"]');
        if (csrfInput) cookieValue = csrfInput.value;
    }
    return cookieValue;
}

function formatWhatsAppMessageFallback(orderData, total) {
    let msg = `*New Order - Samosey Wala*\n`;
    msg += `--------------------------\n`;
    msg += `*Customer:* ${orderData.customer_name}\n`;
    msg += `*Phone:* ${orderData.phone}\n`;
    if (orderData.email) msg += `*Email:* ${orderData.email}\n`;
    msg += `*Order Type:* ${orderData.delivery_type === 'delivery' ? 'Home Delivery' : 'Takeaway / Pickup'}\n`;
    if (orderData.delivery_type === 'delivery' && orderData.address) {
        msg += `*Address:* ${orderData.address}\n`;
    }
    if (orderData.special_instructions) {
        msg += `*Instructions:* ${orderData.special_instructions}\n`;
    }
    msg += `--------------------------\n`;
    msg += `*Items Ordered:*\n`;
    orderData.items.forEach(item => {
        msg += `• ${item.name} x ${item.quantity} - ₹${((parseFloat(item.price) || 0) * item.quantity).toFixed(2)}\n`;
    });
    msg += `--------------------------\n`;
    msg += `*Total Amount:* ₹${total.toFixed(2)}\n`;
    return encodeURIComponent(msg);
}

// -----------------------------------------------------------------------------
// Place Order Handler
// -----------------------------------------------------------------------------
async function handlePlaceOrder(e) {
    if (e) e.preventDefault();

    const cart = getCart();
    if (!cart || cart.length === 0) {
        if (typeof showToast === 'function') {
            showToast('Your cart is empty! Please add some delicious samosas first.', 'error');
        } else {
            alert('Your cart is empty!');
        }
        return;
    }

    // Grab form fields
    const nameInput = document.querySelector('#customer-name, input[name="customer_name"], input[name="name"]');
    const phoneInput = document.querySelector('#customer-phone, input[name="customer_phone"], input[name="phone"]');
    const emailInput = document.querySelector('#customer-email, input[name="customer_email"], input[name="email"]');
    const addressInput = document.querySelector('#delivery-address, textarea[name="delivery_address"], textarea[name="address"]');
    const instructionsInput = document.querySelector('#special-instructions, textarea[name="special_instructions"], textarea[name="instructions"]');
    
    // Delivery type (radio, select, or default to pickup)
    let deliveryType = 'pickup';
    const deliveryTypeRadio = document.querySelector('input[name="delivery_type"]:checked');
    const deliveryTypeSelect = document.querySelector('select[name="delivery_type"], #delivery-type');
    if (deliveryTypeRadio) {
        deliveryType = deliveryTypeRadio.value;
    } else if (deliveryTypeSelect) {
        deliveryType = deliveryTypeSelect.value;
    }

    const customerName = nameInput ? nameInput.value.trim() : '';
    const customerPhone = phoneInput ? phoneInput.value.trim() : '';
    const customerEmail = emailInput ? emailInput.value.trim() : '';
    const deliveryAddress = addressInput ? addressInput.value.trim() : '';
    const specialInstructions = instructionsInput ? instructionsInput.value.trim() : '';

    // Validation
    if (!customerName) {
        if (typeof showToast === 'function') showToast('Please enter your full name.', 'error');
        if (nameInput) nameInput.focus();
        return;
    }

    if (!customerPhone || customerPhone.length < 7) {
        if (typeof showToast === 'function') showToast('Please enter a valid phone number.', 'error');
        if (phoneInput) phoneInput.focus();
        return;
    }

    if (deliveryType === 'delivery' && !deliveryAddress) {
        if (typeof showToast === 'function') showToast('Please enter your delivery address.', 'error');
        if (addressInput) addressInput.focus();
        return;
    }

    // Prepare payload
    const orderItems = cart.map(item => ({
        id: item.id,
        product_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
    }));

    const orderData = {
        customer_name: customerName,
        name: customerName,
        phone: customerPhone,
        customer_phone: customerPhone,
        email: customerEmail,
        customer_email: customerEmail,
        delivery_type: deliveryType,
        address: deliveryAddress,
        delivery_address: deliveryAddress,
        special_instructions: specialInstructions,
        items: orderItems
    };

    // Determine place order endpoint
    const urlInput = document.querySelector('#place-order-url');
    const formElement = document.querySelector('#order-form, .order-form');
    const placeOrderUrl = urlInput ? urlInput.value : (formElement?.getAttribute('action') || '/order/place/');

    const placeOrderBtn = document.querySelector('#place-order-btn, .btn-place-order');
    let originalBtnHtml = '';
    if (placeOrderBtn) {
        originalBtnHtml = placeOrderBtn.innerHTML;
        placeOrderBtn.disabled = true;
        placeOrderBtn.innerHTML = '<span class="spinner-sw spinner-sw-sm spinner-sw-light me-2"></span> Processing...';
    }

    try {
        const response = await fetch(placeOrderUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken() || '',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (response.ok && (data.success !== false)) {
            // Success
            if (typeof showToast === 'function') {
                showToast('Order placed successfully!', 'success');
            }

            // WhatsApp Redirection
            let targetWhatsAppUrl = data.whatsapp_url;
            if (!targetWhatsAppUrl) {
                const whatsappNumber = document.querySelector('#whatsapp-number')?.value || '919398115836';
                const formattedMsg = formatWhatsAppMessageFallback(orderData, calculateTotal());
                targetWhatsAppUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${formattedMsg}`;
            }

            // Redirect / Open WhatsApp
            window.location.href = targetWhatsAppUrl;

            // Clear cart
            localStorage.removeItem(CART_KEY);
            updateCartBadge();
            renderCart();

            // Reset form if present
            if (formElement) formElement.reset();

            // If order confirmation URL or redirect returned
            if (data.redirect_url) {
                setTimeout(() => {
                    window.location.href = data.redirect_url;
                }, 1500);
            }
        } else {
            const errorMsg = data.error || data.message || 'Failed to place order. Please try again.';
            if (typeof showToast === 'function') {
                showToast(errorMsg, 'error');
            } else {
                alert(errorMsg);
            }
        }
    } catch (err) {
        console.error('Order submission error:', err);
        if (typeof showToast === 'function') {
            showToast('Network error while placing order. Please try again.', 'error');
        } else {
            alert('Network error while placing order.');
        }
    } finally {
        if (placeOrderBtn) {
            placeOrderBtn.disabled = false;
            placeOrderBtn.innerHTML = originalBtnHtml;
        }
    }
}

// -----------------------------------------------------------------------------
// Initialization & Event Listeners
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    renderCart();

    // Event delegation for cart actions (Quantity + / -, Remove)
    document.addEventListener('click', function(e) {
        // Decrease quantity
        const btnMinus = e.target.closest('.btn-qty-minus, [data-action="decrease"]');
        if (btnMinus) {
            e.preventDefault();
            const id = btnMinus.getAttribute('data-id');
            if (id) updateQuantity(id, -1);
            return;
        }

        // Increase quantity
        const btnPlus = e.target.closest('.btn-qty-plus, [data-action="increase"]');
        if (btnPlus) {
            e.preventDefault();
            const id = btnPlus.getAttribute('data-id');
            if (id) updateQuantity(id, 1);
            return;
        }

        // Remove item
        const btnRemove = e.target.closest('.remove-item, [data-action="remove"]');
        if (btnRemove) {
            e.preventDefault();
            const id = btnRemove.getAttribute('data-id');
            if (id) removeFromCart(id);
            return;
        }

        // Add to cart button on order page
        const btnAdd = e.target.closest('.btn-add-cart');
        if (btnAdd) {
            e.preventDefault();
            const id = btnAdd.getAttribute('data-id') || btnAdd.dataset.id;
            const name = btnAdd.getAttribute('data-name') || btnAdd.dataset.name || 'Item';
            const price = btnAdd.getAttribute('data-price') || btnAdd.dataset.price || '0';
            const image = btnAdd.getAttribute('data-image') || btnAdd.dataset.image || '';
            addToCart(id, name, price, image);
            return;
        }

        // Place order button
        const btnOrder = e.target.closest('#place-order-btn, .btn-place-order');
        if (btnOrder) {
            e.preventDefault();
            handlePlaceOrder(e);
            return;
        }
    });

    // Delivery type change toggle for address container
    const deliveryRadios = document.querySelectorAll('input[name="delivery_type"]');
    const addressContainer = document.querySelector('#address-container, .address-group');
    if (deliveryRadios.length > 0 && addressContainer) {
        deliveryRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'delivery') {
                    addressContainer.style.display = 'block';
                } else {
                    addressContainer.style.display = 'none';
                }
            });
        });
    }

    const deliverySelect = document.querySelector('select[name="delivery_type"], #delivery-type');
    if (deliverySelect && addressContainer) {
        deliverySelect.addEventListener('change', function() {
            if (this.value === 'delivery') {
                addressContainer.style.display = 'block';
            } else {
                addressContainer.style.display = 'none';
            }
        });
    }
});

// Export functions for global access
window.renderCart = renderCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.handlePlaceOrder = handlePlaceOrder;
