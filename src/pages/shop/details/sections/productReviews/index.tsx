import { useState } from "react";
import styles from "./reviews.module.scss";

function ProductReviews() {
  const [rating, setRating] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Janice Miller",
      date: "April 06, 2023",
      rating: 5,
      text: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est...",
    },
    {
      id: 2,
      name: "Benjam Porter",
      date: "April 06, 2023",
      rating: 5,
      text: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est...",
    },
  ];

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.tabs}>
        <button type="button" className={`${styles.tab} ${styles.activeTab}`}>
          REVIEWS (2)
        </button>
      </div>

      <div className={styles.reviewsBlock}>
        <h3 className={styles.heading}>Reviews</h3>

        <div className={styles.reviewList}>
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`${styles.reviewItem} ${
                index !== reviews.length - 1 ? styles.withBorder : ""
              }`}
            >
              <div className={styles.avatar} />

              <div className={styles.reviewContent}>
                <div className={styles.reviewTop}>
                  <div>
                    <h4 className={styles.reviewerName}>{review.name}</h4>
                    <p className={styles.reviewDate}>{review.date}</p>
                  </div>

                  <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={styles.starFilled}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <p className={styles.reviewText}>{review.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.formBlock}>
          <h3 className={styles.formTitle}>
            Be the first to review “Message Cotton T-Shirt”
          </h3>

          <p className={styles.formNote}>
            Your email address will not be published. Required fields are marked
            *
          </p>

          <div className={styles.ratingInputRow}>
            <span className={styles.ratingLabel}>Your rating *</span>

            <div className={styles.interactiveStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`${styles.ratingStar} ${
                    star <= rating ? styles.activeRatingStar : ""
                  }`}
                  onClick={() => setRating(star)}
                  aria-label={`Rate ${star} star`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <form className={styles.reviewForm}>
            <textarea
              className={styles.textarea}
              placeholder="Your Review"
              rows={8}
            />

            <input type="text" className={styles.input} placeholder="Name *" />

            <input
              type="email"
              className={styles.input}
              placeholder="Email address *"
            />

            <label className={styles.checkboxRow}>
              <input type="checkbox" />
              <span>
                Save my name, email, and website in this browser for the next
                time I comment.
              </span>
            </label>

            <button type="submit" className={styles.submitBtn}>
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ProductReviews;
