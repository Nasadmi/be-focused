import { TokenContext } from '@contexts/token.context';
import { type ReactNode, useEffect, useState } from 'react';
import { getCookie, setCookie } from '@utils/cookies'; 

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getCookie('token');
  
    if (storedToken) {
      setToken(storedToken);
    }
  }, [token]);

  const saveToken = (newToken: string) => {
    setToken(newToken);
    setCookie('token', newToken, 1);
  }

  return (
    <TokenContext.Provider value={{ token, setToken, saveToken }}>
      {children}
    </TokenContext.Provider>
  );
}