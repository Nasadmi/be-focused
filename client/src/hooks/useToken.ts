import { TokenContext } from '@contexts/token.context';
import { useContext } from 'react';

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) throw new Error("This component is not under token provider");
  return context;
}