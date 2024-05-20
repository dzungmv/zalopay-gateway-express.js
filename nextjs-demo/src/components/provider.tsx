'use client';

import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function ClientProvider({ children }: PropsWithChildren) {
    const [client] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
}
