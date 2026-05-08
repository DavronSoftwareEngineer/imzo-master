interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = true, light = false }: SectionHeadingProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-primary'}`}>
        {title}
      </h2>
      <div className={`flex items-center gap-2 mt-3 mb-5 ${centered ? 'justify-center' : ''}`}>
        <div className={`h-1 w-10 rounded-full ${light ? 'bg-accent' : 'bg-accent'}`} />
        <div className={`h-1 w-3 rounded-full ${light ? 'bg-accent/50' : 'bg-accent/50'}`} />
      </div>
      {subtitle && (
        <p className={`text-base sm:text-lg max-w-2xl ${light ? 'text-gray-300' : 'text-gray-500'} ${centered ? 'mx-auto' : ''} leading-relaxed`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
