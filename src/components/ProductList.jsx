import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return (
    <div className="product-list-container">
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={product.id} className="product-grid-item" style={{
            animationDelay: `${index * 0.05}s`
          }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <style>{`
        .product-list-container {
          width: 100%;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
          width: 100%;
        }

        .product-grid-item {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductList;
