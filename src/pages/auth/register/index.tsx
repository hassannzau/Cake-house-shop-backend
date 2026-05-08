import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/assets/components/layout";
import style from "./../auth.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { registerUser } from "@/store/authSlice";
import type { RootState } from "@/store/store";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      registerUser({ fullName, email, password, confirmPassword }),
    );
    if (registerUser.fulfilled.match(result)) {
      navigate("/auth/login");
    }
  };

  return (
    <Layout>
      <div className={style.pageCenter}>
        <div className={style.card}>
          <header className={style.header}>
            <h1 className={style.title}>REGISTER</h1>
            <p className={style.subtitle}>
              Create your account to enjoy our sweets 🍰
            </p>
          </header>

          <form className={style.form} onSubmit={handleSubmit}>
            {error && <p className={style.error}>{error}</p>}

            <div className={style.field}>
              <input
                className={style.input}
                type="text"
                placeholder="Full name *"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

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

            <div className={style.field}>
              <input
                className={style.input}
                type="password"
                placeholder="Confirm password *"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className={style.row}>
              <label className={style.remember}>
                <input type="checkbox" required />
                <span>I agree to the Terms & Privacy Policy</span>
              </label>
            </div>

            <button type="submit" className={style.submitBtn} disabled={loading}>
              {loading ? "CREATING..." : "CREATE ACCOUNT"}
            </button>

            <p className={style.bottomText}>
              Already have an account?
              <Link to="/auth/login">
                <button type="button" className={style.inlineBtn}>
                  Log in
                </button>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}
