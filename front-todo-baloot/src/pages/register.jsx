import { useState } from "react";
import { authApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!email.trim() || !password) {
      setErr("Email and password are required");
      return;
    }
    try {
      const res = await authApi.signup(email, password);
      if (res?.token && res?.user) {
        login({ token: res.token, user: res.user });
        navigate("/todos");
      } else {
        const loginRes = await authApi.login(email, password);
        login({ token: loginRes.token, user: loginRes.user });
        navigate("/todos");
      }
    } catch (e) {
      const status = e?.response?.status;
      if (status === 409) setErr("Account already exists. Please login.");
      else setErr(e?.response?.data?.message || e.message);
    }
  }

  return (
    <div className="card auth">
      <h2>Create account</h2>
      <form className="form" onSubmit={onSubmit}>
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <button className="btn" type="submit">
            Create
          </button>
          <Link className="link" to="/login">
            Already have an account?
          </Link>
        </div>
      </form>
      {err && <div className="error">{err}</div>}
    </div>
  );
}
