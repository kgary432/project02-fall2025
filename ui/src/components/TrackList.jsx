import { deleteTrack, updateTrack } from '../api';
import React from 'react';

export default function TrackList({ tracks, refresh }) {
    async function toggleEdit(track) {
        const newTitle = prompt('New title:', track.title);
        if (!newTitle) return;

        await updateTrack(track.id, { title: newTitle });
        refresh();
    }

    return (
        <ul className="track-list">
            {tracks.map((track) => (
                <li key={track.id} className="track-item">
                    <strong>{track.title}</strong> — {track.artist}
                    {track.album && <em> ({track.album})</em>}
                    <div className="actions">
                        <button onClick={() => toggleEdit(track)}>Edit</button>
                        <button
                            onClick={async () => {
                                await deleteTrack(track.id);
                                refresh();
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
