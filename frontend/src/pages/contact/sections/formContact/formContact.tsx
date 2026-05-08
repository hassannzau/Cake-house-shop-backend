import { useState } from "react";
import { submitContact } from "@/api/contact";
import style from "./formContact.module.scss";

function FormContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await submitContact({ name, email, message });
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Failed to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={style.formSection}>
      <h2 className={style.formTitle}>Get In Touch</h2>

      {success ? (
        <div className={style.successMsg}>
          <p>Thank you! We'll get back to you shortly.</p>
          <button
            type="button"
            className={style.submitBtn}
            onClick={() => setSuccess(false)}
          >
            SEND ANOTHER MESSAGE
          </button>
        </div>
      ) : (
        <form className={style.form} onSubmit={handleSubmit}>
          {error && <p className={style.errorMsg}>{error}</p>}

          <div className={style.field}>
            <input
              className={style.input}
              type="text"
              placeholder="Name *"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <textarea
              className={style.textarea}
              placeholder="Your Message *"
              required
              rows={9}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button type="submit" className={style.submitBtn} disabled={loading}>
            {loading ? "SENDING..." : "SUBMIT"}
          </button>
        </form>
      )}
    </section>
  );
}

export default FormContact;
