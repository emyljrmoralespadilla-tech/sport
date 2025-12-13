import useFetch from "../hooks/useFetch";
import { fetchProducts } from "../services/api";
import ProductList from "../components/ProductList";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const { data } = useFetch(fetchProducts, []);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [searchParams] = useSearchParams();

  const categoryFilter = searchParams.get("cat");

  const filtered = data.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesPrice = p.price <= maxPrice;
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    return matchesSearch && matchesPrice && matchesCategory;
  });

  const getCategoryTitle = () => {
    if (!categoryFilter) return "Todos los Productos";
    const titles = {
      zapatillas: "👟 Zapatillas",
      ropa: "👕 Ropa Deportiva",
      accesorios: "🎒 Accesorios",
      proteinas: "💪 Proteínas"
    };
    return titles[categoryFilter] || "Productos";
  };

  return (
    <div className="products-page">
      <div className="products-container">
        <h2 className="products-title">{getCategoryTitle()}</h2>

        <div className="filters-section">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="price-filter">
            <label htmlFor="price-range">Precio máximo: ${maxPrice.toLocaleString()}</label>
            <input
              id="price-range"
              type="range"
              min="0"
              max="300000"
              step="5000"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="price-range-input"
            />
          </div>
        </div>

        <ProductList products={filtered} />

        {filtered.length === 0 && (
          <div className="no-products">
            <p>❌ No se encontraron productos con esos filtros.</p>
            <p style={{ fontSize: "0.9rem", color: "#999" }}>Intenta cambiar la búsqueda o el precio máximo.</p>
          </div>
        )}
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

        .products-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 2rem;
          text-align: left;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .filters-section {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 1.5rem;
          border-radius: 15px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(6px);
        }

        .search-input {
          padding: 0.75rem;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.04);
          color: #fff;
        }

        .search-input:focus {
          outline: none;
          border-color: #764ba2;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
        }

        .price-filter {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .price-filter label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #e6e6e6;
        }

        .price-range-input {
          cursor: pointer;
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(to right, #667eea, #764ba2, #f093fb);
        }

        .no-products {
          text-align: center;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 15px;
          border: 2px dashed rgba(255, 255, 255, 0.12);
          color: #e6e6e6;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .no-products p:first-child {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .filters-section {
            grid-template-columns: 1fr;
          }

          .products-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
}
