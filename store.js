// App logic and Wix Headless SDK Integration for the Institute of Hominology Webstore
// STRICTLY PURE WIX STORES MODE - NO MOCK DATA FALLBACKS

// Wix Client SDK Imports
import { createClient, OAuthStrategy } from 'https://esm.sh/@wix/sdk';
import { products as wixProductsModule } from 'https://esm.sh/@wix/stores';
import { currentCart as wixCartModule } from 'https://esm.sh/@wix/ecom';
import { redirects as wixRedirectsModule } from 'https://esm.sh/@wix/redirects';

// ==========================================
// WIX HEADLESS CONFIGURATION
// ==========================================
// Replace with the Client ID from your Wix Developer Dashboard (under Headless Settings).
// If left as 'YOUR_WIX_CLIENT_ID' or empty, a Wix Setup Instruction panel will be shown in the browser.
const WIX_CLIENT_ID = 'YOUR_WIX_CLIENT_ID';
const WIX_STORES_APP_ID = '21523b27-2ee9-102b-a1e3-e22f254e5650'; // Default Wix Stores App ID

// Local Storage Session Management for Wix Visitor Tokens
function getLocalTokens() {
  try {
    const tokens = localStorage.getItem('wix_visitor_tokens');
    return tokens ? JSON.parse(tokens) : null;
  } catch (e) {
    return null;
  }
}

function setLocalTokens(tokens) {
  try {
    localStorage.setItem('wix_visitor_tokens', JSON.stringify(tokens));
  } catch (e) {
    // Ignore
  }
}

// Convert Wix internal wix:image:// URIs to standard static URLs
function resolveWixImage(wixImageUrl, fallback = 'assets/footprint_cast.jpg') {
  if (!wixImageUrl) return fallback;
  if (wixImageUrl.startsWith('wix:image://')) {
    const parts = wixImageUrl.split('/');
    if (parts.length > 3) {
      const fileName = parts[3].split('#')[0];
      return `https://static.wixstatic.com/media/${fileName}`;
    }
  }
  return wixImageUrl;
}

// Initialize Wix Client SDK
let wixClient = null;
let isWixReady = false;

if (WIX_CLIENT_ID && WIX_CLIENT_ID !== 'YOUR_WIX_CLIENT_ID' && WIX_CLIENT_ID.trim() !== '') {
  try {
    const savedTokens = getLocalTokens();
    wixClient = createClient({
      modules: { 
        products: wixProductsModule, 
        currentCart: wixCartModule, 
        redirects: wixRedirectsModule 
      },
      auth: OAuthStrategy({
        clientId: WIX_CLIENT_ID,
        tokens: savedTokens || undefined
      })
    });

    // Save refreshed tokens automatically
    wixClient.auth.onChange((tokens) => {
      setLocalTokens(tokens);
    });

    isWixReady = true;
    console.log('📡 Wix Headless Client successfully initialized.');
  } catch (err) {
    console.error('Failed to initialize Wix SDK client:', err);
    isWixReady = false;
  }
}

// App State
const state = {
  cart: [], // Stores: { product: {}, quantity: N, wixLineItemId: String }
  wixTotals: null, // Stores synced checkout price metrics
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'relevance',
  activeView: 'home',
  selectedProductId: null
};

// Target list of products loaded in UI
let activeProducts = [];

// Format Currency Utility
function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Show Toast Notification
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  
  const icon = type === 'success' ? '✓' : 'ℹ';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;
  
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Load live products from Wix Dashboard
async function fetchWixProducts() {
  try {
    const res = await wixClient.products.queryProducts().limit(50).find();
    if (res && res.items && res.items.length > 0) {
      activeProducts = res.items.map(item => {
        // Map collection tags into product categories
        let category = 'casts';
        if (item.collections && item.collections.length > 0) {
          const collName = item.collections[0].name.toLowerCase();
          if (collName.includes('literature') || collName.includes('book') || collName.includes('journal')) {
            category = 'literature';
          } else if (collName.includes('gear') || collName.includes('equipment') || collName.includes('tool')) {
            category = 'gear';
          } else if (collName.includes('expedition') || collName.includes('trip') || collName.includes('tour')) {
            category = 'expeditions';
          } else {
            category = collName;
          }
        }

        const specs = {
          'SKU': item.sku || 'N/A',
          'Inventory Status': item.stock?.trackQuantity ? `${item.stock.quantity} in stock` : (item.stock?.inStock ? 'Available' : 'Out of Stock')
        };
        if (item.weight) specs['Weight'] = `${item.weight} kg`;

        return {
          id: item._id,
          name: item.name,
          category: category,
          price: item.priceData?.price || 0,
          image: resolveWixImage(item.media?.mainMedia?.image?.url || item.image, 'assets/footprint_cast.jpg'),
          shortDesc: item.description ? item.description.substring(0, 100) + '...' : 'Wix inventory item.',
          longDesc: item.description || 'No descriptive logs available.',
          specs: specs
        };
      });
      console.log('📡 Synced products from Wix Stores Catalog:', activeProducts.length);
    } else {
      activeProducts = [];
      showCatalogMessage('No products found. Please add products to your Wix Store dashboard.');
    }
  } catch (err) {
    console.error('Failed fetching live Wix products:', err);
    showCatalogMessage('Error connecting to Wix Store. Please check your console or Client ID config.');
  }
}

function showCatalogMessage(message) {
  const grid = document.getElementById('catalog-grid');
  if (grid) {
    grid.innerHTML = `
      <div class="empty-cart-message" style="grid-column: span 3; padding: 4rem 0;">
        ${message}
      </div>
    `;
  }
}

// Sync cart with Wix stores API
async function syncWixCart() {
  try {
    const cart = await wixClient.currentCart.getCurrentCart();
    if (cart && cart.lineItems) {
      state.cart = cart.lineItems.map(item => {
        const matchedProduct = activeProducts.find(p => p.id === item.catalogReference.catalogItemId);
        return {
          product: matchedProduct || {
            id: item.catalogReference.catalogItemId,
            name: item.name?.translated || item.name || 'Wix Specimen',
            category: 'all',
            price: item.price?.amount || 0,
            image: resolveWixImage(item.image, 'assets/footprint_cast.jpg'),
            shortDesc: '',
            longDesc: '',
            specs: {}
          },
          quantity: item.quantity,
          wixLineItemId: item._id
        };
      });

      state.wixTotals = {
        subtotal: cart.subtotal?.amount || 0,
        tax: cart.shippingAndTaxDetails?.tax?.amount || 0,
        shipping: cart.shippingAndTaxDetails?.shipping?.amount || 0,
        total: cart.total?.amount || 0
      };
    }
  } catch (err) {
    // 404 means cart is empty or token is expired/new session
    if (err.status === 404 || err.message?.includes('404')) {
      state.cart = [];
      state.wixTotals = null;
    } else {
      console.error('Wix Cart sync failed:', err);
    }
  }
}

// Redirect client to Wix Hosted Secure Checkout
async function handleWixCheckout() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty. Cannot checkout.', 'info');
    return;
  }

  try {
    showToast('Preparing your secure Wix Checkout manifest...', 'info');
    const cart = await wixClient.currentCart.getCurrentCart();
    const checkoutId = cart.checkoutId || cart._id;
    
    const redirectSession = await wixClient.redirects.createRedirectSession({
      ecomCheckout: { checkoutId: checkoutId },
      callbacks: {
        postFlowUrl: window.location.origin + window.location.pathname
      }
    });

    if (redirectSession && redirectSession.redirectSession?.fullUrl) {
      showToast('Redirecting...', 'success');
      window.location.href = redirectSession.redirectSession.fullUrl;
    } else {
      throw new Error('No redirection URL returned from Wix SDK.');
    }
  } catch (err) {
    console.error('Wix checkout redirection failed:', err);
    showToast('Secure Wix Checkout failed. Verify your Wix Store dashboard settings.', 'info');
  }
}

// Navigation & Tab Controller
window.switchView = function(viewName) {
  state.activeView = viewName;
  
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.view === viewName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const homeSec = document.getElementById('home-view');
  const shopSec = document.getElementById('shop-view');
  const aboutSec = document.getElementById('about-view');

  if (viewName === 'home') {
    homeSec.style.display = 'block';
    shopSec.style.display = 'none';
    aboutSec.style.display = 'none';
    renderFeaturedProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (viewName === 'shop') {
    homeSec.style.display = 'none';
    shopSec.style.display = 'block';
    aboutSec.style.display = 'none';
    renderProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (viewName === 'about') {
    homeSec.style.display = 'none';
    shopSec.style.display = 'none';
    aboutSec.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Render Featured Products on Home
function renderFeaturedProducts() {
  const container = document.getElementById('featured-grid');
  if (!container) return;

  const featured = activeProducts.slice(0, 3);
  container.innerHTML = '';
  featured.forEach(p => {
    container.appendChild(createProductCard(p));
  });
}

// Render Catalog Listings in Shop View
window.renderProducts = function() {
  const grid = document.getElementById('catalog-grid');
  const countElement = document.getElementById('results-count');
  if (!grid) return;

  let filtered = activeProducts.filter(p => {
    const matchCategory = state.activeCategory === 'all' || p.category === state.activeCategory;
    const matchSearch = p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                        p.shortDesc.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                        p.longDesc.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Sort products
  if (state.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filtered.sort((a, b) => a.id.localeCompare(b.id));
  }

  if (countElement) {
    countElement.textContent = `Showing ${filtered.length} of ${activeProducts.length} specimens`;
  }

  grid.innerHTML = '';
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-cart-message" style="grid-column: span 3; padding: 4rem 0;">
        No live specimens match your search parameters.
      </div>
    `;
    return;
  }

  filtered.forEach(p => {
    grid.appendChild(createProductCard(p));
  });
};

// Generate Card Markup
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  let specText = '';
  if (product.category === 'casts') specText = product.specs['Discovery Location'] || '';
  if (product.category === 'literature') specText = product.specs['Author'] || '';
  if (product.category === 'gear') specText = product.specs['SKU'] || '';
  if (product.category === 'expeditions') specText = product.specs['Dates'] || '';

  card.innerHTML = `
    <div class="product-card-img-wrapper">
      <img class="product-card-img" src="${product.image}" alt="${product.name}" loading="lazy">
      <span class="product-card-tag">${product.category}</span>
    </div>
    <div class="product-card-body">
      <h3 class="product-card-title">${product.name}</h3>
      <p class="product-card-specs">${specText}</p>
      <p class="product-card-desc">${product.shortDesc}</p>
      <div class="product-card-footer">
        <span class="product-card-price">${formatPrice(product.price)}</span>
        <button class="product-card-btn" title="Add to Research Cart">＋</button>
      </div>
    </div>
  `;

  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-card-btn')) {
      e.stopPropagation();
      addToCart(product.id, 1);
    } else {
      openProductModal(product.id);
    }
  });

  return card;
}

// Product Details Modal
function openProductModal(productId) {
  const product = activeProducts.find(p => p.id === productId);
  if (!product) return;

  state.selectedProductId = productId;
  const overlay = document.getElementById('product-modal');
  const detailsContainer = document.getElementById('product-details-content-wrapper');

  let specsHtml = '';
  for (const [key, value] of Object.entries(product.specs)) {
    specsHtml += `<tr><td>${key}</td><td>${value}</td></tr>`;
  }

  detailsContainer.innerHTML = `
    <div class="product-details-container">
      <div class="product-details-media">
        <img class="product-details-img" src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-details-content">
        <span class="product-details-category">${product.category}</span>
        <h2 class="product-details-title">${product.name}</h2>
        <span class="product-details-price">${formatPrice(product.price)}</span>
        <p class="product-details-desc">${product.longDesc}</p>
        <table class="product-specs-table"><tbody>${specsHtml}</tbody></table>
        <div class="product-details-actions">
          <div class="product-details-qty">
            <button id="modal-qty-minus">-</button>
            <span id="modal-qty-value">1</span>
            <button id="modal-qty-plus">+</button>
          </div>
          <button id="modal-add-to-cart-btn" class="btn-primary product-details-add-btn">
            Add to Research Cart
          </button>
        </div>
      </div>
    </div>
  `;

  let qty = 1;
  const qtyVal = document.getElementById('modal-qty-value');
  
  document.getElementById('modal-qty-minus').addEventListener('click', () => {
    if (qty > 1) {
      qty--;
      qtyVal.textContent = qty;
    }
  });
  
  document.getElementById('modal-qty-plus').addEventListener('click', () => {
    qty++;
    qtyVal.textContent = qty;
  });

  document.getElementById('modal-add-to-cart-btn').addEventListener('click', () => {
    addToCart(product.id, qty);
    closeProductModal();
  });

  overlay.classList.add('open');
}

function closeProductModal() {
  document.getElementById('product-modal').classList.remove('open');
  state.selectedProductId = null;
}

// Open/Close Cart Drawer
function toggleCartDrawer(open) {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (open) {
    drawer.classList.add('open');
    overlay.classList.add('active');
  } else {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
  }
}

// Add Item to Cart
async function addToCart(productId, quantity) {
  const product = activeProducts.find(p => p.id === productId);
  if (!product) return;

  try {
    showToast('Syncing with Wix Store...', 'info');
    await wixClient.currentCart.addToCurrentCart({
      lineItems: [{
        catalogReference: {
          appId: WIX_STORES_APP_ID,
          catalogItemId: productId
        },
        quantity: quantity
      }]
    });
    await syncWixCart();
    showToast(`Added ${quantity}x "${product.name}" to Wix Cart`);
  } catch (err) {
    console.error('Wix Add to Cart error:', err);
    showToast('Wix cart error. Verify product is published in your Wix Store.', 'info');
  }

  updateCartBadge();
  renderCart();
  toggleCartDrawer(true);
}

// Update Item Quantity in Cart
async function updateCartQuantity(productId, change) {
  const item = state.cart.find(item => item.product.id === productId);
  if (!item) return;

  const newQty = item.quantity + change;

  try {
    if (newQty <= 0) {
      await wixClient.currentCart.removeLineItemsFromCurrentCart([item.wixLineItemId]);
      showToast(`Removed "${item.product.name}" from Wix Cart`, 'info');
    } else {
      await wixClient.currentCart.updateCurrentCartLineItemQuantity([{
        _id: item.wixLineItemId,
        quantity: newQty
      }]);
    }
    await syncWixCart();
  } catch (err) {
    console.error('Wix Update Cart error:', err);
  }

  updateCartBadge();
  renderCart();
}

// Remove Item from Cart
async function removeFromCart(productId) {
  const item = state.cart.find(item => item.product.id === productId);
  if (!item) return;

  try {
    await wixClient.currentCart.removeLineItemsFromCurrentCart([item.wixLineItemId]);
    await syncWixCart();
    showToast(`Removed "${item.product.name}" from Wix Cart`, 'info');
  } catch (err) {
    console.error('Wix Remove Cart error:', err);
  }

  updateCartBadge();
  renderCart();
}

// Update Header Cart Count Badge
function updateCartBadge() {
  const badge = document.getElementById('cart-count-badge');
  if (!badge) return;

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Fetch Cart Price Metrics
function getCartTotals() {
  if (state.wixTotals) {
    return {
      subtotal: state.wixTotals.subtotal,
      tax: state.wixTotals.tax,
      shipping: state.wixTotals.shipping,
      total: state.wixTotals.total
    };
  }
  return { subtotal: 0, tax: 0, shipping: 0, total: 0 };
}

// Render Cart HTML
function renderCart() {
  const container = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('cart-subtotal');
  const taxEl = document.getElementById('cart-tax');
  const shippingEl = document.getElementById('cart-shipping');
  const totalEl = document.getElementById('cart-total');

  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = '<p class="empty-cart-message">Your field exploration cart is empty.</p>';
    subtotalEl.textContent = formatPrice(0);
    taxEl.textContent = formatPrice(0);
    shippingEl.textContent = formatPrice(0);
    totalEl.textContent = formatPrice(0);
    return;
  }

  container.innerHTML = '';
  state.cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <img class="cart-item-img" src="${item.product.image}" alt="${item.product.name}">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.product.name}</h4>
        <span class="cart-item-specs">${item.product.category}</span>
        <div class="cart-item-actions">
          <div class="cart-item-quantity">
            <button class="quantity-btn minus-qty" data-id="${item.product.id}">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn plus-qty" data-id="${item.product.id}">+</button>
          </div>
          <button class="cart-item-remove" data-id="${item.product.id}">Remove</button>
          <span class="cart-item-price">${formatPrice(item.product.price * item.quantity)}</span>
        </div>
      </div>
    `;

    itemEl.querySelector('.minus-qty').addEventListener('click', () => updateCartQuantity(item.product.id, -1));
    itemEl.querySelector('.plus-qty').addEventListener('click', () => updateCartQuantity(item.product.id, 1));
    itemEl.querySelector('.cart-item-remove').addEventListener('click', () => removeFromCart(item.product.id));

    container.appendChild(itemEl);
  });

  const totals = getCartTotals();
  subtotalEl.textContent = formatPrice(totals.subtotal);
  taxEl.textContent = formatPrice(totals.tax);
  shippingEl.textContent = totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping);
  totalEl.textContent = formatPrice(totals.total);
}

// Display Configuration Instructions inside the web UI
function renderSetupScreen() {
  const mainEl = document.querySelector('main');
  if (!mainEl) return;
  
  mainEl.innerHTML = `
    <div class="container" style="padding: 5rem 0; max-width: 650px; text-align: center;">
      <div style="background-color: var(--bg-panel); border: 1px solid var(--color-accent); padding: 3rem; border-radius: 6px; box-shadow: var(--shadow-dark);">
        <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">📡</span>
        <h2 style="font-family: var(--font-serif-header); color: var(--color-accent); margin: 0 0 1rem; font-size: 1.8rem; letter-spacing: 1px;">Wix Stores Connection Required</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 2rem;">
          This webstore is built to run with **no mock data**, connecting directly to your live Wix dashboard. To display your products, you must configure your Wix Client ID.
        </p>
        
        <div style="text-align: left; background: var(--bg-dark); padding: 1.5rem; border-radius: 4px; border: var(--border-dark); font-size: 0.85rem; margin-bottom: 2rem; color: var(--text-light); line-height: 1.6;">
          <strong style="color: var(--color-accent); display: block; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px;">Setup Instructions:</strong>
          <ol style="margin-left: 1.25rem; display: flex; flex-direction: column; gap: 0.6rem;">
            <li>Go to your <strong>Wix Site Dashboard &gt; Headless Settings</strong>.</li>
            <li>Create an OAuth Client for a Web App.</li>
            <li>Copy the Client ID and insert it in [store.js](file:///c:/Users/josep/Desktop/IHSE/store.js):
              <code style="display:block; margin-top:0.4rem; background:rgba(255,255,255,0.06); padding:0.4rem; border-radius:3px; font-family:monospace; color: var(--color-accent);">const WIX_CLIENT_ID = 'your-copied-client-id';</code>
            </li>
            <li>Add your domain to <strong>Allowed Redirect Domains</strong> in Wix.</li>
          </ol>
        </div>
        
        <button class="btn-primary" onclick="window.location.reload()" style="width: 100%; justify-content: center; padding: 0.9rem;">I Have Configured My Client ID</button>
      </div>
    </div>
  `;
}

// UI Event Listeners
function initializeEvents() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // If it points to an HTML file, let the browser load it normally, otherwise toggle views
      const href = e.currentTarget.getAttribute('href');
      if (href && href.endsWith('.html')) {
        return;
      }
      e.preventDefault();
      const view = e.currentTarget.dataset.view;
      switchView(view);
    });
  });

  const shopCta = document.getElementById('hero-shop-cta');
  if (shopCta) {
    shopCta.addEventListener('click', () => switchView('shop'));
  }

  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      state.activeCategory = category;
      
      document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.category === category) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      switchView('shop');
      renderProducts();
    });
  });

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      
      state.activeCategory = e.currentTarget.dataset.category;
      renderProducts();
    });
  });

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  const cartToggleBtn = document.getElementById('nav-cart-btn');
  if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCartDrawer(true);
    });
  }

  const closeCartBtn = document.getElementById('cart-close-btn');
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => toggleCartDrawer(false));
  }

  const overlayCart = document.getElementById('cart-drawer-overlay');
  if (overlayCart) {
    overlayCart.addEventListener('click', () => toggleCartDrawer(false));
  }

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.currentTarget.closest('.modal-overlay');
      modal.classList.remove('open');
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });

  // Cart Checkout Action (Direct Wix Redirection)
  const cartCheckoutBtn = document.getElementById('cart-checkout-btn');
  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', handleWixCheckout);
  }
}

// App Initialization
async function initializeApp() {
  if (!isWixReady) {
    renderSetupScreen();
    return;
  }
  
  initializeEvents();
  await fetchWixProducts();
  await syncWixCart();
  
  updateCartBadge();
  renderFeaturedProducts();
  switchView('home');
}

// Execute on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
