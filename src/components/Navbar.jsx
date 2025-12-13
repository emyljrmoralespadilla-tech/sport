import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
    const { cart } = useContext(CartContext);
    
    return (
        <nav className="navbar-container">
            <div className="navbar-left">
                <h1 className="logo">SportStore 🏆</h1>
            </div>

            <div className="navbar-right">
                <Button
                    to="/"
                    variant="light"
                    className="bth-Home btn-light rounded-full shadow-md transform hover:-translate-y-0.5 hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M3 10.5V21a1 1 0 001 1h5v-6h4v6h5a1 1 0 001-1V10.5a1 1 0 00-.364-.758l-8-6.5a1 1 0 00-1.272 0l-8 6.5A1 1 0 003 10.5z" />
                    </svg>
                    <span>Inicio</span>
                </Button>
                

                <div className="dropdown">
                    <button className="dropbtn">Productos ▼</button>

                    <div className="dropdown-content">
                        <Link to="/products?cat=zapatillas">Zapatillas</Link>
                        <Link to="/products?cat=ropa">Ropa deportiva</Link>
                        <Link to="/products?cat=accesorios">Accesorios</Link>
                        <Link to="/products?cat=proteinas">Proteínas</Link>
                    </div>
                </div>

                <Link to="/cart" className="cart-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="cart-icon">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.3.12-.46 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                    {cart.length > 0 && (
                        <span className="cart-badge">{cart.length}</span>
                    )}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
