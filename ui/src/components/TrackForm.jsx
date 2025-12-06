import { useState } from 'react';
import { createTrack } from '../api';
import React from 'react';

export default function TrackForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const newTrack = await createTrack({ title, artist, album, genre });
        onAdd(newTrack);

        setTitle('');
        setArtist('');
        setAlbum('');
        setGenre('');
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <input
                placeholder="Song title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                placeholder="Artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
            />
            <input
                placeholder="Album (optional)"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
            />
            <input
                placeholder="Genre (optional)"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
            />

            <button type="submit">Add Track</button>
        </form>
    );
}
