// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Disclaimer from "./pages/Disclaimer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/disclaimer" element={
          <ProtectedRoute>
            <Disclaimer />
          </ProtectedRoute>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <Admin />
          </ProtectedRoute>
        }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
