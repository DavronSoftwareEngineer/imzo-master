// Rasmni kesmasdan to'liq ko'rsatadi (contain), orqa fonida xira (blur) nusxa
// kartani to'ldiradi — bo'sh joy/bantlarsiz. Ota element o'lchamini to'liq egallaydi.
export default function FitImage({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) {
  return (
    <div className={`fit-img ${className}`.trim()}>
      <img src={src} alt="" aria-hidden="true" className="fit-img-bg" loading="lazy" />
      <img src={src} alt={alt} className="fit-img-fg" loading="lazy" />
    </div>
  );
}
