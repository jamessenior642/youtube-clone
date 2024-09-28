'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function VideoPlayer() {
  const videoPrefix = 'https://storage.googleapis.com/jvs642-yt-processed-videos/';
  const searchParams = useSearchParams();
  const videoSrc = searchParams.get('v');

  // Handle the case where `videoSrc` is null (no search param provided)
  if (!videoSrc) {
    return <p>No video specified.</p>;
  }

  return (
    <div>
      <h1>Watch Page</h1>
      <video controls src={videoPrefix + videoSrc} />
    </div>
  );
}

export default function Watch() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VideoPlayer />
    </Suspense>
  );
}

