import React, { useEffect, useState } from 'react';
import { Layout, Typography, Space } from 'antd';
import { getTracks } from './api';
import TrackList from './components/TrackList';
import TrackForm from './components/TrackForm';

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
        <Layout style={{ padding: 24, minHeight: '100vh' }}>
            <div style={{ maxWidth: 500, margin: '0 auto' }}>
                <Space direction="vertical" size={24} style={{ width: '100%' }}>
                    <Typography.Title level={2}>
                        Favorite Music
                    </Typography.Title>

                    <TrackForm onAdd={(t) => setTracks([...tracks, t])} />

                    <TrackList tracks={tracks} refresh={loadTracks} />
                </Space>
            </div>
        </Layout>
    );
}
