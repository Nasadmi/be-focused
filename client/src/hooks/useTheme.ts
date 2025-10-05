import { ThemeContext } from '@contexts/theme.context'
import { useContext } from 'react'

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("This component is not under provider");
  return context;
}