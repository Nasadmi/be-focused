import { createContext } from 'react';

export interface TokenContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  saveToken: (token: string) => void;
}

export const TokenContext = createContext<TokenContextType | undefined>(undefined);