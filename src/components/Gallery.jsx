import React, { useContext } from 'react'
import { OrdersContext } from '../context/OrdersContext'
import OrderButton from './OrderButton'

const sweets = [
  {
    id: 1,
    name: 'Brigadeiro',
    price: 3.5,
    img: '/brigadeiro.jpg',
    description: 'Docinho clássico, feito com muito chocolate e amor.'
  },
  {
    id: 2,
    name: 'Bolo de Cenoura',
    price: 25,
    img: '/bolo-cenoura.jpg',
    description: 'Fofinho e delicioso, com cobertura de chocolate.'
  },
  {
    id: 3,
    name: 'Brownie',
    price: 15,
    img: '/brownie.jpg',
    description: 'Brownie macio e cheio de sabor.'
  }
]

export default function Gallery() {
  const { addToOrder } = useContext(OrdersContext)

  return (
    <div className="gallery">
      {sweets.map(sweet => (
        <div key={sweet.id} className="sweet-card">
          <img src={sweet.img} alt={sweet.name} className="sweet-img" />
          <h3>{sweet.name}</h3>
          <p>{sweet.description}</p>
          <p className="price">R$ {sweet.price.toFixed(2)}</p>
          <OrderButton sweet={sweet} addToOrder={addToOrder} />
        </div>
      ))}
    </div>
  )
}
