'use client';

import { useState, useEffect } from 'react';

const reviews = [
  {
    name: "Jack",
    rating: 4.5,
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    rating: 5,
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    rating: 3.5,
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    rating: 4,
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    rating: 5,
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    rating: 4.5,
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const StarRating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={`text-sm ${
        i < Math.floor(rating)
          ? 'text-yellow-400'
          : rating - Math.floor(rating) > 0 && i === Math.floor(rating)
          ? 'text-yellow-400 opacity-50'
          : 'text-gray-400'
      }`}
    >
      ★
    </span>
  ));
  return <div className="flex gap-0.5">{stars}</div>;
};

const ReviewCard = ({
  img,
  name,
  rating,
  body,
}: {
  img: string;
  name: string;
  rating: number;
  body: string;
}) => {
  return (
    <figure className="relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mx-4 flex-shrink-0 shadow-sm">
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <StarRating rating={rating} />
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-gray-600 dark:text-gray-300">{body}</blockquote>
    </figure>
  );
};

// Composant Marquee qui fonctionne vraiment
const WorkingMarquee = ({ 
  children, 
  reverse = false, 
  pauseOnHover = false,
  speed = 30
}: { 
  children: React.ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  speed?: number;
}) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className="flex overflow-hidden relative w-full"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div 
        className="flex animate-scroll"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
      >
        <div className="flex">{children}</div>
        <div className="flex">{children}</div>
      </div>
    </div>
  );
};

export default function ReviewMarquee() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden h-48">
        <div className="animate-pulse text-gray-500">Chargement des avis...</div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 py-8">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll linear infinite;
          width: fit-content;
        }
      `}</style>
      
      <div className="mb-4">
        <WorkingMarquee pauseOnHover speed={25}>
          {firstRow.map((review, index) => (
            <ReviewCard key={`first-${review.name}-${index}`} {...review} />
          ))}
        </WorkingMarquee>
      </div>
      
      <div>
        <WorkingMarquee reverse pauseOnHover speed={30}>
          {secondRow.map((review, index) => (
            <ReviewCard key={`second-${review.name}-${index}`} {...review} />
          ))}
        </WorkingMarquee>
      </div>
      
      {/* Gradients de masquage */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10"></div>
    </div>
  );
}