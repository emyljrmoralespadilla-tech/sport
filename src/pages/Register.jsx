import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar errores cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es requerido";
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es requerido";
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido";
    if (!formData.address.trim()) newErrors.address = "La dirección es requerida";
    if (!formData.city.trim()) newErrors.city = "La ciudad es requerida";
    if (!formData.postalCode.trim()) newErrors.postalCode = "El código postal es requerido";
    if (!formData.country.trim()) newErrors.country = "El país es requerido";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      // Simular envío al servidor - en una app real, enviarías a tu backend
      // Por ahora guardamos en localStorage como demo
      const users = JSON.parse(localStorage.getItem("users")) || [];
      
      // Verificar si el email ya existe
      if (users.some(u => u.email === formData.email)) {
        setErrors({ email: "Este email ya está registrado" });
        setLoading(false);
        return;
      }

      // Guardar nuevo usuario (sin la contraseña en texto plano en una app real)
      const newUser = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        registeredAt: new Date().toLocaleDateString()
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error en el registro:", error);
      setErrors({ general: "Hubo un error al registrar. Por favor, intenta de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Crear Cuenta</h1>
        <p className="register-subtitle">Únete a SportStore y disfruta de nuestros productos</p>

        {success ? (
          <div className="success-message">
            ¡Registro exitoso! Redirigiendo a login...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="register-form">
            {errors.general && <div className="error-message">{errors.general}</div>}

            {/* Primera fila: Nombre y Apellido */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Nombre *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Apellido *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>

            {/* Email */}
            <div className="form-group full-width">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Contraseña */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Contraseña *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                />
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
            </div>

            {/* Teléfono */}
            <div className="form-group full-width">
              <label htmlFor="phone">Teléfono *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+34 123 456 789"
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            {/* Dirección */}
            <div className="form-group full-width">
              <label htmlFor="address">Dirección *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Calle y número"
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            {/* Ciudad, Código Postal, País */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Ciudad *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Tu ciudad"
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="postalCode">Código Postal *</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="CP"
                />
                {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
              </div>
            </div>

            {/* País */}
            <div className="form-group full-width">
              <label htmlFor="country">País *</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Tu país"
              />
              {errors.country && <span className="error-text">{errors.country}</span>}
            </div>

            {/* Botón Registrarse */}
            <Button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Registrando..." : "Crear Cuenta"}
            </Button>

            {/* Link a Login */}
            <p className="login-link">
              ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
            </p>
          </form>
        )}
      </div>

      <style>{`
        .register-page {
          min-height: 100vh;
          padding: 2rem 0;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          color: white;
        }

        .register-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
        }

        .register-page h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          text-align: center;
          color: white;
        }

        .register-subtitle {
          text-align: center;
          color: #bbb;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .register-form {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .error-message {
          background: rgba(244, 67, 54, 0.2);
          border: 1px solid #f44336;
          color: #ff6b6b;
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .success-message {
          background: rgba(76, 175, 80, 0.2);
          border: 2px solid #4caf50;
          color: #4caf50;
          padding: 1.5rem;
          border-radius: 8px;
          text-align: center;
          font-size: 1.1rem;
          font-weight: 500;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #ddd;
          font-size: 0.95rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
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
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
        }

        .error-text {
          display: block;
          color: #ff6b6b;
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }

        .submit-btn {
          width: 100%;
          padding: 0.85rem !important;
          font-size: 1rem;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-link {
          text-align: center;
          color: #bbb;
          margin-top: 1.5rem;
          font-size: 0.95rem;
        }

        .login-link a {
          color: #64b5f6;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .login-link a:hover {
          color: #90caf9;
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .register-page h1 {
            font-size: 1.8rem;
          }

          .register-container {
            padding: 1rem;
          }

          .register-form {
            padding: 1.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
