import { useEffect, useState } from 'react';
import { getTracks } from './api';
import TrackList from './components/TrackList';
import TrackForm from './components/TrackForm';
import React from 'react';

export default function App() {
    const [tracks, setTracks] = useState([]);

    async function loadTracks() {
        const data = await getTracks();
        setTracks(data);
    }

    useEffect(() => {
        loadTracks();
    }, []);

    return (
        <div className="container">
            <h1>Favorite Music</h1>
            <TrackForm onAdd={(t) => setTracks([...tracks, t])} />
            <TrackList tracks={tracks} refresh={loadTracks} />
        </div>
    );
}
