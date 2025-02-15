interface TitleOverlayProps {
  titles: string[];
  activeIndex: number;
}

export const TitleOverlay = ({ titles, activeIndex }: TitleOverlayProps) => {
  // Create a reordered array that shows 3 items before and after the active index
  const getReorderedTitles = () => {
    const reordered = [];
    const length = titles.length;

    // Add 3 items before active index
    for (let i = 3; i > 0; i--) {
      const index = (activeIndex - i + length) % length;
      reordered.push({ title: titles[index], originalIndex: index });
    }

    // Add active index
    reordered.push({ title: titles[activeIndex], originalIndex: activeIndex });

    // Add 3 items after active index
    for (let i = 1; i <= 3; i++) {
      const index = (activeIndex + i) % length;
      reordered.push({ title: titles[index], originalIndex: index });
    }

    return reordered;
  };

  return (
    <div className="fixed z-[100] top-1/2 left-8 -translate-y-1/2 text-left">
      <div className="flex flex-col gap-2">
        {getReorderedTitles().map(({ title, originalIndex }, displayIndex) => (
          <h2
            key={originalIndex}
            className={`text-[10px] transition-all duration-300 ease-in-out text-white mix-blend-difference
              ${displayIndex === 3 ? 'text-[12px] opacity-100' : 'opacity-30'}`}
          >
            {title}
          </h2>
        ))}
      </div>
    </div>
  );
};
