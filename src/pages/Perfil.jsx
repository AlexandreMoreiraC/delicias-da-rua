import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig.js";
import {
  updatePassword,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [email, setEmail] = useState("");
  const [genero, setGenero] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setEmail(currentUser.email || "");
        const docRef = doc(db, "usuarios", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNome(data["nome"] || data["Nome completo"] || "");
          setApelido(data["apelido"] || "");
          setGenero(data["Genero"] || data["genero"] || "");
          setNascimento(data["Data de nascimento"] || data["data de nascimento"] || "");
        } else {
          setNome(currentUser.displayName || "");
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const reauthenticateUser = async () => {
    if (!senhaAtual) throw new Error("Informe sua senha atual para confirmar as alterações.");
    const credential = EmailAuthProvider.credential(user.email, senhaAtual);
    await reauthenticateWithCredential(user, credential);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMensagem("");
    try {
      await reauthenticateUser();
      if (nome !== user.displayName) {
        await updateProfile(user, { displayName: nome });
      }
      const docRef = doc(db, "usuarios", user.uid);
      await updateDoc(docRef, {
        nome,
        apelido,
        Genero: genero,
        "Data de nascimento": nascimento,
      });
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Dados atualizados com sucesso!",
        timer: 2000,
        showConfirmButton: false,
      });
      setSenhaAtual("");
    } catch (error) {
      let msg = "Erro ao atualizar dados: " + error.message;
      if (error.code === "auth/invalid-login-credentials" || error.code === "auth/wrong-password") {
        msg = "Senha atual incorreta. Por favor, verifique e tente novamente.";
      }
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: msg,
      });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMensagem("");
    if (novaSenha !== confirmacaoSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }
    try {
      await reauthenticateUser();
      await updatePassword(user, novaSenha);
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Senha atualizada com sucesso!",
        timer: 2000,
        showConfirmButton: false,
      });
      setNovaSenha("");
      setConfirmacaoSenha("");
      setSenhaAtual("");
    } catch (error) {
      let msg = "Erro ao atualizar senha: " + error.message;
      if (error.code === "auth/invalid-login-credentials" || error.code === "auth/wrong-password") {
        msg = "Senha atual incorreta. Por favor, verifique e tente novamente.";
      }
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: msg,
      });
    }
  };

  if (!user) return <p>Carregando usuário...</p>;

  return (
    <div className="perfil-container">
      <div className="perfil-conteudo">
        <div className="perfil-imagem-grande">
          <img
            src="https://res.cloudinary.com/dliyfpqqu/image/upload/v1751210416/ChatGPT_Image_Jun_29_2025_04_01_57_PM-Photoroom_ef6b6n.png"
            alt="Perfil visual"
          />
        </div>
        <div className="perfil-formularios">
          <h2>Perfil do Usuário</h2>
          <form onSubmit={handleUpdateProfile} className="perfil-formulario">
            <label className="perfil-label">Nome completo:</label>
            <input
              className="perfil-input"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <label className="perfil-label">Apelido:</label>
            <input
              className="perfil-input"
              type="text"
              value={apelido}
              onChange={(e) => setApelido(e.target.value)}
              required
            />
            <label className="perfil-label">Gênero:</label>
            <select
              className="perfil-input"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
            <label className="perfil-label">Data de nascimento:</label>
            <input
              className="perfil-input"
              type="date"
              value={nascimento}
              onChange={(e) => setNascimento(e.target.value)}
              required
            />
            <label className="perfil-label">Email:</label>
            <input className="perfil-input" type="email" value={email} disabled />
            <label className="perfil-label">Senha Atual (para confirmar alteração):</label>
            <input
              className="perfil-input"
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              required
            />
            <button className="perfil-botao" type="submit">
              Atualizar Dados
            </button>
          </form>
          <form
            onSubmit={handleChangePassword}
            className="perfil-formulario"
            style={{ marginTop: 30 }}
          >
            <h3>Deseja alterar sua senha?</h3>
            <label className="perfil-label">Senha Atual (para confirmar alteração):</label>
            <input
              className="perfil-input"
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              required
            />
            <label className="perfil-label">Nova Senha:</label>
            <input
              className="perfil-input"
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
            />
            <label className="perfil-label">Confirmar Nova Senha:</label>
            <input
              className="perfil-input"
              type="password"
              value={confirmacaoSenha}
              onChange={(e) => setConfirmacaoSenha(e.target.value)}
              required
            />
            <button className="perfil-botao" type="submit">
              Alterar Senha
            </button>
          </form>
          {mensagem && <p className="mensagem">{mensagem}</p>}
        </div>
      </div>
    </div>
  );
}
