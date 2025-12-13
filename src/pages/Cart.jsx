import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, p) => sum + p.price, 0);
  const subtotal = total;
  const impuestos = Math.round(subtotal * 0.19); // 19% IVA
  const totalConImpuestos = subtotal + impuestos;

  return (
    <div className="cart-container">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">🛒 Tu Carrito</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-content">
              <p className="text-xl text-gray-600 mb-6">Tu carrito está vacío</p>
              <Link to="/products" className="btn-continue-shopping">
                Continuar Comprando
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="cart-header">
                  <span className="font-bold">Producto</span>
                  <span className="font-bold">Precio</span>
                  <span className="font-bold">Acción</span>
                </div>

                {cart.map((p, i) => (
                  <div key={i} className="cart-item">
                    <div className="item-name">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="item-image"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{p.name}</p>
                        <p className="text-sm text-gray-500">{p.category}</p>
                      </div>
                    </div>
                    <span className="item-price">${p.price.toLocaleString()}</span>
                    <button
                      onClick={() => removeFromCart(i)}
                      className="btn-remove"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={clearCart}
                className="mt-4 text-red-600 hover:text-red-800 font-semibold"
              >
                Vaciar Carrito
              </button>
            </div>

            <div className="lg:col-span-1">
              <div className="cart-summary">
                <h2 className="text-2xl font-bold mb-6">Resumen</h2>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>

                <div className="summary-row">
                  <span>IVA (19%)</span>
                  <span>${impuestos.toLocaleString()}</span>
                </div>

                <div className="summary-row total">
                  <span>Total</span>
                  <span>${totalConImpuestos.toLocaleString()}</span>
                </div>

                <Link to="/checkout" className="btn-checkout">
                  Proceder al Pago
                </Link>

                <Link to="/products" className="btn-continue-alt">
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .cart-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #000000 0%, #111111 50%, #1f1f1f 100%);
          background-attachment: fixed;
          padding: 2rem 0;
          color: #f1f5f9;
        }

        .empty-cart {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          background: rgba(255,255,255,0.06);
          border-radius: 8px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.25);
        }

        .empty-cart-content {
          text-align: center;
          color: #e6e6e6;
        }

        .btn-continue-shopping {
          display: inline-block;
          padding: 12px 32px;
          background-color: #2563eb;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-continue-shopping:hover {
          background-color: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .cart-header {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 1rem;
          padding: 1.5rem;
          background-color: rgba(255,255,255,0.06);
          font-weight: 600;
          color: #e6e6e6;
        }

        .cart-item {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 1rem;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          align-items: center;
        }

        .cart-item:last-child {
          border-bottom: none;
        }

        .item-name {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .item-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
        }

        .item-price {
          font-weight: 600;
          color: #e2f0ff;
          min-width: 100px;
          text-align: right;
        }

        .btn-remove {
          padding: 6px 12px;
          background-color: #ef4444;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
          font-size: 0.875rem;
        }

        .btn-remove:hover {
          background-color: #dc2626;
          transform: scale(1.05);
        }

        .cart-summary {
          background: rgba(255,255,255,0.06);
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.18);
          position: sticky;
          top: 100px;
          color: #e6e6e6;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: #d1d5db;
        }

        .summary-row.total {
          border-top: 2px solid rgba(255,255,255,0.06);
          padding-top: 1rem;
          margin-top: 1rem;
          font-size: 1.25rem;
          font-weight: bold;
          color: #fff;
        }

        .btn-checkout {
          display: block;
          width: 100%;
          padding: 14px;
          background-color: #10b981;
          color: white;
          text-align: center;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          margin-top: 1.5rem;
          transition: all 0.3s;
        }

        .btn-checkout:hover {
          background-color: #059669;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .btn-continue-alt {
          display: block;
          width: 100%;
          padding: 12px;
          background-color: transparent;
          color: #2563eb;
          text-align: center;
          border: 2px solid #2563eb;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          margin-top: 0.75rem;
          transition: all 0.3s;
        }

        .btn-continue-alt:hover {
          background-color: #2563eb;
          color: white;
        }

        @media (max-width: 768px) {
          .cart-header {
            grid-template-columns: 1fr auto;
          }

          .cart-header span:last-child {
            display: none;
          }

          .cart-item {
            grid-template-columns: 1fr auto;
          }

          .item-name {
            grid-column: 1 / -1;
          }

          .cart-summary {
            position: relative;
            top: auto;
            margin-top: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

