import Image from "next/image";
import { Typewriter } from "./typewriter";
import type { CSSProperties } from "react";
import { signs } from "@/lib/knowledge";
export function ZodiacMascot({
  sign,
  className = "",
}: {
  sign: string;
  className?: string;
}) {
  const index = Math.max(
    0,
    signs.findIndex((s) => s.name.toLowerCase() === sign.toLowerCase()),
  );
  return (
    <span className="mascot-with-caption">
      <span
        className={`zodiac-mascot ${className}`}
        role="img"
        aria-label={`${sign} cartoon mascot`}
        style={
          {
            "--mascot-trim": `${Math.floor(index / 4) === 0 ? 8 : Math.floor(index / 4) === 1 ? 10 : 0}%`,
            backgroundPosition: `${((index % 4) / 3) * 100}% ${(Math.floor(index / 4) / 2) * 100}%`,
          } as CSSProperties
        }
      />
      <Typewriter
        text={`${sign}: ${signs[index].gift.toLowerCase()}, with a little cosmic flair.`}
        className="mascot-caption"
      />
    </span>
  );
}
export function LearningFriends() {
  return (
    <figure className="learning-figure">
      <Image
        className="learning-friends"
        src="/art/learning-friends.png"
        width={1280}
        height={1280}
        alt="Moon, star, and planet friends reading together"
        sizes="(max-width: 700px) 90vw, 440px"
      />
      <figcaption>
        <Typewriter text="One tiny question can open a whole universe." />
      </figcaption>
    </figure>
  );
}
