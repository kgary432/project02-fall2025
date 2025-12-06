import { useState } from 'react';
import { createTrack } from '../api';
import React from 'react';
import { Input, Button, Box } from '@chakra-ui/react';

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
        <Box
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            bg="white"
        >
            <Box as="h2" fontSize="lg" fontWeight="bold" mb={4}>
                Add New Track
            </Box>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={4}>
                    <Box>
                        <Box
                            as="label"
                            display="block"
                            mb={2}
                            fontSize="sm"
                            fontWeight="medium"
                        >
                            Song Title *
                        </Box>
                        <Input
                            placeholder="Song title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Box>
                    <Box>
                        <Box
                            as="label"
                            display="block"
                            mb={2}
                            fontSize="sm"
                            fontWeight="medium"
                        >
                            Artist *
                        </Box>
                        <Input
                            placeholder="Artist"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                            required
                        />
                    </Box>
                    <Box>
                        <Box
                            as="label"
                            display="block"
                            mb={2}
                            fontSize="sm"
                            fontWeight="medium"
                        >
                            Album (optional)
                        </Box>
                        <Input
                            placeholder="Album (optional)"
                            value={album}
                            onChange={(e) => setAlbum(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <Box
                            as="label"
                            display="block"
                            mb={2}
                            fontSize="sm"
                            fontWeight="medium"
                        >
                            Genre (optional)
                        </Box>
                        <Input
                            placeholder="Genre (optional)"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </Box>
                    <Button
                        type="submit"
                        colorScheme="pink"
                        size="lg"
                        width="full"
                    >
                        Add Track
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
