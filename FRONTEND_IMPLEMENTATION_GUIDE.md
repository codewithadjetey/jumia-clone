# Frontend Implementation Guide - React JS

This guide will help you implement the frontend for the Jumia E-commerce platform using React JS.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Basic knowledge of React, React Router, and state management

## Project Setup

### 1. Initialize React Project

```bash
npx create-react-app jumia-frontend
cd jumia-frontend
```

### 2. Install Required Dependencies

```bash
npm install axios react-router-dom @tanstack/react-query
npm install @headlessui/react @heroicons/react
npm install react-hook-form yup @hookform/resolvers
npm install zustand  # or redux if preferred
```

### 3. Project Structure

```
src/
├── api/
│   ├── client.js          # Axios instance with base config
│   ├── auth.js           # Authentication endpoints
│   ├── products.js        # Product endpoints
│   ├── cart.js            # Cart endpoints
│   ├── orders.js          # Order endpoints
│   └── ...
├── components/
│   ├── common/           # Reusable components
│   ├── products/         # Product-related components
│   ├── cart/             # Cart components
│   └── ...
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── ...
├── store/                # State management
│   ├── authStore.js
│   ├── cartStore.js
│   └── ...
├── hooks/
│   ├── useAuth.js
│   ├── useCart.js
│   └── ...
├── utils/
│   ├── constants.js
│   └── helpers.js
└── App.jsx
```

## API Configuration

### 1. Create API Client

```javascript
// src/api/client.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;
```

### 2. API Endpoints

```javascript
// src/api/auth.js
import client from './client';

export const authAPI = {
  register: (data) => client.post('/auth/register', data),
  login: (data) => client.post('/auth/login', data),
  logout: () => client.post('/auth/logout'),
  me: () => client.get('/auth/me'),
  updateProfile: (data) => client.put('/auth/profile', data),
  forgotPassword: (email) => client.post('/auth/forgot-password', { email }),
  resetPassword: (data) => client.post('/auth/reset-password', data),
};

// src/api/products.js
import client from './client';

export const productsAPI = {
  getAll: (params) => client.get('/products', { params }),
  getById: (id) => client.get(`/products/${id}`),
  getFeatured: () => client.get('/products/featured'),
  search: (query) => client.get('/products/search', { params: { q: query } }),
  getByCategory: (categoryId) => client.get(`/products/category/${categoryId}`),
};

// src/api/cart.js
import client from './client';

export const cartAPI = {
  get: () => client.get('/cart'),
  add: (data) => client.post('/cart/add', data),
  update: (itemId, quantity) => client.put(`/cart/update/${itemId}`, { quantity }),
  remove: (itemId) => client.delete(`/cart/remove/${itemId}`),
  clear: () => client.delete('/cart/clear'),
};

// src/api/orders.js
import client from './client';

export const ordersAPI = {
  getAll: () => client.get('/orders'),
  getById: (id) => client.get(`/orders/${id}`),
  create: (data) => client.post('/orders/create', data),
  cancel: (id) => client.post(`/orders/${id}/cancel`),
};
```

## State Management

### 1. Auth Store (Zustand)

```javascript
// src/store/authStore.js
import { create } from 'zustand';
import { authAPI } from '../api/auth';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('auth_token'),
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await authAPI.login(credentials);
      const { user, token } = response.data;
      localStorage.setItem('auth_token', token);
      set({ user, token, loading: false });
      return user;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed', loading: false });
      throw error;
    }
  },

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await authAPI.register(data);
      const { user, token } = response.data;
      localStorage.setItem('auth_token', token);
      set({ user, token, loading: false });
      return user;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Registration failed', loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      set({ user: null, token: null });
    }
  },

  fetchUser: async () => {
    try {
      const response = await authAPI.me();
      set({ user: response.data.user });
    } catch (error) {
      localStorage.removeItem('auth_token');
      set({ user: null, token: null });
    }
  },
}));
```

### 2. Cart Store

```javascript
// src/store/cartStore.js
import { create } from 'zustand';
import { cartAPI } from '../api/cart';

export const useCartStore = create((set) => ({
  items: [],
  total: 0,
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const response = await cartAPI.get();
      set({ items: response.data.items, total: response.data.total, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      await cartAPI.add({ product_id: productId, quantity });
      await useCartStore.getState().fetchCart();
    } catch (error) {
      throw error;
    }
  },

  updateQuantity: async (itemId, quantity) => {
    try {
      await cartAPI.update(itemId, quantity);
      await useCartStore.getState().fetchCart();
    } catch (error) {
      throw error;
    }
  },

  removeFromCart: async (itemId) => {
    try {
      await cartAPI.remove(itemId);
      await useCartStore.getState().fetchCart();
    } catch (error) {
      throw error;
    }
  },

  clearCart: async () => {
    try {
      await cartAPI.clear();
      set({ items: [], total: 0 });
    } catch (error) {
      throw error;
    }
  },
}));
```

## Key Components

### 1. Login Component

```javascript
// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      // Error handled by store
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### 2. Product List Component

```javascript
// src/pages/Products.jsx
import { useEffect, useState } from 'react';
import { productsAPI } from '../api/products';
import { useCartStore } from '../store/cartStore';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      alert('Product added to cart!');
    } catch (error) {
      alert('Failed to add product to cart');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.images?.[0]?.image_path} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.sale_price || product.price}</p>
          <button onClick={() => handleAddToCart(product.id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
```

### 3. Cart Component

```javascript
// src/pages/Cart.jsx
import { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, total, loading, fetchCart, updateQuantity, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.product.images?.[0]?.image_path} alt={item.product.name} />
              <div>
                <h3>{item.product.name}</h3>
                <p>${item.product.current_price}</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  min="1"
                />
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${total}</h3>
            <button onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
```

## Routing Setup

```javascript
// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';

function PrivateRoute({ children }) {
  const { token } = useAuthStore();
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const { fetchUser, token } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## Environment Variables

Create a `.env` file:

```
REACT_APP_API_URL=http://localhost:8000/api/v1
```

## Best Practices

1. **Error Handling**: Always handle API errors gracefully
2. **Loading States**: Show loading indicators during API calls
3. **Form Validation**: Use react-hook-form with yup for validation
4. **Responsive Design**: Make components mobile-friendly
5. **Code Splitting**: Use React.lazy() for route-based code splitting
6. **Caching**: Use React Query for API response caching
7. **Accessibility**: Follow WCAG guidelines

## Testing

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

## Deployment

1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Update API URL in production environment variables

## Next Steps

1. Implement product search and filters
2. Add product reviews and ratings
3. Implement wishlist functionality
4. Add order tracking
5. Implement payment integration
6. Add admin dashboard (if needed)

