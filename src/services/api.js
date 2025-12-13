// src/services/api.js
const API = "http://localhost:5000";

export const fetchProducts = async () => {
  const res = await fetch(`${API}/products`);
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API}/products/${id}`);
  if (!res.ok) throw new Error("Error al cargar el producto");
  return res.json();
};

export const createProduct = async (product) => {
  const res = await fetch(`${API}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });
  return res.json();
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`${API}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API}/products/${id}`, {
    method: "DELETE"
  });
  return res.ok;
};

// Simple auth: allow login with any email/password
export const loginUser = async (email, password) => {
  if (email && password) {
    return {
      id: Date.now().toString(),
      email: email,
      password: password,
      name: email.split("@")[0]
    };
  }
  return null;
};

// Orders
export const createOrder = async (order) => {
  const res = await fetch(`${API}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
  });
  return res.json();
};
