import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BeerForm from '../components/BeerForm.jsx'
import { getBeer, updateBeer } from '../api/beers.js'

// BeerEdit shows a pre-filled form to edit an existing beer.
// It receives setBeers so it can update the shared list after saving.
export default function BeerEdit({ beers, setBeers }) {
  // Read the :beerId from the URL e.g. /beers/3/edit → beerId = "3"
  const { beerId } = useParams()
  const navigate = useNavigate()

  // Local state for the beer being edited
  const [beer, setBeer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  // Fetch the beer to pre-fill the form when the page loads
  useEffect(() => {
    async function loadBeer() {
      try {
        setLoading(true)
        const data = await getBeer(beerId)
        setBeer(data)
      } catch {
        setError('Could not load this beer for editing.')
      } finally {
        setLoading(false)
      }
    }

    loadBeer()
  }, [beerId])

  // Called when the user submits the form with the new values
  async function handleSubmit(changes) {
    setBusy(true)
    setError('')
    try {
      const updated = await updateBeer(beer.id, changes)
      // Update the beer in the shared list so the sidebar reflects the new name
      setBeers(beers.map((item) => (String(item.id) === String(updated.id) ? updated : item)))
      // Go back to the detail page for this beer
      navigate(`/beers/${updated.id}`)
    } catch {
      setError('Could not update this beer. Check that the API is running.')
      setBusy(false)
    }
  }

  // --- Render different UI depending on load state ---

  if (loading) {
    return <div className="detail-card loading-card">Loading beer details… 🍺</div>
  }

  if (error && !beer) {
    return (
      <div className="detail-card empty-card">
        <span>🫗</span>
        <h2>Couldn't load beer</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <section className="form-page-card">
      <div className="form-page-copy">
        <span className="eyebrow">Tune the recipe</span>
        <h1>Edit {beer.name}</h1>
        <p>Change the label, image, or tasting story. Your reviews stay right where they are.</p>
        <Link to={`/beers/${beer.id}`} className="text-link">← Back to beer</Link>
      </div>
      <div className="form-card">
        {/* Pass the current beer data into BeerForm so the fields are pre-filled */}
        <BeerForm initialBeer={beer} onSubmit={handleSubmit} submitLabel="Save changes" busy={busy} />
        {error && <p className="form-error">{error}</p>}
      </div>
    </section>
  )
}
