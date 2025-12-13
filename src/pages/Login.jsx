// src/pages/Login.jsx
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const res = await login(email, password);
      if (res.ok) {
        nav("/disclaimer");
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError("Hubo un error al iniciar sesión. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Bienvenido</h1>
            <p>Inicia sesión en tu cuenta SportStore</p>
          </div>

          <form onSubmit={submit} className="login-form">
            {error && <div className="error-message">
              <span>⚠️</span> {error}
            </div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" disabled={loading} className="login-btn">
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="login-footer">
            <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
            <p><Link to="/contact">¿Olvidaste tu contraseña?</Link></p>
          </div>
        </div>

  
        <div className="login-benefits">
          <div className="benefit-item">
            <span className="benefit-icon">🛒</span>
            <h3>Compra Fácil</h3>
            <p>Acceso rápido a tus pedidos</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🚚</span>
            <h3>Envíos Rápidos</h3>
            <p>Entrega en 24-48 horas</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">💰</span>
            <h3>Ofertas Exclusivas</h3>
            <p>Descuentos para miembros</p>
          </div>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
        }

        .login-container {
          width: 100%;
          max-width: 1000px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: 2.5rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-header h1 {
          font-size: 2rem;
          color: white;
          margin: 0 0 0.5rem 0;
        }

        .login-header p {
          color: #aaa;
          font-size: 0.95rem;
          margin: 0;
        }

        .login-form {
          margin-bottom: 1.5rem;
        }

        .error-message {
          background: rgba(244, 67, 54, 0.15);
          border-left: 4px solid #f44336;
          color: #ff6b6b;
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
        }

        .error-message span {
          font-size: 1.2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #ddd;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.85rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.08);
          color: white;
          font-size: 0.95rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-group input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .form-group input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 0 3px rgba(100, 181, 246, 0.2);
        }

        .form-group input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-btn {
          width: 100%;
          padding: 0.9rem !important;
          font-size: 1rem;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-footer {
          text-align: center;
          color: #aaa;
          font-size: 0.9rem;
        }

        .login-footer p {
          margin: 0.75rem 0;
        }

        .login-footer a {
          color: #64b5f6;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .login-footer a:hover {
          color: #90caf9;
          text-decoration: underline;
        }

        .login-benefits {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .benefit-item {
          text-align: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }

        .benefit-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .benefit-icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .benefit-item h3 {
          color: white;
          margin: 0.5rem 0 0.25rem 0;
          font-size: 1.05rem;
        }

        .benefit-item p {
          color: #aaa;
          margin: 0;
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .login-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .login-card {
            padding: 2rem;
          }

          .login-header h1 {
            font-size: 1.6rem;
          }

          .login-benefits {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }

          .benefit-item {
            padding: 1rem;
          }

          .benefit-icon {
            font-size: 2rem;
          }

          .benefit-item h3 {
            font-size: 0.9rem;
          }

          .benefit-item p {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 600px) {
          .login-page {
            padding: 1rem;
          }

          .login-container {
            gap: 1.5rem;
          }

          .login-card {
            padding: 1.5rem;
          }

          .login-header h1 {
            font-size: 1.4rem;
          }

          .login-benefits {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
