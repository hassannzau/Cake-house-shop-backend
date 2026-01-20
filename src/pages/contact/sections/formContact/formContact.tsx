import React from "react";
import style from "./formContact.module.scss";
function FormContact() {
  return (
    <section className={style.formSection}>
      <h2 className={style.formTitle}>Get In Touch</h2>

      <form className={style.form}>
        <div className={style.field}>
          <input
            className={style.input}
            type="text"
            placeholder="Name *"
            required
            name="name"
          />
        </div>

        <div className={style.field}>
          <input
            className={style.input}
            type="email"
            placeholder="Email address *"
            required
            name="email"
          />
        </div>

        <div className={style.field}>
          <textarea
            className={style.textarea}
            placeholder="Your Message"
            name="message"
            rows={9}
          />
        </div>

        <button type="submit" className={style.submitBtn}>
          SUBMIT
        </button>
      </form>
    </section>
  );
}

export default FormContact;
