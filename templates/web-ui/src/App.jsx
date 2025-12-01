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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
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
