import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Topbar onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
