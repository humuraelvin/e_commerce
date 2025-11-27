import { Redirect } from 'expo-router';
import React, { useState } from 'react';
import Onboarding from '../components/onboarding';

export default function Index() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  if (showOnboarding) {
    return <Onboarding onDone={() => setShowOnboarding(false)} />;
  }
  return <Redirect href="/login" />;
}