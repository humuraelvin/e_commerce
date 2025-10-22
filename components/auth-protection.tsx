import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/auth';

// Component to handle protected routes
export function AuthProtection({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (!user && !inAuthGroup) {
      // Redirect to login if user is not authenticated and trying to access protected routes
      router.replace('/login');
    } else if (user && inAuthGroup) {
      // Redirect to home if user is authenticated and trying to access auth routes
      router.replace('/(tabs)/home');
    }
  }, [user, segments, isLoading]);

  return <>{children}</>;
}