import { Route, Routes } from 'react-router-dom'
import BeerShell from './components/BeerShell.jsx'
import BeerDetails from './pages/BeerDetails.jsx'
import BeerEdit from './pages/BeerEdit.jsx'
import NewBeer from './pages/NewBeer.jsx'
import NotFound from './pages/NotFound.jsx'
import { getBeers } from './api/beers.js'
import { useEffect, useState } from 'react'

export default function App() {
    const [beers, setBeers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    useEffect(() => {
        async function loadBeers() {
            try {
                setLoading(true)
                setError('')
                const data = await getBeers()
                setBeers(data)
            } catch {
                setError('Could not reach the beer API')
            } finally {
                setLoading(false)
            }
        }

        loadBeers()
    }, [])

    return (
        <Routes>
            <Route
            path="/"
            element= {
                <BeerShell
                beers={beers}
                setBeers={setBeers}
                loading={loading}
                error={error}
                onReload = {() => {
                    setError('')
                    setLoading(true)
                    getBeers()
                        .then(setBeers)
                        .catch( () => setError('Still could not reach the beer api'))
                        .finally(() => setLoading(false))
                }}
                />
            }
            >
                <Route path="beers/new" element = {<NewBeer beers={beers} setBeers={setBeers} />} />
                <Route path="beers/:beerId" element={<BeerDetails beers={beers} setBeers={setBeers} />} />
                <Route path="beers/:beerId/edit" element={<BeerEdit beers={beers} setBeers={setBeers} />} />
                <Route path="*" element={<NotFound />} />
                </Route>
            
        </Routes>
    )

}
