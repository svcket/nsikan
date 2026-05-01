import Image from 'next/image';
import type { CardData } from '@/data/projectRows';

// Exact filenames as provided — note the double space in "tall" filename
const cardImageSrc: Record<string, string> = {
  tall:    '/assets/proejct card  tall.png',
  taller:  '/assets/proejct card taller.png',
  tallest: '/assets/proejct card tallest height.png',
};

interface ProjectCardProps {
  card: CardData;
}

// The PNG assets are complete card units (image + title + description + CTA baked in).
// We render only the image — no additional text below.
export function ProjectCard({ card }: ProjectCardProps) {
  return (
    // flex-1 + min-w-0 ensures all 3 cards in a row share equal column width
    <div className="flex-1 min-w-0">
      <Image
        src={cardImageSrc[card.variant]}
        alt={card.title}
        width={700}
        height={1000}
        className="w-full h-auto block"
      />
    </div>
  );
}
