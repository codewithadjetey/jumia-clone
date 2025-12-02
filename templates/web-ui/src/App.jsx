import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Topbar from './components/Topbar';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Account from './pages/Account';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import NotFound from './pages/NotFound';
import Error from './pages/Error';
import FAQ from './pages/FAQ';
import TrackOrder from './pages/TrackOrder';
import Contact from './pages/Contact';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

// List of routes that should not show header/footer
const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

function AppContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && (
        <>
          <Topbar onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
          <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        </>
      )}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} errorElement={<Error />} />
          <Route path="/login" element={<Login />} errorElement={<Error />} />
          <Route path="/register" element={<Register />} errorElement={<Error />} />
          <Route path="/forgot-password" element={<ForgotPassword />} errorElement={<Error />} />
          <Route path="/reset-password" element={<ResetPassword />} errorElement={<Error />} />
          <Route path="/account" element={<Account />} errorElement={<Error />} />
          <Route path="/product/:id" element={<ProductDetail />} errorElement={<Error />} />
          <Route path="/categories" element={<Categories />} errorElement={<Error />} />
          <Route path="/faq" element={<FAQ />} errorElement={<Error />} />
          <Route path="/track-order" element={<TrackOrder />} errorElement={<Error />} />
          <Route path="/contact" element={<Contact />} errorElement={<Error />} />
          <Route path="/cart" element={<Cart />} errorElement={<Error />} />
          <Route path="/checkout" element={<Checkout />} errorElement={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAuthPage && (
        <>
          <Footer />
          <BackToTop />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
