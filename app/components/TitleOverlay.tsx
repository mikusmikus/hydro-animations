interface TitleOverlayProps {
  titles: string[];
  activeIndex: number;
}

export const TitleOverlay = ({ titles, activeIndex }: TitleOverlayProps) => {
  return (
    <div className="fixed z-[100] top-1/2 left-8 -translate-y-1/2 text-left  h-[20px] overflow-hidden">
      <div
        className="transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateY(${-activeIndex * 24}px)`,
        }}
      >
        {titles.map((item, index) => (
          <h2
            key={index}
            className={`text-[10px] my-4 transition-all duration-300 ease-in-out text-white mix-blend-difference
              ${index === activeIndex ? 'text-[12px] opacity-100' : 'opacity-30'}`}
          >
            {item}
          </h2>
        ))}
      </div>
    </div>
  );
};
