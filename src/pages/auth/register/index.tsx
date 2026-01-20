import { Link } from "react-router-dom";
import Layout from "@/assets/components/layout";
import style from "./../auth.module.scss";

export default function Register() {
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

          <form className={style.form}>
            <div className={style.field}>
              <input
                className={style.input}
                type="text"
                placeholder="Full name *"
                required
              />
            </div>

            <div className={style.field}>
              <input
                className={style.input}
                type="email"
                placeholder="Email address *"
                required
              />
            </div>

            <div className={style.field}>
              <input
                className={style.input}
                type="password"
                placeholder="Password *"
                required
              />
            </div>

            <div className={style.field}>
              <input
                className={style.input}
                type="password"
                placeholder="Confirm password *"
                required
              />
            </div>

            <div className={style.row}>
              <label className={style.remember}>
                <input type="checkbox" required />
                <span>I agree to the Terms & Privacy Policy</span>
              </label>
            </div>

            <button type="submit" className={style.submitBtn}>
              CREATE ACCOUNT
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
