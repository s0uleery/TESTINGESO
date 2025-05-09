import { useState } from "react";
import { loginRequest } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await loginRequest({ email, password });

      if (result.message === "Login Exitoso") {
        // Redirigir según rol
        if (result.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        setError(result.message); // "Credenciales Inválidas", "Usuario no existente", etc.
      }
    } catch (err) {
      console.error("❌ Error al conectar con el servidor:", err);
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Acceso UCENIN</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>

        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
};
