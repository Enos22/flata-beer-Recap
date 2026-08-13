import { use, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function BeerSidebar({ beers, loading}) {

    const [search, setSearch] = useState('')

    const filtered = beers.filter((beer) =>
    beer.name.toLowerCase().includes(search.trim().toLowerCase()),
    )

    return (
        <aside className='sidebar'>
        <NavLink className="brand" to="/">
            <span className="brand-mark">🍺</span>
            <span>
            <strong>FlataBeer</strong>
            <small>No bubbles. Big opinions.</small>
            </span>
      </NavLink>

      <label className="search-box">
        <span aria-hidden="true">⌕</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Find a beer..."
          aria-label="Search beers"
        />
      </label>


    <NavLink to="/beers/new" className="button button-primary button-wide">
        <span>＋</span> Add a beer
      </NavLink>

      <div className="menu-heading">
        <span>Beer board</span>
        <span className="count-pill">{beers.length}</span>
      </div>

      <nav className="beer-nav" aria-label="Beer menu">
        {loading && <div className="nav-skeleton">Loading the tap list…</div>}
        {!loading && filtered.length === 0 && (
          <div className="nav-empty">No matching brews.</div>
        )}
        {filtered.map((beer, index) => (
          <NavLink
            key={beer.id}
            to={`/beers/${beer.id}`}
            className={({ isActive }) => `beer-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="beer-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="beer-nav-copy">
              <strong>{beer.name}</strong>
              <small>{beer.reviews?.length || 0} review{beer.reviews?.length === 1 ? '' : 's'}</small>
            </span>
            <span aria-hidden="true">→</span>
          </NavLink>
        ))}
      </nav>
     </aside>
    )
}