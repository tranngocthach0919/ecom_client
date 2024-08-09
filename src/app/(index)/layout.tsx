'use client';

import { useEffect } from 'react';
import { fetchProfile } from 'src/apis/users/user-profile-api';
import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
