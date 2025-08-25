import { useState } from 'react';
import './App.css';

function Header({ cartItems, toggleCart }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">ShopEasy</h1>
          <nav className="hidden md:ml-8 md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Products</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Categories</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Deals</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-blue-600">
            <i className="fas fa-search text-lg"></i>
          </button>
          <button className="text-gray-700 hover:text-blue-600">
            <i className="fas fa-user text-lg"></i>
          </button>
          <button className="text-gray-700 hover:text-blue-600 relative" onClick={toggleCart}>
            <i className="fas fa-shopping-cart text-lg"></i>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
          <button className="md:hidden text-gray-700">
            <i className="fas fa-bars text-lg"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="bg-blue-600 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Summer Sale Up To 50% Off</h2>
        <p className="text-xl mb-8">Get the best deals on our premium products</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
          Shop Now
        </button>
      </div>
    </section>
  );
}

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden product-card transition duration-300">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">New</span>
        )}
        {product.discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{product.discount}%
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <i 
              key={i} 
              className={`fas fa-star ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            ></i>
          ))}
          <span className="text-gray-500 text-sm ml-2">({product.reviews})</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            {product.originalPrice > product.price && (
              <p className="text-gray-500 line-through text-sm">${product.originalPrice.toFixed(2)}</p>
            )}
            <p className="text-blue-600 font-bold text-xl">${product.price.toFixed(2)}</p>
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductsSection({ products, onAddToCart }) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our most popular products loved by thousands of customers worldwide</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Cart({ isOpen, cartItems, onUpdateQuantity, onRemoveItem, onClose }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md mx-auto mt-20 rounded-lg shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Your Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-4 cart-item fade-in">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="ml-4">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-blue-600 font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l"
                  >
                    <i className="fas fa-minus text-xs"></i>
                  </button>
                  <span className="w-10 h-8 flex items-center justify-center bg-gray-100">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r"
                  >
                    <i className="fas fa-plus text-xs"></i>
                  </button>
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t p-4">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-blue-600">${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ShopEasy</h3>
            <p className="text-gray-400">Your one-stop shop for all your needs. Quality products at affordable prices.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Categories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Shipping Info</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get special offers and once-in-a-lifetime deals.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l text-gray-800 w-full"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2023 ShopEasy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 4,
      reviews: 132,
      isNew: true,
      discount: 25
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 149.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 5,
      reviews: 287,
      isNew: false,
      discount: 25
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 4,
      reviews: 56,
      isNew: true,
      discount: 20
    },
    {
      id: 4,
      name: "Sunglasses",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 3,
      reviews: 89,
      isNew: false,
      discount: 29
    },
    {
      id: 5,
      name: "Water Bottle",
      price: 24.99,
      originalPrice: 34.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 5,
      reviews: 204,
      isNew: false,
      discount: 29
    },
    {
      id: 6,
      name: "Backpack",
      price: 59.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 4,
      reviews: 167,
      isNew: true,
      discount: 25
    },
    {
      id: 7,
      name: "Bluetooth Speaker",
      price: 39.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 4,
      reviews: 98,
      isNew: false,
      discount: 33
    },
    {
      id: 8,
      name: "Fitness Tracker",
      price: 34.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 3,
      reviews: 76,
      isNew: false,
      discount: 30
    }
  ];

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    setCartOpen(true);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const toggleCart = () => {
    setCartOpen(prev => !prev);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItems={cartItems} toggleCart={toggleCart} />
      <main className="flex-grow">
        <HeroSection />
        <ProductsSection products={products} onAddToCart={addToCart} />
      </main>
      <Cart 
        isOpen={cartOpen} 
        cartItems={cartItems} 
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClose={closeCart}
      />
      <Footer />
    </div>
  );
}

export default App;