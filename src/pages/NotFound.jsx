import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="detail-card empty-card">
      <span>🍻</span>
      <h1>Wrong tap!</h1>
      <p>That route poured absolutely nothing.</p>
      <Link className="button button-primary" to="/">Back to the beer board</Link>
    </section>
  )
}
