interface PageHeroProps { title: string; subtitle?: string; }

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="page-hero" style={{ background:'linear-gradient(135deg, #0f172a, #1e3a5f)', color:'#fff' }}>
      <div className="contain text-center">
        <h1 style={{ fontSize:36, fontWeight:800, lineHeight:1.08, letterSpacing:'-0.5px' }}>{title}</h1>
        {subtitle && <p style={{ fontSize:16, color:'rgba(255,255,255,0.7)', maxWidth:520, margin:'12px auto 0', lineHeight:1.6 }}>{subtitle}</p>}
      </div>
    </section>
  );
}
