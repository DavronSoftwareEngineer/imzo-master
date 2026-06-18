/* eslint-disable react-hooks/set-state-in-effect -- raqam animatsiyasi rAF ichida setState ishlatadi (ataylab) */
import { useEffect, useRef, useState } from 'react';

// Raqamni 0 dan haqiqiy qiymatga animatsiya bilan sanaydi (ekranga kirganda).
// "2 500", "10+ yil", "100%", "14+" kabi formatlarni qo'llab-quvvatlaydi.
export default function CountUp({ value }: { value: string }) {
  const m = value.match(/^(\d[\d\s]*)(.*)$/);
  const target = m ? parseInt(m[1].replace(/\s/g, ''), 10) : NaN;
  const suffix = m ? m[2] : '';
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (isNaN(target)) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(target); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1300;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  if (isNaN(target)) return <>{value}</>;
  const formatted = n.toLocaleString('ru-RU').replace(/,/g, ' ');
  return <span ref={ref}>{formatted}{suffix}</span>;
}
