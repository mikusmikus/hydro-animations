interface TitleOverlayProps {
  titles: { title: string }[];
  activeIndex: number;
}

export const TitleOverlay = ({ titles, activeIndex }: TitleOverlayProps) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-50">
      {titles.map((item, index) => (
        <h2
          key={index}
          className={`text-4xl my-4 transition-all duration-300 ease-in-out
            ${index === activeIndex ? 'text-[2.5rem] opacity-100' : 'opacity-30'}`}
        >
          {item.title}
        </h2>
      ))}
    </div>
  );
}; 