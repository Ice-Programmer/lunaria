import { createContext } from 'react';

export const CharacterRefreshContext = createContext<(() => Promise<void>) | null>(null);
