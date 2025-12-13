// src/pages/Checkout.jsx
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { createOrder } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const nav = useNavigate();

  const total = cart.reduce((s, p) => s + p.price, 0);

  const handlePay = async () => {
    if (cart.length === 0) return alert("Carrito vacío");
    setProcessing(true);
    
    setTimeout(async () => {
      const order = {
        userId: user?.id || null,
        items: cart,
        total,
        date: new Date().toISOString()
      };
      const result = await createOrder(order);
      const orderNum = `ORD-${Date.now()}`;
      setOrderNumber(orderNum);
      clearCart();
      setProcessing(false);
      setPaid(true);
    }, 2000);
  };

  if (paid) {
    return (
      <div className="checkout-success-page">
        <div className="success-container">
          <div className="success-card">
            <div className="success-animation">
              <div className="success-circle">
                <svg viewBox="0 0 24 24" className="success-checkmark">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            </div>

            <h1 className="success-title">¡Pago Exitoso!</h1>
            <p className="success-subtitle">Tu orden ha sido procesada correctamente</p>

            <div className="order-details">
              <div className="detail-item">
                <span className="detail-label">Número de Orden:</span>
                <span className="detail-value">{orderNumber}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Cliente:</span>
                <span className="detail-value">{user?.name || user?.email || "Invitado"}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Total Pagado:</span>
                <span className="detail-value total-amount">${total.toLocaleString()}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Artículos:</span>
                <span className="detail-value">{cart.length} producto(s)</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Estado:</span>
                <span className="detail-value status-confirmed">✓ Confirmado</span>
              </div>
            </div>

            <div className="items-summary">
              <h3>Resumen de tu compra:</h3>
              <div className="items-list">
                {cart.map((item, idx) => (
                  <div key={idx} className="item-row">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="items-total">
                <span>Total:</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            <div className="success-message">
              <p>
                🎉 ¡Gracias por tu compra! Tu orden será entregada en 2-5 días hábiles.
              </p>
              <p>
                Se ha enviado un email de confirmación a <strong>{user?.email || "tu correo"}</strong>
              </p>
            </div>

            <div className="success-actions">
              <button onClick={() => nav("/products")} className="btn-continue-shopping">
                Continuar Comprando
              </button>
              <button onClick={() => nav("/")} className="btn-home">
                Volver a Home
              </button>
            </div>
          </div>
        </div>

        <style>{`
          .checkout-success-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0f4c75 100%);
            padding: 2rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .success-container {
            width: 100%;
            max-width: 700px;
            padding: 0 1rem;
          }

          .success-card {
            background: rgba(255, 255, 255, 0.08);
            border: 2px solid rgba(16, 185, 129, 0.5);
            border-radius: 25px;
            padding: 3rem;
            backdrop-filter: blur(10px);
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6), 0 0 40px rgba(16, 185, 129, 0.2);
            animation: slideUp 0.6s ease-out;
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .success-animation {
            text-align: center;
            margin-bottom: 2rem;
          }

          .success-circle {
            width: 120px;
            height: 120px;
            margin: 0 auto;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4);
          }

          @keyframes scaleIn {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          .success-checkmark {
            width: 70px;
            height: 70px;
            color: white;
            animation: checkmark 0.6s ease-out;
          }

          @keyframes checkmark {
            from {
              stroke-dashoffset: 100;
            }
            to {
              stroke-dashoffset: 0;
            }
          }

          .success-title {
            color: #10b981;
            font-size: 2.5rem;
            margin: 0 0 0.5rem 0;
            font-weight: bold;
            text-align: center;
          }

          .success-subtitle {
            color: #b1e3d3;
            font-size: 1.1rem;
            text-align: center;
            margin: 0 0 2rem 0;
          }

          .order-details {
            background: rgba(16, 185, 129, 0.08);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 15px;
            padding: 2rem;
            margin-bottom: 2rem;
          }

          .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.8rem 0;
            border-bottom: 1px solid rgba(16, 185, 129, 0.15);
            color: #f1f5f9;
          }

          .detail-item:last-child {
            border-bottom: none;
          }

          .detail-label {
            font-weight: 600;
            color: #b1e3d3;
          }

          .detail-value {
            color: #ffffff;
            font-size: 1.1rem;
            font-weight: 500;
          }

          .total-amount {
            color: #10b981;
            font-size: 1.3rem;
            font-weight: bold;
          }

          .status-confirmed {
            color: #10b981;
            background: rgba(16, 185, 129, 0.2);
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            font-weight: bold;
          }

          .items-summary {
            background: rgba(255, 255, 255, 0.05);
            border-left: 4px solid rgba(16, 185, 129, 0.5);
            border-radius: 10px;
            padding: 1.5rem;
            margin-bottom: 2rem;
          }

          .items-summary h3 {
            color: #b1e3d3;
            margin: 0 0 1rem 0;
            font-size: 1.1rem;
          }

          .items-list {
            margin-bottom: 1rem;
          }

          .item-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.6rem 0;
            color: #e6e6e6;
          }

          .item-name {
            flex: 1;
          }

          .item-price {
            color: #10b981;
            font-weight: 600;
            min-width: 100px;
            text-align: right;
          }

          .items-total {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
            border-top: 2px solid rgba(16, 185, 129, 0.3);
            color: #ffffff;
            font-weight: bold;
            font-size: 1.2rem;
          }

          .items-total span:last-child {
            color: #10b981;
          }

          .success-message {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 10px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            text-align: center;
          }

          .success-message p {
            color: #93c5fd;
            margin: 0.5rem 0;
            line-height: 1.6;
          }

          .success-message strong {
            color: #60a5fa;
          }

          .success-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
          }

          .btn-continue-shopping,
          .btn-home {
            flex: 1;
            min-width: 180px;
            padding: 1rem 2rem;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .btn-continue-shopping {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
          }

          .btn-continue-shopping:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
          }

          .btn-home {
            background: rgba(255, 255, 255, 0.1);
            color: #b1e3d3;
            border: 2px solid rgba(16, 185, 129, 0.5);
          }

          .btn-home:hover {
            background: rgba(16, 185, 129, 0.2);
            transform: translateY(-2px);
          }

          @media (max-width: 600px) {
            .success-card {
              padding: 2rem;
            }

            .success-title {
              font-size: 2rem;
            }

            .success-actions {
              flex-direction: column;
            }

            .btn-continue-shopping,
            .btn-home {
              width: 100%;
              min-width: unset;
            }

            .detail-item {
              flex-direction: column;
              align-items: flex-start;
              gap: 0.5rem;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-card">
          <h1 className="checkout-title">Resumen de tu Compra</h1>

          <div className="checkout-info">
            <p><strong>Cliente:</strong> {user?.name || user?.email || "Invitado"}</p>
            <p><strong>Email:</strong> {user?.email || "No especificado"}</p>
          </div>

          <div className="cart-items">
            <h2>Productos:</h2>
            {cart.length > 0 ? (
              <div className="items-table">
                {cart.map((item, idx) => (
                  <div key={idx} className="cart-row">
                    <span className="item-detail">{item.name}</span>
                    <span className="item-detail">${item.price.toLocaleString()}</span>
                  </div>
                ))}
                <div className="cart-total">
                  <span>Total:</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <p className="empty-cart">Tu carrito está vacío</p>
            )}
          </div>

          <button
            onClick={handlePay}
            disabled={processing || cart.length === 0}
            className="btn-pay"
          >
            {processing ? (
              <>
                <span className="spinner"></span> Procesando pago...
              </>
            ) : (
              "💳 Pagar Ahora"
            )}
          </button>
        </div>
      </div>

      <style>{`
        .checkout-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          padding: 2rem 0;
        }

        .checkout-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .checkout-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 2rem;
          color: #f1f5f9;
        }

        .checkout-title {
          color: #ffffff;
          margin: 0 0 2rem 0;
          font-size: 2rem;
          text-align: center;
        }

        .checkout-info {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          color: #93c5fd;
        }

        .checkout-info p {
          margin: 0.5rem 0;
        }

        .cart-items {
          margin-bottom: 2rem;
        }

        .cart-items h2 {
          color: #b1e3d3;
          margin: 0 0 1rem 0;
        }

        .items-table {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 10px;
          padding: 1rem;
        }

        .cart-row {
          display: flex;
          justify-content: space-between;
          padding: 0.8rem 0;
          border-bottom: 1px solid rgba(16, 185, 129, 0.1);
          color: #e6e6e6;
        }

        .cart-row:last-of-type {
          border-bottom: none;
        }

        .item-detail {
          flex: 1;
        }

        .item-detail:last-child {
          text-align: right;
          color: #10b981;
          font-weight: 600;
        }

        .cart-total {
          display: flex;
          justify-content: space-between;
          padding: 1rem 0 0;
          border-top: 2px solid rgba(16, 185, 129, 0.3);
          color: #ffffff;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .cart-total span:last-child {
          color: #10b981;
        }

        .empty-cart {
          text-align: center;
          color: #9ca3af;
          padding: 1rem;
        }

        .btn-pay {
          width: 100%;
          padding: 1.2rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }

        .btn-pay:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
        }

        .btn-pay:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 600px) {
          .checkout-card {
            padding: 1.5rem;
          }

          .checkout-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
