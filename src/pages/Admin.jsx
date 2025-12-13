// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../services/api";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({name:"", price:0, description:"", image:""});

  const load = async () => {
    const p = await fetchProducts();
    setProducts(p);
  };

  useEffect(()=>{ load(); }, []);

  const handleCreate = async () => {
    const created = await createProduct({ ...form, price: Number(form.price) });
    setProducts(prev => [...prev, created]);
    setForm({name:"", price:0, description:"", image:""});
  };

  const handleUpdate = async () => {
    const updated = await updateProduct(editing.id, {...form, price: Number(form.price)});
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    setEditing(null);
    setForm({name:"", price:0, description:"", image:""});
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const startEdit = (p) => {
    setEditing(p);
    setForm({name:p.name, price:p.price, description:p.description, image:p.image});
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin - Productos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input placeholder="Nombre" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border p-2 rounded"/>
        <input placeholder="Precio" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="border p-2 rounded"/>
        <input placeholder="Imagen URL" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} className="border p-2 rounded"/>
        <input placeholder="Descripción" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="border p-2 rounded"/>
      </div>

      <div className="flex gap-3 mb-6">
        {!editing && <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">Crear</button>}
        {editing && <button onClick={handleUpdate} className="bg-yellow-600 text-white px-4 py-2 rounded">Guardar</button>}
        {editing && <button onClick={()=>{setEditing(null); setForm({name:"", price:0, description:"", image:""})}} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(p => (
          <div key={p.id} className="p-4 border rounded">
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-sm">{p.description}</p>
            <p className="font-bold">${p.price}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={()=>startEdit(p)} className="bg-yellow-500 px-3 py-1 rounded">Editar</button>
              <button onClick={()=>handleDelete(p.id)} className="bg-red-500 px-3 py-1 rounded text-white">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
