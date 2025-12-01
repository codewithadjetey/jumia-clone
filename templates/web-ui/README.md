# Jumia React Template

A complete, responsive e-commerce template built with React and Tailwind CSS, replicating Jumia's design and functionality.

## Features

- 🎨 **Jumia Design System** - Exact color scheme and branding
- 📱 **Fully Responsive** - Mobile-first approach with breakpoints
- ⚡ **React Components** - Modular, reusable component architecture
- 🛒 **Shopping Cart** - Full cart functionality with quantity management
- 💳 **Checkout Flow** - Complete checkout process with form validation
- 🎯 **Product Cards** - Beautiful product cards with badges and ratings
- 🎠 **Hero Slider** - Auto-rotating banner carousel
- ⚡ **Flash Sales** - Countdown timer and special deals section
- 📦 **Category Grid** - Interactive category browsing
- 🔍 **Search Functionality** - Search bar in header
- 📱 **Mobile Menu** - Hamburger menu for mobile devices
- ⬆️ **Back to Top** - Smooth scroll to top button

## Project Structure

```
templates/web-ui/
├── src/
│   ├── components/
│   │   ├── Topbar.jsx          # Top navigation bar
│   │   ├── Header.jsx           # Category navigation
│   │   ├── HeroSlider.jsx       # Hero banner carousel
│   │   ├── ProductCard.jsx      # Reusable product card
│   │   ├── FlashSales.jsx       # Flash sales section
│   │   ├── CategoryGrid.jsx    # Category grid section
│   │   ├── FeaturedProducts.jsx # Featured products section
│   │   ├── Footer.jsx           # Footer component
│   │   ├── Cart.jsx             # Shopping cart page
│   │   ├── Checkout.jsx         # Checkout page
│   │   └── BackToTop.jsx        # Back to top button
│   ├── pages/
│   │   └── Home.jsx             # Home page
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Installation

1. Navigate to the project directory:
```bash
cd templates/web-ui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Components

### Topbar
- Sticky navigation bar
- Logo
- Search bar (responsive)
- Account, Help, and Cart icons
- Mobile hamburger menu button

### Header
- Category navigation bar
- Horizontal scrollable categories
- Mobile menu drawer

### HeroSlider
- Auto-rotating carousel
- Multiple slides with gradients
- Navigation dots
- Smooth transitions

### ProductCard
- Product image with hover effects
- Discount badges
- Rating stars
- Price display
- Add to Cart / Buy Now buttons
- Wishlist icon

### FlashSales
- Orange header with countdown timer
- Product grid (responsive)
- Real-time countdown

### CategoryGrid
- Category cards with icons
- Hover effects
- Shop Now links

### FeaturedProducts
- Top deals section
- Product grid
- See All link

### Cart
- Shopping cart items
- Quantity management
- Order summary
- Free delivery threshold
- Proceed to checkout

### Checkout
- Delivery information form
- Payment method selection
- Card payment form
- Order summary
- Form validation

### Footer
- Multi-column layout
- About Jumia links
- Customer service links
- Payment methods
- Social media icons

## Color Scheme

- **Primary Orange**: `#F68B1E` (jumia-orange)
- **Dark Orange**: `#E67A0D` (jumia-orange-dark)
- **Dark Gray**: `#1A1A1A` (jumia-dark)
- **Text Gray**: `#666666` (jumia-gray)
- **Light Gray**: `#F5F5F5` (jumia-light-gray)
- **Green**: `#00A859` (jumia-green)
- **Red**: `#E53E3E` (jumia-red)

## Routing

- `/` - Home page
- `/cart` - Shopping cart
- `/checkout` - Checkout page

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Technologies

- React 18
- React Router DOM
- Tailwind CSS
- Vite
- PostCSS
- Autoprefixer

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This template is created for educational and commercial use.

## Notes

- Replace placeholder images with actual product images
- Connect to your backend API for real data
- Add authentication for user accounts
- Implement payment gateway integration
- Add product detail pages
- Implement search functionality
- Add filters and sorting options
