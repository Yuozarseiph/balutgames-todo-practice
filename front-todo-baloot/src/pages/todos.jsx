import { useEffect, useState } from "react";
import { todosApi } from "../api/todos";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";

export default function Todos() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  async function load(p = 1) {
    setLoading(true);
    setErr("");
    try {
      const res = await todosApi.list(p, 10);
      setItems(Array.isArray(res?.items) ? res.items : []);
      setPage(res?.page ?? p);
      setPages(res?.pages ?? 1);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
      setItems([]); // ensure items is an array to avoid crashes
      setPage(1);
      setPages(1);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(1);
  }, []);

  async function addTodo(e) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await todosApi.create({ title });
      setTitle("");
      load(1);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    }
  }

  async function toggleComplete(id, current) {
    try {
      await todosApi.update(id, { completed: !current });
      load(page);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    }
  }

  async function remove(id) {
    try {
      await todosApi.remove(id);
      load(page);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    }
  }

  return (
    <div className="card">
      <div className="header-row">
        <h2>My Todos</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div className="user-badge">
            <span className="email">{user?.email || "You"}</span>
          </div>
          <button
            className="btn ghost"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <form className="todo-form" onSubmit={addTodo}>
        <input
          className="input"
          placeholder="What to do?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn" type="submit">
          Add
        </button>
      </form>

      {err && <div className="error">{err}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="todo-list" aria-live="polite">
          {(items || []).map((t) => (
            <TodoItem
              key={t?._id}
              todo={t}
              onToggle={toggleComplete}
              onDelete={remove}
            />
          ))}
        </ul>
      )}

      <div className="pagination">
        <button
          className="btn ghost"
          disabled={page <= 1}
          onClick={() => load(page - 1)}
        >
          Prev
        </button>
        <div style={{ color: "var(--muted)" }}>
          {page} / {pages}
        </div>
        <button
          className="btn ghost"
          disabled={page >= pages}
          onClick={() => load(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
