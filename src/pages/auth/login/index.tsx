import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/assets/components/layout";
import style from "./../auth.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { loginUser } from "@/store/authSlice";
import type { RootState } from "@/store/store";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <Layout>
      <div className={style.pageCenter}>
        <div className={style.card}>
          <header className={style.header}>
            <h1 className={style.title}>LOGIN</h1>
            <p className={style.subtitle}>
              Welcome back! Please enter your details.
            </p>
          </header>

          <form className={style.form} onSubmit={handleSubmit}>
            {error && <p className={style.error}>{error}</p>}

            <div className={style.field}>
              <input
                className={style.input}
                type="email"
                placeholder="Email address *"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={style.field}>
              <input
                className={style.input}
                type="password"
                placeholder="Password *"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={style.row}>
              <label className={style.remember}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a className={style.link} href="/">
                Lost password?
              </a>
            </div>

            <button type="submit" className={style.submitBtn} disabled={loading}>
              {loading ? "LOGGING IN..." : "LOG IN"}
            </button>

            <p className={style.bottomText}>
              No account yet?
              <Link to="/auth/register">
                <button type="button" className={style.inlineBtn}>
                  Create Account
                </button>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}
