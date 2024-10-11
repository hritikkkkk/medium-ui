import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
  {
    name: "Emma",
    username: "@emma",
    body: "This app has completely transformed my blogging experience.",
    img: "https://picsum.photos/seed/emma/32",
  },
  {
    name: "Liam",
    username: "@liam",
    body: "From drafting to publishing, every step feels effortless.",
    img: "https://picsum.photos/seed/liam/32",
  },
  {
    name: "Sophia",
    username: "@sophia",
    body: "I never knew blogging could be this enjoyable!",
    img: "https://picsum.photos/seed/sophia/32",
  },
  {
    name: "Mason",
    username: "@mason",
    body: "The dark mode is perfect for late-night writing sessions.",
    img: "https://picsum.photos/seed/mason/32",
  },
  {
    name: "Olivia",
    username: "@olivia",
    body: "This app is hands down the best blogging platform I've tried.",
    img: "https://picsum.photos/seed/olivia/32",
  },
  {
    name: "Noah",
    username: "@noah",
    body: "I love how customizable everything is!",
    img: "https://picsum.photos/seed/noah/32",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 shadow-md transition-all duration-300 transform hover:scale-105",
        // light styles
        "border-gray-200 bg-white/70 hover:bg-white",
        // dark styles
        "dark:border-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-800"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-base font-semibold text-blue-950 dark:text-gray-100">
            {name}
          </figcaption>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {username}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-base text-gray-800 dark:text-gray-300">
        {body}
      </blockquote>
    </figure>
  );
};

export function Testimonials() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg pb-16 bg-dotted-grid">
      <h2 className="text-center text-3xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-gray-200">
        <span>Our</span>
        <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-500 to-green-600 dark:from-green-300 dark:via-green-400 dark:to-green-500">
          Reviews
        </span>
      </h2>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
