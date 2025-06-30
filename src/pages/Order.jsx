import Swal from "sweetalert2";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Order({ carrinho, setCarrinho }) {
  const navigate = useNavigate();

  function handleRemove(id) {
    const novoCarrinho = carrinho.filter((item) => item.id !== id);
    setCarrinho(novoCarrinho);
  }

  function handleQuantityChange(id, quantidade) {
    const newQuantity = Number(quantidade);
    if (newQuantity > 0) {
      const novoCarrinho = carrinho.map((item) =>
        item.id === id ? { ...item, quantidade: newQuantity } : item
      );
      setCarrinho(novoCarrinho);
    }
  }

  function handleCheckout() {
    Swal.fire({
      title: "Compra Finalizada!",
      text: "Obrigado pela preferência! Seus doces logo estarão a caminho 🍬",
      icon: "success",
      confirmButtonText: "Voltar para a galeria",
      confirmButtonColor: "#d76d77",
      background: "#fffafc",
    }).then(() => {
      setCarrinho([]);
      navigate("/galeria");
    });
  }

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <div className="order-container">
      {carrinho.length === 0 ? (
        <div className="carrinho-vazio-container">
          <img
            src="https://res.cloudinary.com/dliyfpqqu/image/upload/v1751222188/WhatsApp_Image_2025-06-29_at_19.27.58-Photoroom_ngkmmh.png"
            alt="Carrinho vazio"
            className="imagem-carrinho-vazio"
          />
          <div className="mensagem-carrinho-vazio">
            <h1>Seu carrinho está vazio.</h1>
            <Link to="/galeria" className="link-voltar-galeria">
              Ir às compras
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {carrinho.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imagemUrl} alt={item.nome} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.nome}</h3>
                  <p>Preço: €{item.preco.toFixed(2)}</p>
                  <p className="descricao">{item.descricao}</p>
                  <label>
                    Quantidade:{" "}
                    <input
                      type="number"
                      min="1"
                      value={item.quantidade}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="quantity-input"
                    />
                  </label>
                  <button onClick={() => handleRemove(item.id)} className="remove-button">
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            className="total-container"
          >
            Total: €{total.toFixed(2)}
          </div>

          <button onClick={handleCheckout} className="checkout-button" style={{ marginTop: "0.5rem" }}>
            Finalizar Compra
          </button>
        </>
      )}
    </div>
  );
}
