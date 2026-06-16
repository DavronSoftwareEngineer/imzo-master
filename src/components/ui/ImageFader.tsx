import { useState, useEffect } from 'react';

const BASE = import.meta.env.BASE_URL;

// Rasmlarni silliq almashtiruvchi (crossfade) universal slider.
export default function ImageFader({ images, className, interval = 4000 }: { images: string[]; className?: string; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setI((p) => (p + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);
  return (
    <div className={className}>
      {images.map((src, idx) => (
        <img key={src} src={BASE + src} alt="" className={idx === i ? 'active' : ''} loading={idx === 0 ? 'eager' : 'lazy'} />
      ))}
    </div>
  );
}
