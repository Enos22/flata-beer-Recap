import { useState } from 'react'

// A fallback image shown when the user doesn't provide an image URL
const fallbackImage =
  'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80'

// BeerForm is a reusable form used by both NewBeer and BeerEdit.
// - initialBeer: the existing beer data to pre-fill the fields (optional)
// - onSubmit: a function to call with the filled-in data when the form is submitted
// - submitLabel: the text shown on the submit button e.g. "Create beer" or "Save changes"
// - busy: when true, the button is disabled to prevent double-clicks
export default function BeerForm({ initialBeer, onSubmit, submitLabel, busy = false }) {
  // Controlled form state — one object holds all three field values
  const [form, setForm] = useState({
    name: initialBeer?.name || '',
    image_url: initialBeer?.image_url || '',
    description: initialBeer?.description || '',
  })

  // Stores a validation error message if the user submits incomplete data
  const [formError, setFormError] = useState('')

  // Updates a single field in the form state without touching the others.
  // event.target.name matches the field's name attribute (e.g. "name", "image_url")
  function handleChange(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  // Validates and submits the form
  async function handleSubmit(event) {
    event.preventDefault() // Stops the browser from refreshing the page

    if (!form.name.trim() || !form.description.trim()) {
      setFormError('Give your beer a name and a description first.')
      return
    }

    setFormError('')

    // Pass the cleaned data up to the parent page's handler
    await onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      image_url: form.image_url.trim() || fallbackImage,
    })
  }

  return (
    <form className="beer-form" onSubmit={handleSubmit}>
      <label>
        <span>Beer name</span>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Midnight Foam"
        />
      </label>
      <label>
        <span>Image URL</span>
        <input
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          placeholder="https://..."
        />
      </label>
      <label>
        <span>Description</span>
        <textarea
          name="description"
          rows="7"
          value={form.description}
          onChange={handleChange}
          placeholder="What makes this beer memorable?"
        />
      </label>
      {formError && <p className="form-error">{formError}</p>}
      <button className="button button-primary" disabled={busy}>
        {busy ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}
