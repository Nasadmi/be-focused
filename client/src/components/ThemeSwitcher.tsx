import { useTheme } from '@hooks/useTheme';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export const ThemeSwitcher = ({ styles }: { styles?: string }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={() => toggleTheme()} className={`bg-violet-800 text-white dark:bg-sky-500 dark:text-gray-white p-2 rounded-2xl cursor-pointer ${styles}`}>
      {
        theme === 'light' ? <MoonIcon className='size-8'/> : <SunIcon className='size-8'/> 
      }
    </button>
  )
}