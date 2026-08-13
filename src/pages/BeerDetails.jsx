import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ReviewList from '../components/ReviewList.jsx'
import { getBeer, deleteBeer, updateBeer } from '../api/beers.js'

const fallbackImage =
  'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80'

export default function BeerDetails ({ beers, setBeers}) {
    const { beerId } = useParams()
    const navigate = useNavigate()

    const [beer, setBeer] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
    async function loadBeer() {
      try {
        setLoading(true)
        setError('')
        const data = await getBeer(beerId)
        setBeer(data)
      } catch {
        setError('That beer could not be found.')
      } finally {
        setLoading(false)
      }
    }

    loadBeer()
  }, [beerId])

    function getVibe(reviews) {
    const score = Math.min(5, Math.max(1, (reviews?.length || 0) + 1))
    return '●'.repeat(score) + '○'.repeat(5 - score)
  }

    async function persistReviews(nextReviews) {
    setBusy(true)
    setMessage('')
    try {
      const updated = await updateBeer(beer.id, { reviews: nextReviews })
      // Update the local beer shown on screen
      setBeer(updated)
      // Also update the beer in the shared list so the sidebar count refreshes
      setBeers(beers.map((item) => (String(item.id) === String(updated.id) ? updated : item)))
    } catch {
      setMessage('Could not save that review change.')
    } finally {
      setBusy(false)
    }
  }

    // Add one new review text to the existing list
    async function addReview(reviewText) {
    await persistReviews([...(beer.reviews || []), reviewText])
  }

    // Remove a review by its position in the array
    async function removeReview(index) {
    const newReviews = (beer.reviews || []).filter((_, i) => i !== index)
    await persistReviews(newReviews)
  }

    // Delete the entire beer, then redirect to the next available beer
    async function handleDelete() {
    if (!window.confirm(`Delete "${beer.name}"? This cannot be undone.`)) return
    setBusy(true)
    try {
      await deleteBeer(beer.id)
      const remaining = beers.filter((item) => String(item.id) !== String(beer.id))
      setBeers(remaining)
      navigate(remaining[0] ? `/beers/${remaining[0].id}` : '/beers/new', { replace: true })
    } catch {
      setMessage('Could not delete this beer.')
      setBusy(false)
    }
  }

    // --- Render different UI depending on load state ---

  if (loading) {
    return <div className="detail-card loading-card">Pouring your beer… 🍺</div>
  }

  if (error || !beer) {
    return (
      <div className="detail-card empty-card">
        <span>🫗</span>
        <h2>Empty glass</h2>
        <p>{error || 'This beer does not exist.'}</p>
      </div>
    )
  }
return (
    <div className="page-stack">
      <section className="hero-card">
        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src={beer.image_url || fallbackImage}
            alt={beer.name}
            onError={(event) => {
              event.currentTarget.src = fallbackImage
            }}
          />
          <div className="foam-badge">FLAT<br />100%</div>
        </div>

        <div className="hero-copy">
          <div className="hero-topline">
            <span className="eyebrow">On tap now</span>
            <span className="vibe-meter" title="Review activity">{getVibe(beer.reviews)}</span>
          </div>
          <h1>{beer.name}</h1>
          <p className="hero-description">{beer.description}</p>

          <div className="meta-row">
            <div><strong>{beer.reviews?.length || 0}</strong><span>reviews</span></div>
            <div><strong>0%</strong><span>fizz</span></div>
            <div><strong>∞</strong><span>personality</span></div>
          </div>

          {message && <p className="form-error">{message}</p>}
          <div className="action-row">
            <Link className="button button-primary" to="edit">Edit beer</Link>
            <button className="button button-ghost danger-text" onClick={handleDelete} disabled={busy}>
              Delete beer
            </button>
          </div>
        </div>
      </section>

      <ReviewList
        reviews={beer.reviews || []}
        onAdd={addReview}
        onRemove={removeReview}
        busy={busy}
      />
    </div>
  )
}



