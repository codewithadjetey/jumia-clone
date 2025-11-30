# Mobile Implementation Guide - Flutter

This guide will help you implement the mobile app for the Jumia E-commerce platform using Flutter.

## Prerequisites

- Flutter SDK (v3.0 or higher)
- Dart (v3.0 or higher)
- Android Studio / Xcode
- Basic knowledge of Flutter and Dart

## Project Setup

### 1. Create Flutter Project

```bash
flutter create jumia_mobile
cd jumia_mobile
```

### 2. Install Required Dependencies

Add to `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0
  dio: ^5.3.0
  shared_preferences: ^2.2.0
  provider: ^6.1.0
  get_it: ^7.6.0
  flutter_riverpod: ^2.4.0  # or use provider
  cached_network_image: ^3.3.0
  flutter_secure_storage: ^9.0.0
  intl: ^0.18.0
  flutter_svg: ^2.0.0
  shimmer: ^3.0.0
```

Run:
```bash
flutter pub get
```

### 3. Project Structure

```
lib/
├── api/
│   ├── api_client.dart      # Dio instance
│   ├── endpoints.dart       # API endpoints
│   ├── auth_service.dart    # Auth API calls
│   ├── product_service.dart # Product API calls
│   ├── cart_service.dart    # Cart API calls
│   └── ...
├── models/
│   ├── user.dart
│   ├── product.dart
│   ├── cart_item.dart
│   ├── order.dart
│   └── ...
├── providers/
│   ├── auth_provider.dart
│   ├── cart_provider.dart
│   ├── product_provider.dart
│   └── ...
├── screens/
│   ├── home/
│   ├── products/
│   ├── product_detail/
│   ├── cart/
│   ├── checkout/
│   ├── auth/
│   └── ...
├── widgets/
│   ├── common/
│   ├── product_card.dart
│   └── ...
├── utils/
│   ├── constants.dart
│   └── helpers.dart
└── main.dart
```

## API Configuration

### 1. Create API Client

```dart
// lib/api/api_client.dart
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiClient {
  static const String baseUrl = 'http://your-api-url.com/api/v1';
  late Dio _dio;
  final _storage = FlutterSecureStorage();

  ApiClient() {
    _dio = Dio(BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    ));

    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await _storage.read(key: 'auth_token');
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (error, handler) {
        if (error.response?.statusCode == 401) {
          _storage.delete(key: 'auth_token');
          // Navigate to login
        }
        return handler.next(error);
      },
    ));
  }

  Dio get dio => _dio;
}
```

### 2. API Services

```dart
// lib/api/auth_service.dart
import 'package:dio/dio.dart';
import 'api_client.dart';

class AuthService {
  final ApiClient _apiClient = ApiClient();

  Future<Response> register(Map<String, dynamic> data) async {
    return await _apiClient.dio.post('/auth/register', data: data);
  }

  Future<Response> login(String email, String password) async {
    return await _apiClient.dio.post('/auth/login', data: {
      'email': email,
      'password': password,
    });
  }

  Future<Response> logout() async {
    return await _apiClient.dio.post('/auth/logout');
  }

  Future<Response> getMe() async {
    return await _apiClient.dio.get('/auth/me');
  }

  Future<Response> updateProfile(Map<String, dynamic> data) async {
    return await _apiClient.dio.put('/auth/profile', data: data);
  }
}
```

```dart
// lib/api/product_service.dart
import 'package:dio/dio.dart';
import 'api_client.dart';

class ProductService {
  final ApiClient _apiClient = ApiClient();

  Future<Response> getProducts({Map<String, dynamic>? params}) async {
    return await _apiClient.dio.get('/products', queryParameters: params);
  }

  Future<Response> getProductById(int id) async {
    return await _apiClient.dio.get('/products/$id');
  }

  Future<Response> getFeaturedProducts() async {
    return await _apiClient.dio.get('/products/featured');
  }

  Future<Response> searchProducts(String query) async {
    return await _apiClient.dio.get('/products/search', queryParameters: {'q': query});
  }

  Future<Response> getProductsByCategory(int categoryId) async {
    return await _apiClient.dio.get('/products/category/$categoryId');
  }
}
```

```dart
// lib/api/cart_service.dart
import 'package:dio/dio.dart';
import 'api_client.dart';

class CartService {
  final ApiClient _apiClient = ApiClient();

  Future<Response> getCart() async {
    return await _apiClient.dio.get('/cart');
  }

  Future<Response> addToCart(int productId, int quantity) async {
    return await _apiClient.dio.post('/cart/add', data: {
      'product_id': productId,
      'quantity': quantity,
    });
  }

  Future<Response> updateCartItem(int itemId, int quantity) async {
    return await _apiClient.dio.put('/cart/update/$itemId', data: {
      'quantity': quantity,
    });
  }

  Future<Response> removeFromCart(int itemId) async {
    return await _apiClient.dio.delete('/cart/remove/$itemId');
  }

  Future<Response> clearCart() async {
    return await _apiClient.dio.delete('/cart/clear');
  }
}
```

## Models

### 1. Product Model

```dart
// lib/models/product.dart
class Product {
  final int id;
  final String name;
  final String slug;
  final String sku;
  final String? description;
  final double price;
  final double? salePrice;
  final int stockQuantity;
  final bool isActive;
  final bool featured;
  final List<ProductImage>? images;

  Product({
    required this.id,
    required this.name,
    required this.slug,
    required this.sku,
    this.description,
    required this.price,
    this.salePrice,
    required this.stockQuantity,
    required this.isActive,
    required this.featured,
    this.images,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      name: json['name'],
      slug: json['slug'],
      sku: json['sku'],
      description: json['description'],
      price: (json['price'] as num).toDouble(),
      salePrice: json['sale_price'] != null ? (json['sale_price'] as num).toDouble() : null,
      stockQuantity: json['stock_quantity'],
      isActive: json['is_active'],
      featured: json['featured'],
      images: json['images'] != null
          ? (json['images'] as List).map((i) => ProductImage.fromJson(i)).toList()
          : null,
    );
  }

  double get currentPrice => salePrice ?? price;
}

class ProductImage {
  final int id;
  final String imagePath;
  final bool isPrimary;

  ProductImage({
    required this.id,
    required this.imagePath,
    required this.isPrimary,
  });

  factory ProductImage.fromJson(Map<String, dynamic> json) {
    return ProductImage(
      id: json['id'],
      imagePath: json['image_path'],
      isPrimary: json['is_primary'],
    );
  }
}
```

### 2. User Model

```dart
// lib/models/user.dart
class User {
  final int id;
  final String name;
  final String email;
  final String? phone;
  final String? avatar;

  User({
    required this.id,
    required this.name,
    required this.email,
    this.phone,
    this.avatar,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      phone: json['phone'],
      avatar: json['avatar'],
    );
  }
}
```

## State Management (Provider)

### 1. Auth Provider

```dart
// lib/providers/auth_provider.dart
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../api/auth_service.dart';
import '../models/user.dart';

class AuthProvider with ChangeNotifier {
  final AuthService _authService = AuthService();
  final _storage = FlutterSecureStorage();

  User? _user;
  bool _isLoading = false;
  String? _error;

  User? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _user != null;

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _authService.login(email, password);
      final token = response.data['token'];
      _user = User.fromJson(response.data['user']);

      await _storage.write(key: 'auth_token', value: token);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = 'Login failed. Please check your credentials.';
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> register(Map<String, dynamic> data) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _authService.register(data);
      final token = response.data['token'];
      _user = User.fromJson(response.data['user']);

      await _storage.write(key: 'auth_token', value: token);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = 'Registration failed. Please try again.';
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> logout() async {
    try {
      await _authService.logout();
    } catch (e) {
      // Handle error
    } finally {
      _user = null;
      await _storage.delete(key: 'auth_token');
      notifyListeners();
    }
  }

  Future<void> fetchUser() async {
    try {
      final response = await _authService.getMe();
      _user = User.fromJson(response.data['user']);
      notifyListeners();
    } catch (e) {
      _user = null;
      await _storage.delete(key: 'auth_token');
      notifyListeners();
    }
  }
}
```

### 2. Cart Provider

```dart
// lib/providers/cart_provider.dart
import 'package:flutter/material.dart';
import '../api/cart_service.dart';
import '../models/product.dart';

class CartItem {
  final int id;
  final Product product;
  int quantity;

  CartItem({
    required this.id,
    required this.product,
    required this.quantity,
  });

  double get total => product.currentPrice * quantity;
}

class CartProvider with ChangeNotifier {
  final CartService _cartService = CartService();

  List<CartItem> _items = [];
  bool _isLoading = false;

  List<CartItem> get items => _items;
  bool get isLoading => _isLoading;
  double get total => _items.fold(0, (sum, item) => sum + item.total);
  int get itemCount => _items.length;

  Future<void> fetchCart() async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await _cartService.getCart();
      _items = (response.data['items'] as List)
          .map((item) => CartItem(
                id: item['id'],
                product: Product.fromJson(item['product']),
                quantity: item['quantity'],
              ))
          .toList();
    } catch (e) {
      // Handle error
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> addToCart(int productId, int quantity) async {
    try {
      await _cartService.addToCart(productId, quantity);
      await fetchCart();
    } catch (e) {
      throw e;
    }
  }

  Future<void> updateQuantity(int itemId, int quantity) async {
    try {
      await _cartService.updateCartItem(itemId, quantity);
      await fetchCart();
    } catch (e) {
      throw e;
    }
  }

  Future<void> removeFromCart(int itemId) async {
    try {
      await _cartService.removeFromCart(itemId);
      await fetchCart();
    } catch (e) {
      throw e;
    }
  }
}
```

## Screens

### 1. Login Screen

```dart
// lib/screens/auth/login_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);

    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _emailController,
                decoration: InputDecoration(labelText: 'Email'),
                validator: (value) => value?.isEmpty ?? true ? 'Please enter email' : null,
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _passwordController,
                decoration: InputDecoration(labelText: 'Password'),
                obscureText: true,
                validator: (value) => value?.isEmpty ?? true ? 'Please enter password' : null,
              ),
              SizedBox(height: 24),
              if (authProvider.error != null)
                Text(
                  authProvider.error!,
                  style: TextStyle(color: Colors.red),
                ),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: authProvider.isLoading
                    ? null
                    : () async {
                        if (_formKey.currentState!.validate()) {
                          final success = await authProvider.login(
                            _emailController.text,
                            _passwordController.text,
                          );
                          if (success) {
                            Navigator.pushReplacementNamed(context, '/home');
                          }
                        }
                      },
                child: authProvider.isLoading
                    ? CircularProgressIndicator()
                    : Text('Login'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### 2. Products Screen

```dart
// lib/screens/products/products_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../api/product_service.dart';
import '../../models/product.dart';
import '../../providers/cart_provider.dart';

class ProductsScreen extends StatefulWidget {
  @override
  _ProductsScreenState createState() => _ProductsScreenState();
}

class _ProductsScreenState extends State<ProductsScreen> {
  final ProductService _productService = ProductService();
  List<Product> _products = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchProducts();
  }

  Future<void> _fetchProducts() async {
    try {
      final response = await _productService.getProducts();
      setState(() {
        _products = (response.data['data'] as List)
            .map((json) => Product.fromJson(json))
            .toList();
        _isLoading = false;
      });
    } catch (e) {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final cartProvider = Provider.of<CartProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Products'),
        actions: [
          IconButton(
            icon: Icon(Icons.shopping_cart),
            onPressed: () => Navigator.pushNamed(context, '/cart'),
            badge: cartProvider.itemCount > 0
                ? Text('${cartProvider.itemCount}')
                : null,
          ),
        ],
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : GridView.builder(
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 0.7,
              ),
              itemCount: _products.length,
              itemBuilder: (context, index) {
                final product = _products[index];
                return ProductCard(
                  product: product,
                  onAddToCart: () async {
                    try {
                      await cartProvider.addToCart(product.id, 1);
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Added to cart')),
                      );
                    } catch (e) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Failed to add to cart')),
                      );
                    }
                  },
                );
              },
            ),
    );
  }
}
```

## Main App Setup

```dart
// lib/main.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'providers/cart_provider.dart';
import 'screens/auth/login_screen.dart';
import 'screens/home/home_screen.dart';
import 'screens/products/products_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => CartProvider()),
      ],
      child: MaterialApp(
        title: 'Jumia',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        initialRoute: '/',
        routes: {
          '/': (context) => HomeScreen(),
          '/login': (context) => LoginScreen(),
          '/products': (context) => ProductsScreen(),
        },
      ),
    );
  }
}
```

## Best Practices

1. **Error Handling**: Always handle API errors with try-catch
2. **Loading States**: Show loading indicators during API calls
3. **State Management**: Use Provider or Riverpod for state management
4. **Image Caching**: Use cached_network_image for product images
5. **Secure Storage**: Use flutter_secure_storage for tokens
6. **Responsive Design**: Make layouts responsive for different screen sizes
7. **Offline Support**: Consider implementing offline caching

## Testing

```bash
flutter test
```

## Building for Production

### Android
```bash
flutter build apk --release
```

### iOS
```bash
flutter build ios --release
```

## Next Steps

1. Implement product search and filters
2. Add product reviews and ratings
3. Implement wishlist functionality
4. Add order tracking
5. Implement push notifications
6. Add payment integration
7. Implement image caching and optimization

