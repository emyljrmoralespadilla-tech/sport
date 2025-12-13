import { useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!id) return;
    
    getProductById(id)
      .then(data => {
        console.log("Producto cargado:", data);
        setProduct(data);
      })
      .catch(error => {
        console.error("Error al cargar producto:", error);
        setProduct(null);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  return (
    <div className="products-page">
      <div className="products-container" style={{ padding: '3rem 1rem' }}>
        <div className="product-detail-wrapper">
          {product ? (
            <div className="product-detail-content">
              <div className="product-image-section">
                <img src={product.image} alt={product.name} className="product-detail-image" />
                <div className="product-badge">{product.category}</div>
              </div>

              <div className="product-info-section">
                <h1 className="product-detail-title">{product.name}</h1>
                
                <div className="product-rating">
                  <span className="stars">★★★★★</span>
                  <span className="reviews">(128 reseñas)</span>
                </div>

                <p className="product-description">{product.description}</p>

                <div className="product-specs">
                  <div className="spec-item">
                    <span className="spec-label">Categoría:</span>
                    <span className="spec-value">{product.category}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Disponibilidad:</span>
                    <span className="spec-value" style={{color: '#10b981'}}>En Stock</span>
                  </div>
                </div>

                <div className="price-section">
                  <p className="product-price">${product.price.toLocaleString()}</p>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`btn-add-to-cart ${added ? 'added' : ''}`}
                >
                  {added ? '✓ ¡Agregado al carrito!' : 'Agregar al carrito'}
                </button>
              </div>
            </div>
          ) : (
            <div className="loading-skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-line"></div>
                <div className="skeleton-line" style={{width: '70%'}}></div>
                <div className="skeleton-line" style={{width: '50%'}}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .products-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #000000 0%, #444444 50%, #ffffff 100%);
          background-attachment: fixed;
          padding: 2rem 0;
          color: #f1f5f9;
        }

        .products-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .product-detail-wrapper {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 3rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        .product-detail-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .product-image-section {
          position: relative;
        }

        .product-detail-image {
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
          transition: transform 0.4s ease;
        }

        .product-detail-image:hover {
          transform: scale(1.02);
        }

        .product-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 8px 16px;
          border-radius: 25px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          box-shadow: 0 4px 15px rgba(102,126,234,0.4);
        }

        .product-info-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .product-detail-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .stars {
          font-size: 1.5rem;
          color: #fbbf24;
        }

        .reviews {
          color: #d1d5db;
          font-size: 0.95rem;
        }

        .product-description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #e6e6e6;
          margin: 0;
        }

        .product-specs {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255,255,255,0.04);
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .spec-label {
          color: #b0b0b0;
          font-weight: 600;
        }

        .spec-value {
          color: #fff;
          font-weight: 500;
          text-transform: capitalize;
        }

        .price-section {
          padding: 1.5rem;
          background: linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%);
          border-radius: 12px;
          border: 1px solid rgba(102,126,234,0.2);
        }

        .product-price {
          font-size: 2.5rem;
          font-weight: 900;
          color: #fff;
          margin: 0;
          text-shadow: 0 2px 8px rgba(102,126,234,0.4);
        }

        .btn-add-to-cart {
          padding: 16px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(102,126,234,0.4);
          width: 100%;
        }

        .btn-add-to-cart:hover:not(.added) {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(102,126,234,0.6);
        }

        .btn-add-to-cart.added {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 8px 20px rgba(16,185,129,0.4);
        }

        .loading-skeleton {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        .skeleton-image {
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 12px;
        }

        .skeleton-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .skeleton-line {
          height: 16px;
          background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 6px;
          width: 100%;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 768px) {
          .product-detail-wrapper {
            padding: 1.5rem;
          }

          .product-detail-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .product-detail-title {
            font-size: 1.8rem;
          }

          .product-price {
            font-size: 2rem;
          }

          .loading-skeleton {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
