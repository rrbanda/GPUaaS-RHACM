'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect to main page - slides are now integrated
export default function SlidesRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main demo page (slides are now unified)
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/`;
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Redirecting to unified demo...</p>
      </div>
    </div>
  );
}
