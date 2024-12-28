'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// initially we tried wrapping the whole <html> in the layout page with queryClient
// it required the  'use client' hook , as the layout page contained metadata we could not
// use 'use client' hook so we simply created a new folder named provider where we could make a
// 'use client' file and wrap the QueryClient

const queryClient = new QueryClient();

const ReactQueryClientProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
