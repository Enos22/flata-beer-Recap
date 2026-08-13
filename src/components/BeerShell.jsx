import { Outlet } from 'react-router-dom'
import BeerSidebar from './BeerSidebar.jsx'

export default function BeerShell( {beers, setBeers, loading, error, onReload}) {
    return (
        <div className="app-shell">
      <BeerSidebar beers={beers} loading={loading} />

      <main className="main-stage">
        {error ? (
          <section className="error-card" role="alert">
            <span className="error-emoji">🍺💥</span>
            <div>
              <h2>Tap problem</h2>
              <p>{error}</p>
              <button className="button button-primary" onClick={onReload}>
                Try again
              </button>
            </div>
          </section>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
    )
}