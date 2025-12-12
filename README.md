# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# 🏀 SportStore – Proyecto Final

Proyecto final de React desarrollado con Vite.  
Es una tienda deportiva que muestra productos, permite ver detalles y simular un pedido.

---

## 🚀 Tecnologías
- React 18
- Vite
- React Router DOM
- CSS / estilos propios
- Fetch API

---

## 📁 Estructura del proyecto


---

## 📱 Vistas principales
### ✔ Home
Pantalla principal con bienvenida.

### ✔ Products
Lista de productos obtenidos desde API pública.

### ✔ ProductDetail
Detalle del producto + formulario de pedido.

---

## 👥 Equipo y aportes

### Nyko
- Navbar
- Footer
- Estilos globales

### Leidy
- Vista Products
- ProductList
- ProductCard

### Emyl
- Vista ProductDetail
- Hook useFetch
- Servicio API

### Tatiana
- Componentes InputField
- Formulario del detalle
- Validaciones

---

## 🌐 API utilizada
`https://fakestoreapi.com/products`

---

## 🛠 Instalación

```bash
npm install
npm run dev
