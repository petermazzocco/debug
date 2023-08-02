import habit from "../public/img/habit.png";

interface Activity {
  name: string;
  bio: string;
  image: string;
  link: string;
}

export const activities: Activity[] = [
  {
    name: "Relief Journal",
    bio: "Talk about your day, reflect on your thoughts, and express your gratitude. Keep track of your daily activities and emotions in your own personal journal.",
    image: "https://www.nicepng.com/png/detail/926-9267945_newspaper-emoji.png",
    link: "/activities/journal",
  },
  {
    name: "Habit Tracking",
    bio: "Track your habits and keep yourself accountable. Create new habits and break old ones. Build a better you.",
    image:
      "https://media.discordapp.net/attachments/997264415206412328/1136110731255885946/itspm.eth_a_cartoonish_cute_book_that_tracks_habits_on_a_white__d05d4f04-c2a2-4fff-919c-67855099f626.png?width=970&height=970",
    link: "/activities/habit",
  },
  {
    name: "Color The World",
    bio: "Unwind with coloring pages featuring intricate patterns and beautiful designs. Experience the therapeutic benefits of art and color.",
    image:
      "https://media.discordapp.net/attachments/997264415206412328/1136113275684257874/itspm.eth_a_bunch_of_paint_brushes_coloring_on_a_white_backgrou_97aba903-918d-465d-b4c5-286f0d39085f.png?width=970&height=970",
    link: "/activities/coloring",
  },
  {
    name: "Mindful Puzzle Solving",
    bio: "Engage your mind in solving peaceful puzzles with stunning landscapes and scenes. Focus on the present moment and enjoy the process.",
    image: "https://demofree.sirv.com/nope-not-here.jpg",
    link: "/activities/puzzle",
  },
];

export default activities;
