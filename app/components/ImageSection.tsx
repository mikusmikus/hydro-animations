import Image from 'next/image';

interface ImageSectionProps {
  src: string;
  index: number;
  totalImages: number;
  imageRef: (el: HTMLDivElement | null) => void;
}

export const ImageSection = ({
  src,
  index,
  totalImages,
  imageRef,
}: ImageSectionProps) => {
  return (
    <div
      ref={imageRef}
      className="w-full relative"
      style={{
        height: '150vh',
        marginBottom: index === totalImages - 1 ? '100vh' : '0',
      }}
    >
      <div className="w-full h-full">
        <Image
          src={src || '/placeholder.svg'}
          alt={`Large image ${index + 1}`}
          fill
          className="object-cover"
          priority={index === 0}
        />
      </div>
    </div>
  );
};
