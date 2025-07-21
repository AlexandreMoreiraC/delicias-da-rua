import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [erro, setErro] = useState(null);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  function calcularIdade(data) {
    const hoje = new Date();
    const nasc = new Date(data);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
      idade--;
    }
    return idade;
  }

  async function handleCadastro(e) {
    e.preventDefault();
    setErro(null);

    const idade = calcularIdade(nascimento);

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      setErro("Por favor, insira um email válido.");
      return;
    }

    const senhaRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[.!?=)\/&%$#]).{6,}$/;
    if (!senhaRegex.test(senha)) {
      setErro("A senha deve conter letras, números e um símbolo (.!?=)/&%$#).");
      return;
    }

    if (idade < 18 || idade > 120) {
      setErro("Idade precisa estar entre 18 e 120 anos.");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, senha);

      await updateProfile(cred.user, {
        displayName: nome,
      });

      await setDoc(doc(db, "usuarios", cred.user.uid), {
        uid: cred.user.uid,
        nome,
        apelido,
        email,
        genero,
        "Data de nascimento": nascimento,
        papel: "cliente",
      });

      await Swal.fire({
        icon: "success",
        title: "Cadastro realizado!",
        text: "Sua conta foi criada com sucesso.",
        confirmButtonText: "Ok",
      });

      navigate("/admin");
    } catch (error) {
      setErro("Erro ao criar conta: " + error.message);
    }
  }

  const idadeInvalida = nascimento && (calcularIdade(nascimento) < 18 || calcularIdade(nascimento) > 120);

  return (
    <main className="fundo-cadastro">
      <div className="cadastro-wrapper">
        <div className={`cadastro-container ${animate ? "animated-slide-in" : ""}`}>
          <h2>Registe-se aqui</h2>
          <form onSubmit={handleCadastro}>
            <label>
              Nome
              <input
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                onInvalid={e => e.target.setCustomValidity("Por favor, insira seu nome.")}
                onInput={e => e.target.setCustomValidity("")}
              />
            </label>
            <label>
              Apelido
              <input
                value={apelido}
                onChange={e => setApelido(e.target.value)}
                required
                onInvalid={e => e.target.setCustomValidity("Por favor, insira seu apelido.")}
                onInput={e => e.target.setCustomValidity("")}
              />
            </label>
            <label>
              Gênero
              <select
                value={genero}
                onChange={e => setGenero(e.target.value)}
                required
                onInvalid={e => e.target.setCustomValidity("Por favor, selecione seu gênero.")}
                onInput={e => e.target.setCustomValidity("")}
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </label>
            <label>
              Data de Nascimento
              <input
                type="date"
                value={nascimento}
                onChange={e => setNascimento(e.target.value)}
                required
                onInvalid={e => e.target.setCustomValidity("Por favor, insira sua data de nascimento.")}
                onInput={e => e.target.setCustomValidity("")}
              />
            </label>
            {idadeInvalida && (
              <p style={{ color: "red" }}>Você precisa ter entre 18 e 120 anos para se cadastrar.</p>
            )}
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                onInvalid={e => e.target.setCustomValidity("Por favor, insira um email válido.")}
                onInput={e => e.target.setCustomValidity("")}
              />
            </label>
            <label>
              Senha
              <input
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
                onInvalid={e => e.target.setCustomValidity("Insira uma senha com letras, números e símbolos.")}
                onInput={e => e.target.setCustomValidity("")}
              />
            </label>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            <button type="submit" disabled={idadeInvalida}>Registar-se</button>
          </form>
        </div>
        <div
          className="cadastro-image"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/dliyfpqqu/image/upload/v1751213245/WhatsApp_Image_2025-06-29_at_17.01.34-Photoroom_kz7fjg.png")',
          }}
        ></div>
      </div>
    </main>
  );
}
