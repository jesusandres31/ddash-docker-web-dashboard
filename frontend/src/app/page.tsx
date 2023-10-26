'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Route } from '@/config';

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push(Route.Login);
  }, []);

  return <React.Fragment />;
}
