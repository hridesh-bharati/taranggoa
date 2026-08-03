'use client';

import { useAuth } from '@/context/AuthContext';
import GalleryView from '@/components/common/GalleryView';

export default function UserGalleryPage() {
  const { user } = useAuth();
  if (!user) return null;

  return <GalleryView targetUserId={user.uid} isAdminView={false} />;
}