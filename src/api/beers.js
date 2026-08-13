const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'content-type': 'application/json',
            ...options.headers,
        },
    }) 

    if(!response.ok) {
        const message = await response.text()
        throw new Error(message || `Request failed with status ${response.status}`)
    }

    if (response.status === 204) return null
    return response.json();
} 

export function getBeers() {
    return request('/beers')
}

export function getBeer(id) {
    return request(`/beers/${id}`)
}

export function createBeer(beer) {
    return request('/beers', {
        method: 'POST',
        body: JSON.stringify(beer),
    })
}

export function updateBeer(id, changes){
    return request(`/beers/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(changes),
    })
}

export function deleteBeer(id) {
    return request(`/beers/${id}`, {method: 'DELETE'})
}