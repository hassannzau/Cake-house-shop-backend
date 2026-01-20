import { Link } from "react-router-dom";
import Layout from "@/assets/components/layout";
import style from "./../auth.module.scss";

export default function Login() {
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

          <form className={style.form}>
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

            <div className={style.row}>
              <label className={style.remember}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a className={style.link} href="/">
                Lost password?
              </a>
            </div>

            <button type="submit" className={style.submitBtn}>
              LOG IN
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
