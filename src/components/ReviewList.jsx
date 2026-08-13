import { useState } from 'react'

export default function ReviewList({ reviews = [], onAdd, onRemove, busy }) {
  const [review, setReview] = useState('')

  async function submitReview(event) {
    event.preventDefault()
    const next = review.trim()
    if (!next) return
    await onAdd(next)
    setReview('')
  }

  return (
    <section className="reviews-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Tasting notes</span>
          <h2>People said what?</h2>
        </div>
        <span className="review-count">{reviews.length}</span>
      </div>

      <form className="review-form" onSubmit={submitReview}>
        <input
          value={review}
          onChange={(event) => setReview(event.target.value)}
          placeholder="Drop a delightfully dramatic review…"
          aria-label="New review"
        />
        <button className="button button-dark" disabled={busy || !review.trim()}>Post review</button>
      </form>

      <div className="review-list">
        {reviews.length === 0 && (
          <div className="review-empty">No reviews yet. Be the first brave taster.</div>
        )}
        {reviews.map((item, index) => (
          <article className="review-card" key={`${item}-${index}`}>
            <span className="quote-mark">“</span>
            <p>{item}</p>
            <button
              className="icon-button danger"
              type="button"
              onClick={() => onRemove(index)}
              disabled={busy}
              title="Delete review"
              aria-label={`Delete review ${index + 1}`}
            >
              ×
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
