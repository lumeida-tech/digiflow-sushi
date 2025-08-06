/* eslint-disable @next/next/no-img-element */
import { BlurFade } from "@/components/magicui/blur-fade";

const assets = [
  "/about/1.jpeg",
  "/about/2.jpeg",
  "/about/3.jpeg",
  "/about/4.jpg",
  "/about/our.mov",
  "/about/6.jpg",
  "/about/8.jpeg",
  "/about/5.jpg",
  "/about/7.jpg",
];
const images = Array.from({ length: 9 }, (_, i) => {
  const isLandscape = i % 2 === 0;
  const width = isLandscape ? 600 : 300;
  const height = isLandscape ? 600 : 300;
  return {
    src: assets[i],
    width: width,
    height: height,
  };
});

export function AboutImages() {
  return (
    <section id="photos">
      <div className="columns-2 gap-4 sm:columns-3">
        {images.map((imageUrl, idx) => (
          <BlurFade key={imageUrl.src} delay={0.25 + idx * 0.05} inView>
            {imageUrl.src.endsWith(".mov") ? (
              <video className="mb-4 size-full rounded-lg object-cover" autoPlay loop muted playsInline>
                <source src={imageUrl.src} type="video/mp4" />
              </video>
            ) : (
              <img
                className="mb-4 size-full rounded-lg object-contain"
                src={imageUrl.src}
                width={imageUrl.width}
                height={imageUrl.height}
                alt={`Random stock image ${idx + 1}`}
              />
            )}
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
