import { createBrowserRouter } from 'react-router';
import { Home } from '@features/home/pages/Home';
import { authRoutes } from './auth.routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  ...authRoutes
]);