import React from 'react';
import { Card, Button } from 'antd';
import { deleteTrack, updateTrack } from '../api';

export default function TrackList({ tracks, refresh }) {
    async function toggleEdit(track) {
        const newTitle = prompt('New title:', track.title);
        if (!newTitle) return;

        await updateTrack(track.id, { title: newTitle });
        refresh();
    }

    return (
        <div style={{ display: 'grid', alignItems: 'center', gap: 8 }}>
            {tracks.map((track) => (
                <Card
                    key={track.id}
                    title={track.title}
                    extra={track.artist}
                    style={{ maxWidth: 400 }}
                >
                    {track.album && (
                        <p>
                            <em>{track.album}</em>
                        </p>
                    )}

                    <div style={{ display: 'flex', gap: 8 }}>
                        <Button onClick={() => toggleEdit(track)}>Edit</Button>

                        <Button
                            danger
                            onClick={async () => {
                                await deleteTrack(track.id);
                                refresh();
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
}
