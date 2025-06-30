import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../firebaseConfig.js";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

export default function Admin() {
  const [doces, setDoces] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagemFile, setImagemFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [destaque, setDestaque] = useState(false);
  const [filtroBusca, setFiltroBusca] = useState("");
  const [role, setRole] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);
  const formRef = useRef(null);

  const docesCollection = collection(db, "doces");

  useEffect(() => {
    async function fetchUserRole() {
      if (auth.currentUser) {
        const docRef = doc(db, "usuarios", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        }
      }
      setLoadingRole(false);
    }
    fetchUserRole();
  }, []);

  useEffect(() => {
    if (role === "admin") {
      const unsubscribe = onSnapshot(docesCollection, (snapshot) => {
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const listaOrdenada = lista.sort((a, b) => a.nome.localeCompare(b.nome));
        setDoces(listaOrdenada);
      });
      return () => unsubscribe();
    }
  }, [role]);

  async function uploadImagem(file) {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dliyfpqqu/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nome || !preco) return;
    let imagemUrl = null;
    if (imagemFile) {
      imagemUrl = await uploadImagem(imagemFile);
    }
    if (editId) {
      const docRef = doc(db, "doces", editId);
      await updateDoc(docRef, {
        nome,
        descricao,
        preco: parseFloat(preco),
        destaque,
        ...(imagemUrl && { imagemUrl }),
      });
      setEditId(null);
    } else {
      await addDoc(docesCollection, {
        nome,
        descricao,
        preco: parseFloat(preco),
        destaque,
        imagemUrl: imagemUrl || "",
      });
    }
    Swal.fire({
      icon: "success",
      title: editId ? "Produto atualizado!" : "Produto adicionado!",
      showConfirmButton: false,
      timer: 1000,
    });
    setNome("");
    setDescricao("");
    setPreco("");
    setImagemFile(null);
    setDestaque(false);
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, "doces", id));
  }

  function handleEdit(doce) {
    setNome(doce.nome);
    setDescricao(doce.descricao || "");
    setPreco(doce.preco);
    setEditId(doce.id);
    setImagemFile(null);
    setDestaque(doce.destaque || false);
    formRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function cancelarEdicao() {
    setNome("");
    setDescricao("");
    setPreco("");
    setEditId(null);
    setImagemFile(null);
    setDestaque(false);
  }

  const docesFiltrados = doces.filter((doce) =>
    doce.nome.toLowerCase().includes(filtroBusca.toLowerCase())
  );

  if (loadingRole) {
    return <p>Carregando...</p>;
  }

  if (role !== "admin") {
    return <p>Acesso negado. Você não é administrador.</p>;
  }

  return (
    <div className="admin-container">
      <h2>Administração de Doces</h2>
      <form className="admin-form-container" onSubmit={handleSubmit} ref={formRef}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          step="0.01"
          min="0"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagemFile(e.target.files[0])}
        />
        <label>
          <input
            type="checkbox"
            checked={destaque}
            onChange={(e) => setDestaque(e.target.checked)}
          />{" "}
          Destacar este doce
        </label>
        <button type="submit">{editId ? "Atualizar" : "Adicionar"}</button>
        {editId && (
          <button type="button" onClick={cancelarEdicao}>
            Cancelar
          </button>
        )}
      </form>

      <h3>Buscar Doces</h3>
      <input
        type="text"
        placeholder="Buscar por nome"
        value={filtroBusca}
        onChange={(e) => setFiltroBusca(e.target.value)}
      />

      <h3>Doces Cadastrados</h3>
      <div className="doces-grid">
        {docesFiltrados.map(({ id, nome, descricao, preco, imagemUrl, destaque }) => (
          <div key={id} className="doce-card">
            {imagemUrl && <img src={imagemUrl} alt={nome} className="doce-img" />}
            <div className="doce-info">
              <strong>{nome}</strong>
              <p>{descricao}</p>
              <span>€ {preco.toFixed(2)}</span>
              <span className={destaque ? "destaque" : "nao-destaque"}>
                {destaque ? "Destaque" : "Não destacado"}
              </span>
            </div>
            <div className="doce-actions">
              <button
                onClick={() =>
                  handleEdit({ id, nome, descricao, preco, imagemUrl, destaque })
                }
              >
                Editar
              </button>
              <button onClick={() => handleDelete(id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
