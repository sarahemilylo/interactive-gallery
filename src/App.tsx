import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

type Artwork = {
  id: number;
  title: string;
  year: string;
  medium: string;
  description: string;
  image?: string;
};

const ARTWORKS: Artwork[] = [
  {
    id: 1,
    title: "Florent Vollant: I Dream in Innu",
    year: "2021",
    medium: "Documentary",
    description:
      "The soul of the Innu language is the land, water and forests of the fast-disappearing caribou. Through his music, Florent Vollant continues to make this language heard around the world.",
    image: "/florent-vollant-XL.jpg",
  },
  {
    id: 2,
    title: "Earth Story",
    year: "2014",
    medium: "Poem Accompaniment",
    description:
      "The poem Earth Story was written by Nicolas Bonin, a 17-year-old Métis student from Winnipeg, Manitoba, in 2014 (Bonin). His poem explores topics connected to the Indigenous, the land, and their culture. It explores the stark contrast between the Indigenous way of life and that of European civilization, as well as the way they pass down their stories.",
    image: "/earth-story-poem.png",
  },
  {
    id: 3,
    title: "This Painting is a Mirror",
    year: "2012",
    medium: "Artwork Accompaniment",
    description: "Artist: Christi Belcourt",
    image: "/christi-belcourt-mirror-2.jpg",
  },
  {
    id: 4,
    title: "All My Relations Podcast",
    year: "2020",
    medium: "Podcast Accompaniment",
    description:
      "The podcast All My Relations is co-hosted by Matika Wilbur (Swinomish and Tulalip) and Temryss Lane (Lummi Nation). In the episode, “Indigenous Artist to Artist (Part 1): Adapting To Pandemic & Daring to Dream,” they speak with three Indigenous artists, exploring the realms of creativity and culture. The episode highlights how these Indigenous artists continue to share their stories and preserve their traditions in a world where cultural appropriation is common.",
    image: "/podcast-image.png",
  },
  {
    id: 5,
    title: "Resources",
    year: "",
    medium: "",
    description: "This resource accompaniment was created by Sarah Lo (April 2026).",
    image: "/works-cited.png",
  },
];

function clsx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function getArtworkImage(art: Artwork): string {
  return art.image ?? `/images/${art.id}.jpg`;
}

function ScribbleBackdrop() {
  const lines = useMemo(() => {
    const arr: Array<{ x1: number; y1: number; x2: number; y2: number; o: number }> = [];
    for (let i = 0; i < 260; i += 1) {
      arr.push({
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
        o: 0.16 + Math.random() * 0.24,
      });
    }
    return arr;
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#2c2c2c]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full opacity-70">
        {lines.map((line, i) => (
          <line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="white"
            strokeOpacity={line.o}
            strokeWidth="0.18"
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}

function LittleFigure({ className = "", walking = false }: { className?: string; walking?: boolean }) {
  const transition = walking
    ? { repeat: Infinity, duration: 0.42, ease: "easeInOut" as const }
    : undefined;

  return (
    <div className={clsx("relative h-20 w-12", className)}>
      <motion.div
        className="absolute left-1/2 top-0 h-9 w-9 -translate-x-1/2 rounded-full bg-black shadow-lg"
        animate={walking ? { y: [0, -1.5, 0] } : undefined}
        transition={transition}
      />
      <motion.div
        className="absolute left-1/2 top-8 h-7 w-5 -translate-x-1/2 rounded-full bg-black"
        animate={walking ? { y: [0, 1, 0] } : undefined}
        transition={transition}
      />
      <motion.div
        className="absolute left-[9px] top-[42px] h-5 w-[7px] origin-top rounded-full bg-black"
        animate={walking ? { rotate: [14, -10, 14], y: [0, -0.5, 0] } : undefined}
        transition={transition}
      />
      <motion.div
        className="absolute right-[9px] top-[42px] h-5 w-[7px] origin-top rounded-full bg-black"
        animate={walking ? { rotate: [-14, 10, -14], y: [0, -0.5, 0] } : undefined}
        transition={transition}
      />
      <motion.div
        className="absolute left-[13px] top-[54px] h-7 w-[7px] origin-top rounded-full bg-black"
        animate={walking ? { rotate: [-16, 18, -16], y: [0, 1, 0] } : undefined}
        transition={transition}
      />
      <motion.div
        className="absolute right-[13px] top-[54px] h-7 w-[7px] origin-top rounded-full bg-black"
        animate={walking ? { rotate: [16, -18, 16], y: [0, 1, 0] } : undefined}
        transition={transition}
      />
    </div>
  );
}

function FramedArtwork({ art, active, onClick }: { art: Artwork; active?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "group relative overflow-hidden rounded-sm border border-black/25 bg-[#ececec] text-left transition duration-300",
        active ? "scale-[1.02] shadow-2xl" : "hover:scale-[1.01]"
      )}
    >
      <div className="border-[10px] border-black bg-[#f7f7f7] p-4 md:border-[12px] md:p-5">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#d9d9d9]">
          <img src={getArtworkImage(art)} alt={art.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 opacity-70 transition group-hover:opacity-100" />
        </div>
      </div>
    </button>
  );
}

function Landing({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <ScribbleBackdrop />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.96)_16%,rgba(255,255,255,0.82)_28%,rgba(255,255,255,0.04)_52%,rgba(0,0,0,0.7)_100%)]" />
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-5"
      >
        <LittleFigure className="scale-125 md:scale-150" />
        <div className="text-center text-black/65">
          <div className="text-xs uppercase tracking-[0.45em]">Music Room Gallery</div>
          <div className="mt-3 text-3xl font-light tracking-tight md:text-5xl">Enter the Exhibition</div>
        </div>
        <button
          type="button"
          onClick={onEnter}
          className="rounded-full border border-black/15 bg-black px-6 py-3 text-sm uppercase tracking-[0.28em] text-white transition hover:scale-[1.02] hover:bg-black/90"
        >
          Start
        </button>
      </motion.div>
    </div>
  );
}

function GalleryRoom({
  index,
  setIndex,
  onOpenDetail,
  onOpenMenu,
}: {
  index: number;
  setIndex: (n: number) => void;
  onOpenDetail: () => void;
  onOpenMenu: () => void;
}) {
  const [playerX, setPlayerX] = useState(16);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [walking, setWalking] = useState(false);
  const pressedKeysRef = useRef<Set<string>>(new Set());
  const playerXRef = useRef(16);
  const indexRef = useRef(index);

  const WORLD_LEFT = 14;
  const WORLD_SPACING = 26;
  const WORLD_WIDTH = 180;

  const worldSpots = useMemo(() => ARTWORKS.map((_, i) => WORLD_LEFT + i * WORLD_SPACING), []);
  const minPlayerX = worldSpots[0];
  const maxPlayerX = worldSpots[worldSpots.length - 1];

  useEffect(() => {
    setPlayerX(worldSpots[index]);
    playerXRef.current = worldSpots[index];
    indexRef.current = index;
  }, [index, worldSpots]);

  useEffect(() => {
    playerXRef.current = playerX;
  }, [playerX]);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    let raf = 0;

    const step = () => {
      const pressed = pressedKeysRef.current;
      const movingLeft = pressed.has("arrowleft") || pressed.has("a");
      const movingRight = pressed.has("arrowright") || pressed.has("d");
      const wantsInteract = pressed.has("arrowup") || pressed.has("w") || pressed.has("enter") || pressed.has(" ");
      const wantsMenu = pressed.has("escape");

      if (wantsMenu) {
        pressed.delete("escape");
        onOpenMenu();
      }

      let dx = 0;
      if (movingLeft) dx -= 0.34;
      if (movingRight) dx += 0.34;

      if (dx !== 0) {
        setWalking(true);
        setDirection(dx < 0 ? "left" : "right");
        setPlayerX((prev) => {
          const next = Math.max(minPlayerX, Math.min(maxPlayerX, prev + dx));
          playerXRef.current = next;

          let nearest = 0;
          let bestDistance = Number.POSITIVE_INFINITY;
          worldSpots.forEach((spot, i) => {
            const dist = Math.abs(spot - next);
            if (dist < bestDistance) {
              bestDistance = dist;
              nearest = i;
            }
          });

          if (nearest !== indexRef.current && bestDistance < 4.2) {
            indexRef.current = nearest;
            setIndex(nearest);
          }

          return next;
        });
      } else {
        setWalking(false);
      }

      if (wantsInteract) {
        pressed.delete("arrowup");
        pressed.delete("w");
        pressed.delete("enter");
        pressed.delete(" ");
        const activeDistance = Math.abs(playerXRef.current - worldSpots[indexRef.current]);
        if (activeDistance < 2.2) onOpenDetail();
      }

      raf = window.requestAnimationFrame(step);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTypingTarget =
        !!target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if (isTypingTarget) return;

      const key = e.key.toLowerCase();
      if (["arrowleft", "arrowright", "arrowup", "a", "d", "w", "enter", " ", "escape"].includes(key)) {
        e.preventDefault();
        pressedKeysRef.current.add(key);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTypingTarget =
        !!target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if (isTypingTarget) return;

      pressedKeysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    raf = window.requestAnimationFrame(step);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.cancelAnimationFrame(raf);
    };
  }, [maxPlayerX, minPlayerX, onOpenDetail, onOpenMenu, setIndex, worldSpots]);

  const cameraOffset = Math.max(0, Math.min(playerX - 40, WORLD_WIDTH - 100));
  const activeRingIndex = ARTWORKS.findIndex((_, i) => Math.abs(playerX - worldSpots[i]) < 2.2);
  const canInteract = activeRingIndex === index && activeRingIndex !== -1;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#2f2f2f] text-black">
      <ScribbleBackdrop />
      <div className="absolute inset-[4.2%] overflow-hidden bg-[#ededed] shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.48),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.03))]" />

        <button
          type="button"
          onClick={canInteract ? onOpenDetail : undefined}
          className={clsx(
            "absolute left-10 top-7 z-30 flex items-center gap-3 text-[12px] tracking-[0.01em] transition",
            canInteract ? "text-black" : "text-black/30"
          )}
        >
          <span>See details</span>
          <span className="text-2xl leading-none">↵</span>
        </button>

        <button
          type="button"
          onClick={onOpenMenu}
          className="absolute right-10 top-7 z-30 text-[12px] uppercase tracking-[0.22em] text-black/65 transition hover:text-black"
        >
          Menu
        </button>

        <motion.div
          animate={{ x: `-${cameraOffset}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 26, mass: 0.55 }}
          className="absolute inset-y-0 left-0"
          style={{ width: `${WORLD_WIDTH}%` }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-[linear-gradient(180deg,rgba(214,214,214,0.55),rgba(205,205,205,0.95))]" />
          <div className="absolute bottom-[17.2%] left-0 right-0 h-px bg-black/8" />
          <div className="absolute bottom-0 left-0 right-0 h-[20%] opacity-25 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.65)_50%,transparent_100%)]" />
          <div className="absolute bottom-0 left-0 z-10 h-[20%] w-[8%] bg-[linear-gradient(90deg,rgba(237,237,237,0.98),rgba(237,237,237,0.75),transparent)]" />
          <div className="absolute bottom-0 right-0 z-10 h-[20%] w-[8%] bg-[linear-gradient(270deg,rgba(237,237,237,0.98),rgba(237,237,237,0.75),transparent)]" />

          {ARTWORKS.map((art, i) => {
            const left = worldSpots[i];
            const distance = Math.abs(playerX - left);
            const prominence = Math.max(0, 1 - distance / 22);
            const active = i === activeRingIndex;
            const scale = active ? 1.14 : 0.94 + prominence * 0.12;
            const opacity = Math.max(0.35, 1 - distance / 42);
            const top = 16;
            const width = active ? "12%" : prominence > 0.55 ? "10.5%" : "9%";

            return (
              <motion.div
                key={art.id}
                animate={{ left: `${left}%`, top: `${top}%`, opacity }}
                transition={{ type: "spring", stiffness: 120, damping: 22 }}
                className="absolute -translate-x-1/2"
                style={{ width, transform: `scale(${scale})`, transformOrigin: "center bottom" }}
              >
                <div className="absolute left-1/2 top-0 h-full w-[75%] -translate-x-1/2 translate-x-[6px] translate-y-[6px] bg-black/6 blur-sm" />
                <FramedArtwork
                  art={art}
                  active={active}
                  onClick={() => {
                    setIndex(i);
                    setPlayerX(worldSpots[i]);
                    playerXRef.current = worldSpots[i];
                    indexRef.current = i;
                    onOpenDetail();
                  }}
                />
              </motion.div>
            );
          })}

          {worldSpots.map((spot, i) => {
            const active = i === activeRingIndex;
            const near = Math.abs(playerX - spot) < 2.2;
            const highlighted = i === activeRingIndex;
            return (
              <button
                type="button"
                key={i}
                onClick={() => setPlayerX(spot)}
                className={clsx(
                  "absolute bottom-[10%] z-20 h-6 w-20 -translate-x-1/2 rounded-full border-2 transition-all duration-200",
                  active
                    ? "border-black/80 bg-white/55"
                    : near
                      ? "border-black/55 bg-white/25"
                      : "border-black/32 bg-transparent",
                  highlighted && "scale-[1.15] border-black bg-white/70 shadow-lg"
                )}
                style={{ left: `${spot}%` }}
                aria-label={`Move to ${ARTWORKS[i].title}`}
              />
            );
          })}

          <motion.div
            className="absolute bottom-[9.1%] z-30 -translate-x-1/2"
            style={{ left: `${playerX}%` }}
            animate={walking ? { y: [0, -1.5, 0] } : undefined}
            transition={walking ? { repeat: Infinity, duration: 0.42, ease: "easeInOut" } : undefined}
          >
            <motion.div
              animate={{ scaleX: direction === "left" ? -1 : 1 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <LittleFigure className="scale-95 md:scale-110" walking={walking} />
            </motion.div>
            <motion.div
              className="absolute left-1/2 top-[102%] h-2.5 w-10 -translate-x-1/2 rounded-full bg-black/18 blur-sm"
              animate={walking ? { scaleX: [1, 0.82, 1], opacity: [0.16, 0.22, 0.16] } : undefined}
              transition={walking ? { repeat: Infinity, duration: 0.42, ease: "easeInOut" } : undefined}
            />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 flex-wrap items-center justify-center gap-3 text-[11px] text-black/48 md:gap-5">
          <div className="flex items-center gap-2">
            <span className="rounded border px-1.5 py-0.5">A</span>
            <span className="rounded border px-1.5 py-0.5">D</span>
            <span>or</span>
            <span className="rounded border px-1.5 py-0.5">←</span>
            <span className="rounded border px-1.5 py-0.5">→</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded border px-1.5 py-0.5">W</span>
            <span>or</span>
            <span className="rounded border px-1.5 py-0.5">Enter</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded border px-1.5 py-0.5">Esc</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryMenu({
  open,
  onClose,
  onSelect,
  selected,
  query,
  setQuery,
  onGoHome,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (n: number) => void;
  selected: number;
  query: string;
  setQuery: (v: string) => void;
  onGoHome: () => void;
}) {
  const filtered = ARTWORKS.filter((art) => art.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 bg-black/65 p-5 md:p-10"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="relative grid h-full grid-cols-1 overflow-hidden bg-black text-white md:grid-cols-[220px_1fr_1.25fr]"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 z-10 text-xs uppercase tracking-[0.3em] text-white/80 hover:text-white"
            >
              Close
            </button>

            <div className="border-r border-white/15 px-8 py-10">
              <div className="space-y-2 pt-10 text-2xl md:text-4xl">
                <button
                  onClick={() => {
                    onGoHome();
                    onClose();
                  }}
                  className="text-left text-white/35 transition hover:text-white"
                >
                  Home
                </button>
                <div className="font-medium">Gallery</div>
              </div>
            </div>

            <div className="flex min-h-0 flex-col border-r border-white/15 px-6 py-10 md:px-7">
              <div className="mt-auto flex items-center gap-3 border border-white/15 px-3 py-2 text-sm text-white/70">
                <Search className="h-4 w-4" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search an artwork"
                  className="w-full bg-transparent outline-none placeholder:text-white/35"
                />
              </div>

              <div className="mt-8 min-h-0 flex-1 overflow-y-auto pr-2 text-sm leading-6 text-white/92">
                {filtered.map((art) => {
                  const originalIndex = ARTWORKS.findIndex((a) => a.id === art.id);
                  return (
                    <button
                      type="button"
                      key={art.id}
                      onClick={() => {
                        onSelect(originalIndex);
                        onClose();
                      }}
                      className={clsx(
                        "block w-full text-left transition hover:text-white/60",
                        originalIndex === selected ? "font-semibold text-white" : "text-white/82"
                      )}
                    >
                      {art.title}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative hidden items-center justify-center bg-black md:flex">
              <div className="w-[68%] max-w-[520px]">
                <FramedArtwork art={ARTWORKS[selected]} active />
                <div className="mt-5 flex items-start justify-between gap-6 text-sm text-white/75">
                  <div>
                    <div className="text-lg text-white">{ARTWORKS[selected].title}</div>
                    <div className="mt-1">{ARTWORKS[selected].medium} • {ARTWORKS[selected].year}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="pt-10">
      <div className="mb-5 flex items-center gap-4">
        <div className="h-px flex-1 bg-black/12" />
        <div className="text-sm uppercase tracking-[0.24em] text-black/45">{title}</div>
        <div className="h-px flex-1 bg-black/12" />
      </div>
    </div>
  );
}

function FirstArtworkBody() {
  return (
    <p className="mt-8 max-w-md text-base leading-8 text-black/68">
      The soul of the Innu language is the land, water and forests of the fast-disappearing caribou. Through his music, Florent Vollant continues to make this language heard around the world.
    </p>
  );
}

function FirstArtworkContributors() {
  return (
    <section className="pt-6">
      <SectionDivider title="Key contributors" />
      <div className="grid gap-10 md:grid-cols-2">
        <article className="space-y-5 border-t border-black/8 pt-4 md:border-t-0 md:pt-0">
          <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200">
            <img src="/pierre.png" alt="Pierre-Mathieu Fortin" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="text-3xl font-light text-[#4c6f95]">Producer</div>
            <div className="mt-2 text-2xl text-black/85">Pierre-Mathieu Fortin</div>
          </div>
          <p className="text-base leading-8 text-black/72">
            Pierre-Mathieu Fortin has been a French producer at the National Film Board of Canada (NFB) in the French Documentary Unit since 2020, supporting and guiding various filmmakers with documentaries and short films. As the producer for <em>Florent Vollant: I Dream in Innu</em>, he is known for his creativity, curiosity, and interest in art and storytelling, especially projects that explore cultural identity and social change. Earlier in his career, Fortin co-founded the creative studio BonGolem and worked as a creative director for digital content at Radio-Canada. Additionally, he has worked with many other producers in media and documentary, including <em>Star Wars Kid: The Rise of the Digital Shadows</em>. Today, Fortin continues to collaborate with various filmmakers and support new documentary projects.
          </p>
        </article>

        <article className="space-y-5 border-t border-black/8 pt-4 md:border-t-0 md:pt-0">
          <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200">
            <img src="/nicholas.png" alt="Nicolas Renaud" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="text-3xl font-light text-[#4c6f95]">Director</div>
            <div className="mt-2 text-2xl text-black/85">Nicolas Renaud</div>
          </div>
          <p className="text-base leading-8 text-black/72">
            Nicolas Renaud, the director of <em>Florent Vollant: I Dream in Innu</em>, is a member of the Huron-Wendat First Nation of Wendake. He studied film and sociology and is best known as the co-founder of <em>Hors Champ</em>, an online film journal. Publishing various articles on art, media, and cinematography, Renaud has also created various short films in both Canada and Europe. Additionally, he has organized special screenings and instructed camera workshops in Montreal. While not working with the camera behind the scenes, he is a professor in the First Peoples Studies program at Concordia University of Montreal.
          </p>
        </article>
      </div>
    </section>
  );
}

function FirstArtworkMoreDetails() {
  return (
    <>
      <p>
        The soul of the Innu language is the land, water and forests of the fast-disappearing caribou. Through his music, Florent Vollant continues to make this language heard around the world.
      </p>
      <FirstArtworkContributors />
      <SectionDivider title="Main Idea(s)/Key Messages" />
      <section className="space-y-6">
        <p className="text-base leading-8 text-black/72">
          <em>Florent Vollant: I Dream in Innu</em> is a performative documentary created by Pierre-Mathieu Fortin and Nicolas Renaud. Showcasing the deep connection between the Innu people and their culture, this short documentary shares Florent Vollant’s story while highlighting the importance of protecting Indigenous language, culture, and land.
        </p>
        <p className="text-base leading-8 text-black/72">
          Florent Vollant is an Innu musician and songwriter who uses his music to share his experiences and preserve his culture. Through his storytelling and songs, he expresses the importance of language, identity, and connection to the land.
        </p>
        <p className="text-base leading-8 text-black/72">
          The film emphasizes how nature was once abundant and central to the Innu way of life, but is now increasingly threatened. For instance, the caribou, a prominent figure in Innu culture, has been declining in population, threatening both the environment and the traditions associated with it.
        </p>
        <p className="text-base leading-8 text-black/72">
          Correspondingly, the film illustrates the loss of freedom experienced by the Innu people after being confined to reserves, much like the caribou were confined behind fences. However, through his music and storytelling, Florent expresses his identity while working to preserve the Innu language and culture.
        </p>
        <p className="text-base leading-8 text-black/72">
          In addition, this documentary highlights the importance of dreams and traditional knowledge, which play a key role in guiding Indigenous life. Because the Innu language, culture, and environment are deeply interconnected, protecting the land and the caribou is essential for preserving this culture.
        </p>
        <p className="text-base leading-8 text-black/72">
          Furthermore, this short documentary highlights the importance of language preservation, dreams, and cultural identity.
        </p>
      </section>
      <SectionDivider title="Conventions & Techniques" />
      <section>
        <p className="mb-6 text-base leading-8 text-black/72">
          Throughout this five-minute film, Renaud and his team use various techniques to effectively communicate the documentary’s central message and reveal deeper themes of identity and culture, both of which shape how the documentary is perceived. Using both audio and visual components, Nicholas directs the film into a visual and auditory experience, with each second having been perfectly constructed to guide the audience through Vollant’s reflections while reinforcing the importance of preserving language, culture, and tradition. Together, these elements work seamlessly to create a cohesive and emotionally impactful documentary.
        </p>
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <div className="border-t border-black/8 pt-4">
            <div className="mb-3 text-sm uppercase tracking-[0.18em] text-black/45">Audio Components</div>
            <p className="text-base leading-8 text-black/72">
              Using voice-overs as well as an indirect interview, Florent Vollant narrates his own story in his own traditional language, Innu. Using this technique provides the audience with personal insight and develops a deeper connection to Vollant, while also establishing authenticity and emphasizing the importance of hearing Indigenous stories directly from Indigenous voices. Additionally, Renaud adds background music to help develop the mood and tone appropriately, showcasing a more reflective and serious atmosphere. Combining this with ambient sounds such as the wind and the natural environment, Nicholas is able to immerse you in a new world, helping you feel your surroundings, and empathize and understand the situation. Correspondingly, he switches between using lyricless music to Vollant’s songs, reinforcing the theme of preserving language, culture, and identity while also suggesting that although the language and traditions are threatened, they continue to survive through music and storytelling.
            </p>
          </div>
          <div className="border-t border-black/8 pt-4">
            <div className="mb-3 text-sm uppercase tracking-[0.18em] text-black/45">Visual Components</div>
            <p className="text-base leading-8 text-black/72">
              In this documentary, Nicholas makes use of various visual components along with his audio components to strengthen the storytelling and reinforce the film’s message. For instance, b-roll is used to show context to events, backup points, and to show connections. Additionally, it is able to showcase the beauty of the land and emphasize its importance, helping to engage the viewer and comprehend the environment. Similarly, using cinematography, Nicholas uses wide shots to showcase the beauty of the land and the connection between the Innu and the land, reinforcing the idea that their culture is closely tied to the natural world. In addition, Renaud strategically places other elements, such as juxtaposition, amidst the film to highlight certain points, such as when Vollant was talking about the moose. During this time, he talked about how the caribou were able to roam freely, representing their traditional freedom, while showcasing free-roaming caribou on the screen. However, soon after, he changes the scene to caribou behind cages, showing the stark contrast to reality and the struggle for freedom. At the same time, Vollant switches to talking about how the caribou are similar to them, showing the idea that the struggles of the caribou mirror the struggles of the people and their culture.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function SecondArtworkDetails() {
  return (
    <>
      <SectionDivider title="Theme & Connection to Documentary" />
      <section>
        <p className="text-base leading-8 text-black/72">
          Throughout this poem, Bonin incorporates various themes, all purposefully placed to detail a message to the audience. For instance, he mentions the significance of Indigenous peoples’ connection to the land. Nicolas states, “My ancestors’ stories are written / In the Air that fills us,” showcasing their deep relationship to the land. Throughout the entire piece, elements such as air, water, and earth are all capitalized, emphasizing the importance of nature in their culture. Additionally, the various references to animals such as buffalo, beavers, and caribou display how wildlife is deeply connected to Indigenous culture. Similar to the documentary <em>Florent Vollant: I Dream in Innu</em>, this poem exhibits how identity is tied to the earth and the need to protect the land. In Innu culture, caribou play a vital role in survival and cultural practices, representing both physical sustenance and spiritual connection to the land. As Florent Vollant explains in the documentary, the caribou provided many necessities for the Innu people, including food, clothing, and tools, and furthermore showcases its significance. Nevertheless, another theme present in the poem is the passing of stories and knowledge across generations, shown through the progression from ancestors, to parents, to the speaker, emphasizing the importance of preserving culture and traditions for future generations. The poem’s structure also reinforces this idea, as its free and open form reflects a sense of freedom rather than restriction. In addition, the shape which the piece forms represents the accumulation and growth of these stories, as it gradually gets wider near the end. This structural choice helps illustrate how knowledge and cultural identity expand over time. In Indigenous culture, stories were typically passed down orally by mouth, in contrast to European society, which passed stories down through written works. Furthermore, this poem highlights the distinct importance of cultural preservation through storytelling and shared experience. Similarly, in the documentary, Vollant shares his stories and cultural knowledge through music, using songs as a powerful way to preserve the Innu language and ensure that these traditions continue to be passed on to future generations. Correspondingly, this emphasizes the importance of protecting the land and culture. Both the poem and the documentary show that Indigenous identity is deeply connected to the natural world. Protecting the land, therefore, becomes essential for preserving language, traditions, and cultural identity. Therefore, this poem underlines a plethora of themes, such as the importance of the Indigenous peoples' connection to the land, how culture is passed on, and the importance of preserving culture and traditions, which closely connect to the central message of the documentary.
        </p>
      </section>
      <SectionDivider title="Devices & Tone" />
      <section>
        <p className="text-base leading-8 text-black/72">
          <em>Earth Story</em> by Nicolas Bonin includes several literary devices such as imagery, symbolism, and metaphors. He interweaves various elements of literature beautifully to emphasize the deep relationship between Indigenous people, their stories, and the natural world. For example, in lines one to two, he states “written / In the Air,” using a metaphor to suggest that Indigenous history and knowledge are not recorded in books, but instead exist within nature itself. This idea is reinforced through symbolism, as elements such as air, water, and earth represent the experiences of Indigenous peoples. Correspondingly, Nicolas uses vivid imagery to describe natural elements such as caribou, rivers, and trees, allowing the reader to visualize the environment and better understand its cultural significance. Additionally, along with these devices, the structure of the poem holds grave importance. The first three stanzas contain seven verses each, a number which holds deep significance to Aboriginal culture, often representing the Seven Generations teaching, which emphasizes learning from the past and protecting the future. This structural choice reinforces the theme of knowledge and stories being passed down through generations. Throughout the poem, Bonin also maintains a reflective, respectful, and spiritual tone, encouraging the reader to appreciate the relationship between the Indigenous people, their ancestors, and the natural world.
        </p>
      </section>
    </>
  );
}

function ThirdArtworkDetails() {
  return (
    <>
      <SectionDivider title="Connection to Documentary" />
      <section>
        <p className="text-base leading-8 text-black/72">
          Christina Belcourt’s <em>This Painting is a Mirror</em> was created in 2012 on an acrylic canvas, designed to resemble traditional beadwork. This handcrafted piece measures an incredible six feet nine inches by eight feet four inches, featuring various birds and plants and displaying the interconnectedness of nature. Each bead was placed with precision to emphasize the power of nature in the string of Indigenous culture. It depicts a balance in an ecosystem, reflecting the harmony that exists within nature. This idea parallels the documentary in which Florent Vollant explains that Innu culture is deeply connected to the land and the animals that inhabit it, particularly the caribou. The painting’s interconnected plants and animals mirror the documentary’s message that the natural world and Indigenous culture cannot be separated. Additionally, the leaves in both top corners resemble the shape of the caribou's antlers, subtly referencing the importance of caribou in Indigenous traditions. In Indigenous culture, nature is often presented as sacred. Correspondingly, in the documentary, Vollant states how caribou are central in Innu culture, as they have traditionally provided food, clothing, and tools while also holding spiritual significance. As a result, the caribou represents more than just survival, symbolizing the cultural and spiritual relationship between the Innu people and the land. Both the painting and the documentary, therefore, highlight the sacred role of nature and animals in sustaining Indigenous culture and identity. Additionally, Belcourt's use of beads to show how art can carry knowledge corresponds with Vollant’s music, which shares knowledge through melodies. While Belcourt uses a visual canvas to tell a story, Vollant uses music and lyrics. In addition, both are handcrafted forms of artistic expression that preserve and celebrate Indigenous culture. Furthermore, Christina uses her artwork to raise awareness of endangered species and spark discussions about the environment, while Florent uses songs to revive and preserve the Innu culture. Also, this artwork was made to reflect the beauty of what’s already in someone and how their culture will always stay with them. Similarly, in the documentary, Vollant reflects on his childhood memories, dreams, and experiences with the land to show that Innu identity is deeply rooted in culture and cannot be separated from it. Both art forms act as a form of cultural resistance, showing how Indigenous traditions and identities continue to survive despite historical challenges, similar to how Vollant uses music to preserve the Innu language and ensure that these cultural traditions are passed on to future generations.
        </p>
      </section>
    </>
  );
}

function FourthArtworkDetails() {
  return (
    <>
      <SectionDivider title="Connection to Artists & Cultural Preservation" />
      <section>
        <p className="text-base leading-8 text-black/72">
          As they discuss with artists Pat Pruitt, Waddie Crazyhorse, and J. Nicole Hatfield, they explore how art can be used as a form of cultural preservation and resistance. For example, Pruitt uses his metalworking skills to create jewelry pieces, such as feathers. In turn, he can use this to express his cultural identity and share stories rooted in his heritage. Similar to Florent, Pruitt uses his art as a way to preserve and pass down traditions and cultural knowledge to future generations. While they use different forms of art, they are able to communicate their experiences, maintain their cultural identity, and ensure that their traditions continue despite modern challenges. Additionally, as they discuss with Waddie Crazyhorse and Nicole Hatfield, they explore how art can be used as a form of cultural preservation and resistance. For example, Waddie emphasizes that his jewelry carries his energy and personal connection to his culture, showing that art is not just physical, but also deeply spiritual and meaningful. In the episode, he explains that each piece reflects his effort, identity, and relationships, reinforcing the idea that art can build connections within and beyond Indigenous communities. Hatfield, an Indigenous painter, instead uses her form of art as a way of healing and self-expression, highlighting the importance of reclaiming identity and empowering future generations. Like Vollant, all three artists use their respective art forms to preserve their cultures, express their identities, and pass down traditions to future generations. While they all use various forms of art, they are able to use their creations to tell stories and their culture amidst the loss of Indigenous culture in the modern world.
        </p>
      </section>
      <SectionDivider title="Elements & Techniques" />
      <section>
        <p className="text-base leading-8 text-black/72">
          Throughout the podcast, various elements and techniques are sprinkled throughout, all influencing different aspects of the environment of the listener. For instance, the background music used helps change the tone of the podcast, using minor chords on the piano for a more serious mood, and drums for more of a lighter, happier mood. Additionally, they also use music to smoothly transition to future scenes or different topics, helping the viewer switch to a different idea or perspective. In addition, the two co-hosts are able to talk to each other to keep the viewers engaged, as well as include other voices, increasing the idea of community and interconnectedness. Correspondingly, they are able to get various perspectives through personal storytelling, which helps to establish authenticity and deepen the emotional impact of the episode. This combination of techniques allows the audience to better understand Indigenous experiences and reinforces the importance of preserving culture through storytelling.
        </p>
      </section>
    </>
  );
}

function DetailModal({
  art,
  open,
  onClose,
  onOpenMore,
  onOpenMenu,
}: {
  art: Artwork;
  open: boolean;
  onClose: () => void;
  onOpenMore: () => void;
  onOpenMenu: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        onOpenMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, onOpenMenu]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[60] overflow-y-auto bg-black/55 p-5 md:p-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto my-6 grid max-w-6xl grid-cols-1 overflow-hidden rounded-sm bg-[#f3f3f3] text-black shadow-2xl md:grid-cols-[1.15fr_0.85fr]"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 z-10 rounded-full border border-black/10 bg-white/85 p-2 text-black/70 hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center justify-center bg-[#ececec] p-8 md:p-12">
              <div className="w-full max-w-[520px]">
                <FramedArtwork art={art} active />
              </div>
            </div>

            <div className="min-h-0 flex flex-col justify-between overflow-y-auto p-8 md:max-h-[90vh] md:p-12">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-black/45">Artwork details</div>
                <h2 className="mt-4 text-4xl font-light tracking-tight md:text-5xl">{art.title}</h2>
                {art.id !== 5 && (
                  <div className="mt-4 text-sm uppercase tracking-[0.22em] text-black/50">
                    {art.medium} • {art.year}
                  </div>
                )}
                {art.id === 1 ? (
                  <FirstArtworkBody />
                ) : (
                  <p className="mt-8 max-w-md text-base leading-8 text-black/68">{art.description}</p>
                )}
              </div>
              <div className="mt-8 grid gap-5 border-t border-black/10 pt-8 text-sm text-black/62">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-black/40">Curatorial note</div>
                  <p className="mt-2 leading-7">
                    This interactive version treats each drawing as a room-stop: browse laterally, open details, or jump directly from the searchable archive menu.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-black/12 px-4 py-2 text-xs uppercase tracking-[0.24em] hover:bg-black/5"
                  >
                    Back to room
                  </button>
                  <button
                    type="button"
                    onClick={onOpenMore}
                    className="rounded-full bg-black px-4 py-2 text-xs uppercase tracking-[0.24em] text-white hover:bg-black/85"
                  >
                    More details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MoreDetailsPage({ art, open, onClose }: { art: Artwork; open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-white p-8 text-black md:p-16"
        >
          <div className="mx-auto max-w-4xl">
            <button
              type="button"
              onClick={onClose}
              className="mb-6 text-sm uppercase tracking-[0.2em] text-black/60 hover:text-black"
            >
              ← Back
            </button>
            <h1 className="text-4xl font-light md:text-5xl">{art.title}</h1>
            {art.id !== 5 && <div className="mt-4 text-sm text-black/50">{art.medium} • {art.year}</div>}
            <div className="mt-10">
              <img src={getArtworkImage(art)} alt={art.title} className="w-full max-w-xl" />
            </div>
            <div className="mt-10 space-y-6 text-lg leading-8 text-black/75">
              {art.id === 1 ? (
                <FirstArtworkMoreDetails />
              ) : art.id === 2 ? (
                <>
                  <p>{art.description}</p>
                  <SecondArtworkDetails />
                </>
              ) : art.id === 3 ? (
                <>
                  <p>{art.description}</p>
                  <ThirdArtworkDetails />
                </>
              ) : art.id === 4 ? (
                <>
                  <p>{art.description}</p>
                  <FourthArtworkDetails />
                </>
              ) : (
                <p>{art.description}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function InteractiveGalleryExperience() {
  const [screen, setScreen] = useState<"landing" | "gallery">("landing");
  const [moreOpen, setMoreOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = menuOpen || detailOpen || moreOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen, detailOpen, moreOpen]);

  return (
    <div className="min-h-screen bg-black text-black">
      <AnimatePresence mode="wait">
        {screen === "landing" ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Landing onEnter={() => setScreen("gallery")} />
          </motion.div>
        ) : (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <GalleryRoom
              index={index}
              setIndex={setIndex}
              onOpenDetail={() => setDetailOpen(true)}
              onOpenMenu={() => setMenuOpen(true)}
            />
            <GalleryMenu
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
              onSelect={setIndex}
              selected={index}
              query={query}
              setQuery={setQuery}
              onGoHome={() => setScreen("landing")}
            />
            <DetailModal
              art={ARTWORKS[index]}
              open={detailOpen}
              onClose={() => setDetailOpen(false)}
              onOpenMore={() => {
                setDetailOpen(false);
                setMoreOpen(true);
              }}
              onOpenMenu={() => setMenuOpen(true)}
            />
            <MoreDetailsPage art={ARTWORKS[index]} open={moreOpen} onClose={() => setMoreOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
