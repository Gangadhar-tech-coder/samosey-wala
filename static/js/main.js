/**
 * Samosey Wala - Main JavaScript
 */

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-sw');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Cart badge helper used across pages
function updateGlobalCartBadge() {
    try {
        const cart = JSON.parse(localStorage.getItem('sw_cart')) || [];
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
    } catch (e) {
        console.error('Error updating cart badge:', e);
    }
}
window.updateCartBadge = updateGlobalCartBadge;

// Toast notification utility
function showToast(message, type = 'success') {
    // Check if styling exists, if not add style tag
    if (!document.getElementById('sw-toast-style')) {
        const style = document.createElement('style');
        style.id = 'sw-toast-style';
        style.textContent = `
            .toast-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                padding: 15px 25px;
                border-radius: 8px;
                background: #ffffff;
                color: #211C18;
                box-shadow: 0 8px 32px rgba(0,0,0,0.16);
                display: flex;
                align-items: center;
                gap: 12px;
                font-family: 'Poppins', sans-serif;
                font-size: 0.95rem;
                font-weight: 500;
                opacity: 0;
                transform: translateX(100px);
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                border-left: 5px solid #A15B23;
            }
            .toast-notification.show {
                opacity: 1;
                transform: translateX(0);
            }
            .toast-notification.toast-success {
                border-left-color: #22c55e;
            }
            .toast-notification.toast-success i {
                color: #22c55e;
            }
            .toast-notification.toast-error {
                border-left-color: #ef4444;
            }
            .toast-notification.toast-error i {
                color: #ef4444;
            }
        `;
        document.head.appendChild(style);
    }

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    const iconClass = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle');
    toast.innerHTML = `<i class="fas ${iconClass}"></i> <span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
window.showToast = showToast;

document.addEventListener('DOMContentLoaded', function() {
    // Initial badge update
    updateGlobalCartBadge();

    // Initialize Swiper for bestsellers
    if (document.querySelector('.bestsellers-swiper') && typeof Swiper !== 'undefined') {
        new Swiper('.bestsellers-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: {
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
            }
        });
    }

    // Initialize Swiper for testimonials
    if (document.querySelector('.testimonials-swiper') && typeof Swiper !== 'undefined') {
        new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination-testimonials', clickable: true },
            breakpoints: {
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 }
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Active nav link highlight
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link-sw').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath !== '/' && href !== '/' && currentPath.startsWith(href))) {
            link.classList.add('active');
        }
    });

    // Close mobile nav on link click
    const navLinks = document.querySelectorAll('.navbar-collapse .nav-link-sw');
    const navCollapse = document.querySelector('.navbar-collapse');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navCollapse && navCollapse.classList.contains('show') && typeof bootstrap !== 'undefined') {
                const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });
});
