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
];

export default activities;
