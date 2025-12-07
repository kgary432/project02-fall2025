// Use environment variable for API URL, default to localhost for development
// In production (Railway), this will be empty string since frontend and backend are same origin
// Check if VITE_API_URL is explicitly set (even if empty string), otherwise use localhost
const API_URL =
    import.meta.env.VITE_API_URL !== undefined
        ? import.meta.env.VITE_API_URL // address for production architecture
        : 'http://localhost:8000'; // address for local architecture

export async function getTracks() {
    const res = await fetch(`${API_URL}/tracks`);

    const data = await res.json();
    console.log(data);
    return data;
    //return res.j
    //return res.json();
}

export async function createTrack(track) {
    const res = await fetch(`${API_URL}/tracks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(track),
    });

    const data = await res.json();
    console.log(data);
    return data;
    //return res.json();
}

export async function deleteTrack(id) {
    await fetch(`${API_URL}/tracks/${id}`, { method: 'DELETE' });
}

export async function updateTrack(id, data) {
    const res = await fetch(`${API_URL}/tracks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}
