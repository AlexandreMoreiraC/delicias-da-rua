import React, { useEffect, useState } from 'react'
import { db } from '../firebaseConfig'
import '../admin.css'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'



export default function Admin() {
  const [sweets, setSweets] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    img: '',
    description: ''
  })
  const [editId, setEditId] = useState(null)

  async function fetchSweets() {
    setLoading(true)
    const querySnapshot = await getDocs(collection(db, 'sweets'))
    const sweetsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setSweets(sweetsArray)
    setLoading(false)
  }

  useEffect(() => {
    fetchSweets()
  }, [])

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if(editId) {
      const docRef = doc(db, 'sweets', editId)
      await updateDoc(docRef, {
        ...formData,
        price: parseFloat(formData.price)
      })
      setEditId(null)
    } else {
      await addDoc(collection(db, 'sweets'), {
        ...formData,
        price: parseFloat(formData.price)
      })
    }
    setFormData({ name: '', price: '', img: '', description: '' })
    fetchSweets()
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, 'sweets', id))
    fetchSweets()
  }

  function handleEdit(sweet) {
    setEditId(sweet.id)
    setFormData({
      name: sweet.name,
      price: sweet.price,
      img: sweet.img,
      description: sweet.description
    })
  }

  return (
    <div className="admin-container">
      <h2>Administração de Doces</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input 
          name="name"
          placeholder="Nome do doce"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input 
          name="price"
          type="number"
          step="0.01"
          placeholder="Preço"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input 
          name="img"
          placeholder="URL da imagem"
          value={formData.img}
          onChange={handleChange}
          required
        />
        <textarea 
          name="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId ? 'Atualizar' : 'Adicionar'}</button>
        {editId && <button type="button" onClick={() => {
          setEditId(null)
          setFormData({ name: '', price: '', img: '', description: '' })
        }}>Cancelar</button>}
      </form>

      <h3>Doces cadastrados</h3>
      {loading ? <p>Carregando...</p> : (
        <ul>
          {sweets.map(sweet => (
            <li key={sweet.id}>
              <img src={sweet.img} alt={sweet.name} width={50} height={50} />
              <strong>{sweet.name}</strong> - R$ {sweet.price.toFixed(2)}
              <button onClick={() => handleEdit(sweet)}>Editar</button>
              <button onClick={() => handleDelete(sweet.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
