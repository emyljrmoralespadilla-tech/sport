import { Link } from "react-router-dom";
import "../styles/globals.css";

export default function Home() {
  return (
    <section className="hero">
      <h1>Bienvenido a SportStore</h1>
      <p>Tu tienda deportiva online favorita.</p>

      <div className="hero-buttons">
        <Link to="/register" className="btn">
          Registrarse
        </Link>

        <Link to="/contact" className="btn btn-outline">
          Contacto
        </Link>
      </div>
    </section>
  );
}
