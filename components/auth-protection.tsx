import { useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/auth';

// Component to handle protected routes
export function AuthProtection({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    // Wait for auth loading and navigation to be ready
    if (isLoading || !navigationState?.key) return;

    const currentRoute = segments[0];
    
    // Public routes that don't require authentication
    const publicRoutes = ['login', 'signup'];
    const isPublicRoute = publicRoutes.includes(currentRoute);

    // Protected routes that require authentication
    const protectedRoutes = ['home', 'products', 'cart', 'profile', 'settings', 'product'];
    const isProtectedRoute = protectedRoutes.includes(currentRoute);

    if (!user && isProtectedRoute) {
      // Redirect to login if user is not authenticated and trying to access protected routes
      router.replace('/login');
    } else if (user && isPublicRoute) {
      // Redirect to home if user is authenticated and trying to access auth routes
      router.replace('/home');
    }
  }, [user, segments, isLoading, navigationState?.key, router]);

  // Show nothing while loading to prevent flash of wrong screen
  if (isLoading || !navigationState?.key) {
    return null;
  }

  return <>{children}</>;
}