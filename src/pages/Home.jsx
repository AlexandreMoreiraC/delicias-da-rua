import React from 'react'
import Gallery from '../components/Gallery'
import OrderButton from '../components/OrderButton'

export default function Home() {
  return (
    <div className="home-container">
      <h1>Delícias da Rua</h1>
      <p>Doces caseiros feitos com amor e ingredientes selecionados.</p>
      <Gallery />
      <OrderButton />
    </div>
  )
}
