import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function fazerLogin() {

    if (email === "" || senha === "") {

      alert("Preencha todos os campos!");

      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="login-container">

      <div className="login-box">

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button onClick={fazerLogin}>
          Entrar
        </button>

      </div>

    </div>
  );
}

export default Login;