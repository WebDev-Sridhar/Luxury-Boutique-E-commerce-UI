interface MarqueeProps {
  items: string[];
  separator?: string;
  speed?: number;
  className?: string;
  itemClassName?: string;
}

export function Marquee({
  items,
  separator = "\u2014",
  speed = 30,
  className = "",
  itemClassName = "",
}: MarqueeProps) {
  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-8 shrink-0">
      <span className={itemClassName}>{item}</span>
      <span className="text-foreground/30">{separator}</span>
    </span>
  ));

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="flex gap-8 items-center animate-marquee"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {content}
        {content}
        {content}
      </div>
    </div>
  );
}
