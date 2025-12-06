import React, { useState } from 'react';
import { Card, Input, Button } from 'antd';
import { createTrack } from '../api';

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
        <Card title="Add New Track" style={{ maxWidth: 400 }}>
            <form onSubmit={handleSubmit}>
                <Input
                    placeholder="Song title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ marginBottom: 12 }}
                />

                <Input
                    placeholder="Artist"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    required
                    style={{ marginBottom: 12 }}
                />

                <Input
                    placeholder="Album (optional)"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                    style={{ marginBottom: 12 }}
                />

                <Input
                    placeholder="Genre (optional)"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    style={{ marginBottom: 12 }}
                />

                <Button type="primary" htmlType="submit" block>
                    Add Track
                </Button>
            </form>
        </Card>
    );
}
