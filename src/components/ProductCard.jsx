import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.name} className="product-image" />
        </Link>
        <div className="product-category-badge">{product.category}</div>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toLocaleString()}</p>

        <button
          onClick={handleAddToCart}
          className={`product-btn ${added ? "added" : ""}`}
        >
          {added ? "✓ Agregado" : "Agregar"}
        </button>
      </div>

      <style>{`
        .product-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 2px solid rgba(102, 126, 234, 0.1);
          cursor: pointer;
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.3);
          border-color: rgba(118, 75, 162, 0.3);
        }

        .product-image-container {
          position: relative;
          overflow: hidden;
          height: 220px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .product-image-container a {
          display: block;
          width: 100%;
          height: 100%;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.1);
        }

        .product-category-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
        }

        .product-info {
          padding: 1.5rem;
        }

        .product-name {
          font-size: 1rem;
          font-weight: 700;
          color: #222;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .product-price {
          font-size: 1.4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .product-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .product-btn:hover:not(.added) {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
        }

        .product-btn.added {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }

        @media (max-width: 768px) {
          .product-card {
            border-radius: 12px;
          }

          .product-image-container {
            height: 180px;
          }

          .product-name {
            font-size: 0.95rem;
          }

          .product-price {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
