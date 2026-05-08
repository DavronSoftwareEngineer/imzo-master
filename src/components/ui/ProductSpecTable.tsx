import type { ProductSpec } from '../../types';

interface ProductSpecTableProps {
  specs: ProductSpec[];
}

export default function ProductSpecTable({ specs }: ProductSpecTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm">
        <tbody>
          {specs.map((spec, i) => (
            <tr
              key={i}
              className={`transition-colors hover:bg-gray-50/50 ${
                i % 2 === 0 ? 'bg-white' : 'bg-surface'
              }`}
            >
              <td className="px-5 py-3.5 font-medium text-gray-500 border-r border-gray-50 w-1/2">
                {spec.label}
              </td>
              <td className="px-5 py-3.5 text-gray-800 font-medium">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
