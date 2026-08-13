import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BeerForm from '../components/BeerForm.jsx'
import { createBeer } from '../api/beers.js'

// NewBeer shows a blank form to create a brand new beer.
// It receives setBeers so it can add the new beer to the shared list.
export default function NewBeer({ beers, setBeers }) {
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  // Called when the user submits the form with the new beer's details
  async function handleSubmit(beer) {
    setBusy(true)
    setError('')
    try {
      // Send the new beer to the API — it returns the saved object with an id
      const created = await createBeer({ ...beer, reviews: [] })
      // Add the new beer to the shared list so the sidebar updates immediately
      setBeers([...beers, created])
      // Take the user straight to the new beer's detail page
      navigate(`/beers/${created.id}`)
    } catch {
      setError('Could not create the beer. Check that json-server is running.')
      setBusy(false)
    }
  }

  return (
    <section className="form-page-card">
      <div className="form-page-copy">
        <span className="eyebrow">Fresh keg incoming</span>
        <h1>Add a new beer</h1>
        <p>Create something legendary, questionable, or both. It will be saved to your local API immediately.</p>
        <Link to="/" className="text-link">← Back to the tap list</Link>
      </div>
      <div className="form-card">
        <BeerForm onSubmit={handleSubmit} submitLabel="Create beer" busy={busy} />
        {error && <p className="form-error">{error}</p>}
      </div>
    </section>
  )
}
