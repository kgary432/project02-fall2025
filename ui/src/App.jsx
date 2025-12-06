import { useEffect, useState } from 'react';
import { getTracks } from './api';
import TrackList from './components/TrackList';
import TrackForm from './components/TrackForm';
import React from 'react';
import { Container, Heading, VStack, Box } from '@chakra-ui/react';

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
        <Container maxW="800px" py={8}>
            <VStack spacing={6} align="stretch">
                <Heading as="h1" size="xl" textAlign="center" color="pink.500">
                    Favorite Music
                </Heading>
                <Box>
                    <TrackForm onAdd={(t) => setTracks([...tracks, t])} />
                </Box>
                <Box>
                    <TrackList tracks={tracks} refresh={loadTracks} />
                </Box>
            </VStack>
        </Container>
    );
}
