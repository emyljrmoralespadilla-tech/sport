import { useState } from "react";
import Button from "../components/Button";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos a un servidor o email
    console.log("Formulario enviado:", formData);
    setSubmitted(true);
    // Limpiar el formulario después de 2 segundos
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contactanos</h1>
        <p className="contact-subtitle">¿Tienes preguntas? Nos encantaría saber de ti.</p>

        {submitted ? (
          <div className="success-message">
            ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nombre *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tu mensaje aquí..."
                rows="6"
              />
            </div>

            <Button type="submit" className="submit-btn">
              Enviar Mensaje
            </Button>
          </form>
        )}

        {/* Información de contacto adicional */}
        <div className="contact-info">
          <div className="info-card">
            <h3>📍 Ubicación</h3>
            <p>SportStore HQ<br />Calle Principal 123<br />Ciudad Deportiva, CP 12345</p>
          </div>

          <div className="info-card">
            <h3>📞 Teléfono</h3>
            <p><a href="tel:+34123456789">+34 123 456 789</a></p>
          </div>

          <div className="info-card">
            <h3>✉️ Email</h3>
            <p><a href="mailto:info@sportstore.com">info@sportstore.com</a></p>
          </div>
        </div>
      </div>

      <style>{`
        .contact-page {
          min-height: 100vh;
          padding: 2rem 0;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          color: white;
        }

        .contact-container {
          max-width: 700px;
          margin: 0 auto;
          padding: 2rem;
        }

        .contact-page h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          text-align: center;
          color: white;
        }

        .contact-subtitle {
          text-align: center;
          color: #bbb;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .contact-form {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 3rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #ddd;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.08);
          color: white;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 150px;
        }

        .submit-btn {
          width: 100%;
          padding: 0.75rem !important;
          font-size: 1rem;
          font-weight: 600;
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
          margin-bottom: 2rem;
        }

        .contact-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .info-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .info-card h3 {
          margin-top: 0;
          margin-bottom: 0.75rem;
          font-size: 1.2rem;
        }

        .info-card p {
          margin: 0;
          color: #ccc;
          line-height: 1.6;
        }

        .info-card a {
          color: #64b5f6;
          text-decoration: none;
          transition: color 0.2s;
        }

        .info-card a:hover {
          color: #90caf9;
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .contact-page h1 {
            font-size: 2rem;
          }

          .contact-container {
            padding: 1rem;
          }

          .contact-form {
            padding: 1.5rem;
          }

          .contact-info {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
