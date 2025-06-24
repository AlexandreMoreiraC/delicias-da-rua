import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Gallery() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchSweets() {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "sweets"));
    const sweetsArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setSweets(sweetsArray);
    setLoading(false);
  }

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <section className="gallery-container">
      <h2>Galeria de Doces</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="gallery-grid">
          {sweets.map((sweet) => (
            <div key={sweet.id} className="gallery-item">
              <img src={sweet.img} alt={sweet.name} />
              <h3>{sweet.name}</h3>
              <p>R$ {sweet.price.toFixed(2)}</p>
              <p>{sweet.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
