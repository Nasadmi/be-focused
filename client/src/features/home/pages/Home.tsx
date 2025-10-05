import { useTheme } from '@hooks/useTheme'

export const Home = () => {
  const { toggleTheme } = useTheme()

  return (
    <main>
      <h1><span>Be</span>Focused</h1>
      <button onClick={toggleTheme}>Change Theme</button>
      <ul>
        <li>
          <button>Sign Up</button>
        </li>
        <li>
          <button>Sign In</button>
        </li>
      </ul>
    </main>
  )
}