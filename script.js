// Product data (normally would be fetched from a server/API)
const products = [
    {
        id: 1,
        name: "Premium Cotton T-Shirt",
        price: 24.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Ultra-soft premium cotton t-shirt with a comfortable fit. Perfect for everyday wear and available in multiple colors."
    },
    {
        id: 2,
        name: "Slim Fit Denim Jeans",
        price: 59.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Classic slim fit denim jeans with stretch for maximum comfort. Features a modern design with premium stitching."
    },
    {
        id: 3,
        name: "Running Sneakers",
        price: 89.99,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Lightweight and responsive running sneakers with cushioned soles for optimal comfort and performance."
    },
    {
        id: 4,
        name: "Leather Crossbody Bag",
        price: 79.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Elegant leather crossbody bag with adjustable strap and multiple compartments for organizing your essentials."
    },
    {
        id: 5,
        name: "Casual Hoodie",
        price: 49.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Cozy and warm hoodie made from a soft cotton blend. Features a spacious kangaroo pocket and adjustable hood."
    },
    {
        id: 6,
        name: "Fashion Sunglasses",
        price: 29.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Stylish sunglasses with UV protection. The perfect accessory to complete your summer outfit."
    },
    {
        id: 7,
        name: "Casual Canvas Shoes",
        price: 34.99,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Comfortable canvas shoes for everyday wear. Featuring a durable rubber sole and classic design."
    },
    {
        id: 8,
        name: "Summer Dress",
        price: 44.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Lightweight summer dress with a flattering silhouette. Perfect for warm weather and special occasions."
    },
    {
        id: 9,
        name: "Analog Wristwatch",
        price: 119.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Classic analog wristwatch with a stainless steel case and leather strap. Elegant design for any occasion."
    },
    {
        id: 10,
        name: "Hiking Boots",
        price: 99.99,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Durable hiking boots with waterproof construction and excellent traction for outdoor adventures."
    },
    {
        id: 11,
        name: "Winter Jacket",
        price: 129.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Warm winter jacket with insulated lining and water-resistant exterior. Perfect for cold weather conditions."
    },
    {
        id: 12,
        name: "Leather Wallet",
        price: 39.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Genuine leather wallet with multiple card slots and compartments. Slim design fits comfortably in your pocket."
    }
];

// DOM elements
const productsGrid = document.getElementById('products-grid');
const productModal = document.getElementById('product-modal');
const modalProductDetails = document.getElementById('modal-product-details');
const closeModal = document.getElementById('close-modal');
const loadingSpinner = document.getElementById('loading-spinner');
const noProducts = document.getElementById('no-products');
const productsCount = document.getElementById('products-count');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const sortSelect = document.getElementById('sort-select');
const categoryButtons = document.querySelectorAll('.category-btn');
const resetFilters = document.getElementById('reset-filters');
const loadMoreBtn = document.getElementById('load-more');
const cartCount = document.querySelector('.cart-count');

// State variables
let currentProducts = [...products];
let filteredProducts = [...products];
let displayedProducts = 0;
let productsPerPage = 8;
let activeCategory = 'all';
let searchQuery = '';
let sortBy = 'default';
let cartItems = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Simulate loading delay
    setTimeout(() => {
        loadingSpinner.classList.add('hidden');
        loadProducts();
        updateProductsCount();
    }, 1000);

    // Event listeners
    closeModal.addEventListener('click', () => {
        productModal.classList.remove('show');
        setTimeout(() => {
            productModal.classList.add('hidden');
        }, 300);
    });

    // Close modal when clicking outside the content
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeModal.click();
        }
    });

    // Category filter
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter products
            activeCategory = button.getAttribute('data-category');
            filterProducts();
        });
    });

    // Search functionality
    searchBtn.addEventListener('click', () => {
        searchQuery = searchInput.value.trim().toLowerCase();
        filterProducts();
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchQuery = searchInput.value.trim().toLowerCase();
            filterProducts();
        }
    });

    // Sort functionality
    sortSelect.addEventListener('change', () => {
        sortBy = sortSelect.value;
        filterProducts();
    });

    // Reset filters
    resetFilters.addEventListener('click', () => {
        activeCategory = 'all';
        searchQuery = '';
        sortBy = 'default';
        
        // Reset UI elements
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === 'all') {
                btn.classList.add('active');
            }
        });
        
        searchInput.value = '';
        sortSelect.value = 'default';
        
        // Reset products
        filterProducts();
    });
        // Load more products
    loadMoreBtn.addEventListener('click', () => {
        loadProducts();
    });

    // Prevent default form submission in newsletter
    document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.querySelector('.newsletter-form input');
        if (emailInput.value.trim()) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });

    // Add keyboard accessibility to modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !productModal.classList.contains('hidden')) {
            closeModal.click();
        }
    });
});

// Filter products based on category, search query, and sort option
function filterProducts() {
    // Reset displayed products count
    displayedProducts = 0;
    
    // Filter by category and search query
    filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
        const matchesSearch = searchQuery === '' || 
                             product.name.toLowerCase().includes(searchQuery) || 
                             product.description.toLowerCase().includes(searchQuery);
        
        return matchesCategory && matchesSearch;
    });
    
    // Sort products
    sortProducts();
    
    // Clear products grid
    productsGrid.innerHTML = '';
    
    // Check if there are any products
    if (filteredProducts.length === 0) {
        noProducts.classList.remove('hidden');
        loadMoreBtn.classList.add('hidden');
    } else {
        noProducts.classList.add('hidden');
        loadProducts();
    }
    
    updateProductsCount();
}

// Sort products based on selected option
function sortProducts() {
    switch (sortBy) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Default sorting is by ID (original order)
            filteredProducts.sort((a, b) => a.id - b.id);
    }
}

// Load products into the grid
function loadProducts() {
    const productsToLoad = Math.min(productsPerPage, filteredProducts.length - displayedProducts);
    
    if (productsToLoad <= 0) {
        loadMoreBtn.classList.add('hidden');
        return;
    }
    
    for (let i = 0; i < productsToLoad; i++) {
        const product = filteredProducts[displayedProducts + i];
        renderProductCard(product);
    }
    
    displayedProducts += productsToLoad;
    
    // Hide load more button if all products are displayed
    if (displayedProducts >= filteredProducts.length) {
        loadMoreBtn.classList.add('hidden');
    } else {
        loadMoreBtn.classList.remove('hidden');
    }
}

// Render a product card
function renderProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-id', product.id);
    
    productCard.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <span class="product-category">${product.category}</span>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-actions">
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                <button class="view-details-btn" data-id="${product.id}" aria-label="View details">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to the newly created elements
    const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
    const viewDetailsBtn = productCard.querySelector('.view-details-btn');
    const productImage = productCard.querySelector('.product-image');
    const productTitle = productCard.querySelector('.product-title');
    
    // Add to cart functionality
    addToCartBtn.addEventListener('click', () => {
        addToCart(product);
    });
    
    // View details functionality
    viewDetailsBtn.addEventListener('click', () => {
        showProductDetails(product);
    });
    
    // Also allow clicking on product image or title to show details
    productImage.addEventListener('click', () => {
        showProductDetails(product);
    });
    
    productTitle.addEventListener('click', () => {
        showProductDetails(product);
    });
    
    productsGrid.appendChild(productCard);
}

// Add to cart functionality
function addToCart(product) {
    cartItems++;
    cartCount.textContent = cartItems;
    
    // Animation for cart icon
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.classList.add('pulse');
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div>
            <p><strong>${product.name}</strong> added to cart!</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    // Remove pulse animation
    setTimeout(() => {
        cartBtn.classList.remove('pulse');
    }, 500);
}

// Show product details in modal
function showProductDetails(product) {
    modalProductDetails.innerHTML = `
        <div class="modal-product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="modal-product-info">
            <h2 class="modal-product-title">${product.name}</h2>
            <div class="modal-product-meta">
                <span class="modal-product-category">${product.category}</span>
            </div>
            <div class="modal-product-price">$${product.price.toFixed(2)}</div>
            <p class="modal-product-description">${product.description}</p>
            <button class="btn modal-cart-btn" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    // Add event listener to add to cart button in modal
    const modalCartBtn = modalProductDetails.querySelector('.modal-cart-btn');
    modalCartBtn.addEventListener('click', () => {
        addToCart(product);
    });
    
    // Show modal
    productModal.classList.remove('hidden');
    setTimeout(() => {
        productModal.classList.add('show');
    }, 10);
}

// Update products count display
function updateProductsCount() {
    let countText = '';
    
    if (filteredProducts.length === 0) {
        countText = 'No products found';
    } else if (filteredProducts.length === 1) {
        countText = 'Showing 1 product';
    } else if (filteredProducts.length <= displayedProducts) {
        countText = `Showing all ${filteredProducts.length} products`;
    } else {
        countText = `Showing ${displayedProducts} of ${filteredProducts.length} products`;
    }
    
    productsCount.textContent = countText;
}

// Add CSS for notifications and animations
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .pulse {
        animation: pulse 0.5s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;

document.head.appendChild(style);
    