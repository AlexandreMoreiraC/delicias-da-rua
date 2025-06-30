import React, { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../firebaseConfig.js"
import { doc, getDocs, query, where, collection } from "firebase/firestore"
import { Navigate } from "react-router-dom"

export default function AdminRoute({ children }) {
  const [carregando, setCarregando] = useState(true)
  const [autorizado, setAutorizado] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const q = query(
          collection(db, "usuarios"),
          where("uid", "==", user.uid)
        )
        const snapshot = await getDocs(q)
        const usuario = snapshot.docs[0]?.data()
        if (usuario?.role === "admin") {
          setAutorizado(true)
        }
      }
      setCarregando(false)
    })

    return () => unsubscribe()
  }, [])

  if (carregando) return <p>Carregando...</p>
  return autorizado ? children : <Navigate to="/" />
}
