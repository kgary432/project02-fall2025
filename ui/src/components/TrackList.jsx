import { deleteTrack, updateTrack } from '../api';
import React from 'react';
import {
    Box,
    VStack,
    HStack,
    Text,
    Button,
    Heading,
    Input,
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function TrackList({ tracks, refresh }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editingTrack, setEditingTrack] = useState(null);
    const [newTitle, setNewTitle] = useState('');

    async function handleEdit(track) {
        setEditingTrack(track);
        setNewTitle(track.title);
        onOpen();
    }

    async function handleSaveEdit() {
        if (!newTitle || !editingTrack) return;

        await updateTrack(editingTrack.id, { title: newTitle });
        refresh();
        onClose();
        setEditingTrack(null);
        setNewTitle('');
    }

    async function handleDelete(trackId) {
        await deleteTrack(trackId);
        refresh();
    }

    return (
        <Box>
            <Heading as="h2" size="md" mb={4}>
                Your Tracks ({tracks.length})
            </Heading>
            {tracks.length === 0 ? (
                <Box
                    p={8}
                    textAlign="center"
                    borderWidth="1px"
                    borderRadius="lg"
                    bg="gray.50"
                >
                    <Text color="gray.500">No tracks yet. Add one above!</Text>
                </Box>
            ) : (
                <VStack spacing={3} align="stretch">
                    {tracks.map((track) => (
                        <Box
                            key={track.id}
                            p={4}
                            borderWidth="1px"
                            borderRadius="lg"
                            boxShadow="sm"
                            bg="white"
                        >
                            <HStack justify="space-between" align="start">
                                <Box flex={1}>
                                    <Text
                                        fontWeight="bold"
                                        fontSize="lg"
                                        mb={1}
                                    >
                                        {track.title}
                                    </Text>
                                    <Text color="gray.600" mb={1}>
                                        {track.artist}
                                    </Text>
                                    {track.album && (
                                        <Text
                                            fontSize="sm"
                                            color="gray.500"
                                            fontStyle="italic"
                                        >
                                            {track.album}
                                        </Text>
                                    )}
                                    {track.genre && (
                                        <Text
                                            fontSize="sm"
                                            color="pink.500"
                                            mt={1}
                                        >
                                            {track.genre}
                                        </Text>
                                    )}
                                </Box>
                                <HStack spacing={2}>
                                    <Button
                                        size="sm"
                                        colorScheme="blue"
                                        onClick={() => handleEdit(track)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        colorScheme="red"
                                        onClick={() => handleDelete(track.id)}
                                    >
                                        Delete
                                    </Button>
                                </HStack>
                            </HStack>
                        </Box>
                    ))}
                </VStack>
            )}

            {isOpen && (
                <Box
                    position="fixed"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="blackAlpha.600"
                    zIndex={1000}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    onClick={onClose}
                >
                    <Box
                        bg="white"
                        borderRadius="lg"
                        boxShadow="xl"
                        maxW="400px"
                        w="90%"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Box
                            p={4}
                            borderBottomWidth="1px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Heading size="md">Edit Track Title</Heading>
                            <Button size="sm" variant="ghost" onClick={onClose}>
                                ×
                            </Button>
                        </Box>
                        <Box p={6}>
                            <Box mb={4}>
                                <Text fontWeight="medium" mb={2}>
                                    New Title
                                </Text>
                                <Input
                                    value={newTitle}
                                    onChange={(e) =>
                                        setNewTitle(e.target.value)
                                    }
                                    placeholder="Enter new title"
                                />
                            </Box>
                            <HStack mt={4} justify="flex-end">
                                <Button onClick={onClose}>Cancel</Button>
                                <Button
                                    colorScheme="blue"
                                    onClick={handleSaveEdit}
                                >
                                    Save
                                </Button>
                            </HStack>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
