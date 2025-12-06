import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App.jsx';

function main() {
    const rootEl = document.getElementById('app');
    const root = createRoot(rootEl);
    root.render(
        <ChakraProvider>
            <App />
        </ChakraProvider>
    );
}

main();
