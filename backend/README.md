# Jumia E-commerce Backend API

Laravel-based RESTful API for Jumia E-commerce platform with versioned endpoints, authentication, and comprehensive Swagger documentation.

## Features

- ✅ API Versioning (v1)
- ✅ Laravel Sanctum Authentication
- ✅ Role-based Access Control (Admin/User)
- ✅ Swagger/OpenAPI Documentation
- ✅ Separate Route Files (Guest, User, Admin)
- ✅ Complete E-commerce Endpoints
- ✅ MySQL Database Support

## Installation

1. Clone the repository
2. Install dependencies:
```bash
composer install
```

3. Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

4. Update `.env` with your database credentials:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=jumia_db
DB_USERNAME=your_username
DB_PASSWORD=your_password

API_VERSION=v1
```

5. Run migrations:
```bash
php artisan migrate
```

6. Seed database with roles and admin user:
```bash
php artisan db:seed
```

## API Documentation

Access Swagger UI at: `http://your-domain/api/documentation`

## API Endpoints

### Public/Guest Endpoints
- `GET /api/v1/health` - Health check
- `GET /api/v1/system/info` - System information
- `GET /api/v1/products` - List products
- `GET /api/v1/products/{id}` - Get product details
- `GET /api/v1/categories` - List categories
- `GET /api/v1/brands` - List brands
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user

### Authenticated User Endpoints
- `GET /api/v1/auth/me` - Get authenticated user
- `PUT /api/v1/auth/profile` - Update profile
- `GET /api/v1/cart` - Get cart
- `POST /api/v1/cart/add` - Add to cart
- `GET /api/v1/orders` - Get orders
- `POST /api/v1/orders/create` - Create order
- And more...

### Admin Endpoints
- `GET /api/v1/admin/products` - List all products
- `POST /api/v1/admin/products` - Create product
- `PUT /api/v1/admin/products/{id}` - Update product
- And more...

## Authentication

The API uses Laravel Sanctum for token-based authentication.

1. Register or Login to get a token
2. Include the token in the Authorization header:
```
Authorization: Bearer {your-token}
```

## Default Users

After seeding:
- Admin: `admin@jumia.com` / `password`
- User: `user@jumia.com` / `password`

## Project Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   │       └── V1/
│   │           ├── Admin/
│   │           └── ...
│   ├── Middleware/
│   └── Requests/
├── Models/
routes/
├── api/
│   └── v1/
│       ├── guest.php
│       ├── user.php
│       └── admin.php
```

## Testing

```bash
php artisan test
```

## License

MIT
