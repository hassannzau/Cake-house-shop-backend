import AccountLayout from "@/assets/components/accountLayout";
import styles from "./accountDetail.module.scss";

const AccountDetailsContent = () => {
  return (
    <AccountLayout title="Account Details">
    <div className={styles.formSection}>
      <form className={styles.form}>
        <div className={styles.rowTwo}>
          <div className={styles.field}>
            <input
              type="text"
              placeholder="First Name"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <input
              type="text"
              placeholder="Last Name"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.field}>
          <input
            type="text"
            placeholder="Display Name"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <input
            type="email"
            placeholder="Email Address"
            className={styles.input}
          />
        </div>

        <h3 className={styles.formTitle}>PASSWORD CHANGE</h3>

        <div className={styles.field}>
          <input
            type="password"
            placeholder="Current password"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <input
            type="password"
            placeholder="New password"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <input
            type="password"
            placeholder="Confirm new password"
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          SAVE CHANGES
        </button>
      </form>
    </div>
    </AccountLayout>
  );
};

export default AccountDetailsContent;