import React, { useEffect, useState } from "react"
import { collection, getDocs, getFirestore } from "firebase/firestore"
import Gallery from "../components/Gallery"

export default function Home() {
  const [doces, setDoces] = useState([])

  useEffect(() => {
    async function fetchDoces() {
      const db = getFirestore()
      const docesRef = collection(db, "doces")
      const snapshot = await getDocs(docesRef)
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setDoces(lista)
    }
    fetchDoces()
  }, [])

  return (
    <div className="home-container" style={{ padding: 20 }}>
      <Gallery doces={doces} />
    </div>
  )
}