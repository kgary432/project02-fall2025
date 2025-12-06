const API_URL = 'http://localhost:8000';

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
