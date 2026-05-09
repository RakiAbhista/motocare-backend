import "../css/app.css";

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'sonner';
import axios from 'axios';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';
const queryClient = new QueryClient();

// Restore authentication token from localStorage on page load
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        // Gabungkan props asli dengan data dari script tag jika props bawaan kosong
        let pageData = props;
        
        if (!props || !props.initialPage) {
            const dataElement = document.querySelector('script[data-page="app"]');
            if (dataElement) {
                const parsed = JSON.parse(dataElement.textContent);
                // Pastikan formatnya sesuai yang diinginkan App Inertia
                pageData = { ...props, initialPage: parsed };
            }
        }

        const root = createRoot(el);
        root.render(
            <QueryClientProvider client={queryClient}>
                <App {...pageData} />
                <Toaster richColors position="top-right" />
            </QueryClientProvider>
        );
    },
    progress: { color: "#4B5563" },
});