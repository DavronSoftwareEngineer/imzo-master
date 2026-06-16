import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiCalculator, HiClipboardList } from 'react-icons/hi';
import PageHero from '../components/ui/PageHero';
import Seo from '../components/ui/Seo';

// Taxminiy narxlar (so'm / m²) — egasi keyin aniq narxlarga moslaydi.
const RATES = [320000, 400000, 580000, 520000, 720000];

const fmt = (n: number) => Math.round(n).toLocaleString('ru-RU').replace(/,/g, ' ');

export default function CalculatorPage() {
  const { t } = useTranslation();
  const types = t('calc.types', { returnObjects: true }) as unknown as { name: string }[];
  const currency = t('calc.currency');

  const [type, setType] = useState(0);
  const [width, setWidth] = useState(120);
  const [height, setHeight] = useState(140);
  const [qty, setQty] = useState(1);

  const area = Math.max(0, (width / 100) * (height / 100) * qty);
  const base = area * (RATES[type] ?? RATES[0]);
  const low = base;
  const high = base * 1.15;

  const field = { width: '100%', padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 12, fontSize: 15, outline: 'none', background: 'var(--surface)', color: 'var(--text)' } as const;
  const label = { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 } as const;

  return (
    <>
      <Seo title={t('calc.title')} description={t('calc.subtitle')} />
      <PageHero title={t('calc.title')} subtitle={t('calc.subtitle')} />
      <section className="section bg-white">
        <div className="contain" style={{ maxWidth: 920 }}>
          <div className="grid-2" style={{ alignItems: 'stretch' }}>
            {/* Inputs */}
            <div className="card card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--accent-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><HiCalculator style={{ color: 'var(--accent-dark)', fontSize: 22 }} /></span>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-heading)' }}>{t('calc.title')}</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={label}>{t('calc.typeLabel')}</label>
                  <select value={type} onChange={(e) => setType(Number(e.target.value))} style={field}>
                    {Array.isArray(types) && types.map((tp, i) => <option key={i} value={i}>{tp.name}</option>)}
                  </select>
                </div>
                <div className="grid-2" style={{ gap: 12 }}>
                  <div>
                    <label style={label}>{t('calc.widthLabel')}</label>
                    <input type="number" min={30} max={600} value={width} onChange={(e) => setWidth(Number(e.target.value))} style={field} />
                  </div>
                  <div>
                    <label style={label}>{t('calc.heightLabel')}</label>
                    <input type="number" min={30} max={600} value={height} onChange={(e) => setHeight(Number(e.target.value))} style={field} />
                  </div>
                </div>
                <div>
                  <label style={label}>{t('calc.qtyLabel')}</label>
                  <input type="number" min={1} max={100} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} style={field} />
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="card card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(135deg, var(--primary), var(--primary-light))' }}>
              <div style={{ color: 'color-mix(in srgb, var(--primary-text) 70%, transparent)', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>{t('calc.areaLabel')}</div>
              <div style={{ color: 'var(--primary-text)', fontSize: 22, fontWeight: 800, marginBottom: 18 }}>{area.toFixed(2)} m²</div>
              <div style={{ color: 'color-mix(in srgb, var(--primary-text) 70%, transparent)', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>{t('calc.resultLabel')}</div>
              <div style={{ color: 'var(--accent)', fontSize: 'clamp(26px, 6vw, 38px)', fontWeight: 900, lineHeight: 1.15 }}>
                {fmt(low)} – {fmt(high)}
              </div>
              <div style={{ color: 'color-mix(in srgb, var(--primary-text) 70%, transparent)', fontSize: 14, marginBottom: 22 }}>{currency}</div>
              <Link to="/contact" className="btn btn-primary" style={{ justifyContent: 'center' }}><HiClipboardList />{t('calc.cta')}</Link>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted2)', fontSize: 13, marginTop: 20, textAlign: 'center' }}>{t('calc.disclaimer')}</p>
        </div>
      </section>
    </>
  );
}
