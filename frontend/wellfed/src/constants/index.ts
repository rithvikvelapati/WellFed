export const sidebarIcons = [
  { name: "home", label: "Home", src: "/Home.svg", path: "/" },
  {
    name: "add-friend",
    label: "Add Friend",
    src: "/AddFriend.svg",
    path: "/friends-section"
  },
  {
    name: "messages",
    label: "Messages",
    src: "/Message.svg",
    path: "/messages-section"
  },
  {
    name: "calendar",
    label: "Calendar",
    src: "/Calendar.svg",
    path: "/calendar-section"
  },
  { name: "groups", label: "Groups", src: "/Groups.svg", path: "/groups-section" },
  { name: "tickets", label: "Tickets", src: "/Ticket.svg", path: "/events-section" },
  {
    name: "food",
    label: "Food",
    src: "/Food.svg",
    path: "/food-section/recipe-list"
  },
  { name: "cog", label: "Settings", src: "/Cog.svg", path: "/settings" }
];

export const slidesData = [
  {
    imageUrl: "/slide1.jpg",
    title: "Delicious Salad",
    description:
      "A healthy green salad to keep you energized throughout the day."
  },
  {
    imageUrl: "/slide2.jpg",
    title: "Spicy Noodles",
    description:
      "Savor the taste of these spicy noodles, cooked with fresh ingredients."
  },
  {
    imageUrl: "/slide3.jpg",
    title: "Refreshing Smoothie",
    description: "Cool off with a refreshing smoothie made from fresh fruits."
  }
];

export const recipesData = [
  {
    id: 1,
    title:
      "Chicken Alfredo Chicken Alfredo Chicken Alfredo Chicken Alfredo Chicken Alfredo",
    imageUrl: "/CA.jpg",
    time: "30min",
    cost: "$$",
    rating: 4,
    reviews: 23,
    favorited: false,
    bookmarked: false,
    handle: "@ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  },
  {
    id: 2,
    title: "Chicken Biryani",
    imageUrl: "/CB.jpg",
    time: "45min",
    cost: "$$",
    rating: 4.5,
    reviews: 12,
    favorited: false,
    bookmarked: false,
    handle: "@AriNosoKitchen"
  },
  {
    id: 3,
    title: "Karelian Pie",
    imageUrl: "/KP.jpg",
    time: "20min",
    cost: "$",
    rating: 4,
    reviews: 8,
    favorited: false,
    bookmarked: false,
    handle: "@AriNosoKitchen"
  },
  {
    id: 4,
    title: "Mushroom Risotto",
    imageUrl: "/MR.jpg",
    time: "40min",
    cost: "$$",
    rating: 4,
    reviews: 30,
    favorited: false,
    bookmarked: false,
    handle: "@AriNosoKitchen"
  },
  {
    id: 1,
    title:
      "Chicken Alfredo Chicken Alfredo Chicken Alfredo Chicken Alfredo Chicken Alfredo",
    imageUrl: "/CA.jpg",
    time: "30min",
    cost: "$$",
    rating: 4,
    reviews: 23,
    favorited: false,
    bookmarked: false,
    handle: "@ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  },
  {
    id: 2,
    title: "Chicken Biryani",
    imageUrl: "/CB.jpg",
    time: "45min",
    cost: "$$",
    rating: 4.5,
    reviews: 12,
    favorited: false,
    bookmarked: false,
    handle: "@AriNosoKitchen"
  },
  {
    id: 3,
    title: "Karelian Pie",
    imageUrl: "/KP.jpg",
    time: "20min",
    cost: "$",
    rating: 4,
    reviews: 8,
    favorited: false,
    bookmarked: false,
    handle: "@AriNosoKitchen"
  },
  {
    id: 4,
    title: "Mushroom Risotto",
    imageUrl: "/MR.jpg",
    time: "40min",
    cost: "$$",
    rating: 4,
    reviews: 30,
    favorited: false,
    bookmarked: false,
    handle: "@AriNosoKitchen"
  },
  {
    id: 1,
    title:
      "Chicken Alfredo Chicken Alfredo Chicken Alfredo Chicken Alfredo Chicken Alfredo",
    imageUrl: "/CA.jpg",
    time: "30min",
    cost: "$$",
    rating: 4,
    reviews: 23,
    favorited: false,
    bookmarked: false,
    handle: "@ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  },
  {
    id: 2,
    title: "Chicken Biryani",
    imageUrl: "/CB.jpg",
    time: "45min",
    cost: "$$",
    rating: 4.5,
    reviews: 12,
    favorited: false,
    bookmarked: false,
    handle: "@AriNosoKitchen"
  },
  {
    id: 3,
    title: "Karelian Pie",
    imageUrl: "/KP.jpg",
    time: "20min",
    cost: "$",
    rating: 4,
    reviews: 8,
    favorited: false,
    bookmarked: false,
    handle: "@AriNosoKitchen"
  },
  {
    id: 4,
    title: "Mushroom Risotto",
    imageUrl: "/MR.jpg",
    time: "40min",
    cost: "$$",
    rating: 4,
    reviews: 30,
    favorited: false,
    bookmarked: false,
    handle: "@AriNosoKitchen"
  }
];

export const eventsData = [
  {
    id: 1,
    title: "SF Night Grille",
    imageUrl: "/SF.svg",
    rating: 5,
    bookmarked: false
  },
  {
    id: 2,
    title: "Beach BBQ Bash",
    imageUrl: "/SF.svg",
    rating: 4,
    bookmarked: true
  },
  {
    id: 3,
    title: "SF Night Grille",
    imageUrl: "/SF.svg",
    rating: 5,
    bookmarked: false
  },
  {
    id: 4,
    title: "Beach BBQ Bash",
    imageUrl: "/SF.svg",
    rating: 4,
    bookmarked: false
  },
  {
    id: 5,
    title: "SF Night Grille",
    imageUrl: "/SF.svg",
    rating: 5,
    bookmarked: false
  },
  {
    id: 6,
    title: "Beach BBQ Bash",
    imageUrl: "/SF.svg",
    rating: 4,
    bookmarked: false
  },
  {
    id: 7,
    title: "SF Night Grille",
    imageUrl: "/SF.svg",
    rating: 5,
    bookmarked: false
  },
];

export interface Category {
  id: number;
  name: string;
  recipeCount: number;
  image: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Appetizers",
    recipeCount: 324,
    image: "/appetizers.png"
  },
  {
    id: 2,
    name: "Breakfast",
    recipeCount: 440,
    image: "/breakfast.png"
  },
  {
    id: 3,
    name: "Lunch",
    recipeCount: 430,
    image: "/lunch.png"
  },
  {
    id: 4,
    name: "Dinner",
    recipeCount: 515,
    image: "/dinner.png"
  },
  {
    id: 5,
    name: "Desserts",
    recipeCount: 230,
    image: "/desserts.png"
  },
  {
    id: 6,
    name: "Beverages",
    recipeCount: 350,
    image: "/beverages.png"
  },
  {
    id: 7,
    name: "Snacks",
    recipeCount: 200,
    image: "/snack.png"
  }
  // Add more categories as needed
];

export interface PreparationTimeOption {
  id: number;
  label: string;
  value: number; // This could represent minutes or a code
}

export const preparationTimeOptions: PreparationTimeOption[] = [
  {
    id: 1,
    label: "Under 15 minutes",
    value: 15
  },
  {
    id: 2,
    label: "Under 30 minutes",
    value: 30
  },
  {
    id: 3,
    label: "Under 45 minutes",
    value: 45
  },
  {
    id: 4,
    label: "Over 60 minutes",
    value: 60 // You might use a special value to indicate "over"
  }
];

export const recipeCard = {
  videoSrc: "/demo-video.mp4",
  category: "Breakfast",
  title: "Patty Melt Beef Garlic Aioli Herb Butter",
  rating: 4.2,
  ratingsCount: 349,
  likes: 347,
  profilePic: "/amandapic.svg",
  name: "Amanda Lockwood",
  recipes: "746",
  location: "London",
  description:
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
};

export const recipeTimes = [{ name: "Cooking", time: 40 }];

export const initialServings = 4;

export const initialIngredients = [
  { name: "beef (sirloin)", quantity: 450, unit: "g" },
  { name: "broccoli", quantity: 400, unit: "g" },
  { name: "soy sauce", quantity: 6, unit: "tbsp" },
  { name: "lime (juice)", quantity: 1, unit: "" },
  { name: "beef stock", quantity: 200, unit: "ml" },
  { name: "cane sugar", quantity: 2, unit: "tbsp" },
  { name: "cornstarch", quantity: 1.5, unit: "tbsp" },
  { name: "ginger", quantity: 10, unit: "g" },
  { name: "garlic", quantity: 2, unit: "cloves" },
  { name: "chili", quantity: 1, unit: "" },
  { name: "green onions", quantity: 3, unit: "" }
];

export const tools = [
  "Cutting board",
  "Chef’s knife",
  "Mixing bowls",
  "Whisk",
  "Frying pan",
  "Spatula"
];

export const steps = [
  "Cut the beef into thin slices.",
  "Chop the broccoli into small florets.",
  "Mix soy sauce, lime juice, and beef stock in a bowl.",
  "Heat a frying pan over medium-high heat and add the beef.",
  "Stir-fry the beef until browned, then remove from the pan.",
  "In the same pan, add the broccoli and stir-fry for a few minutes.",
  "Add the sauce mixture and bring to a simmer.",
  "Return the beef to the pan and stir until heated through.",
  "Serve hot with garnished green onions."
];

export const nutritionData = {
  calories: 650,
  protein: "36g",
  fat: "47g",
  carbs: "21g"
};

export const reviewSummary = {
  imagesCount: 12,
  commentsCount: 37
};

export const reviews = [
  {
    id: 1,
    username: "Sri Wedari Soekarno",
    avatar: "/amandapic.svg",
    rating: 5,
    time: "15 minutes ago",
    comment:
      "Delicious! Is there any way to make this baby/toddler friendly but still taste nice? I’m trying to avoid salt (soya sauce) and sugar, not sure how it will taste without it.",
    images: ["/CA.jpg", "/CB.jpg", "/KP.jpg"]
  }
];


export interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
  time: string;
  cost: string;
  rating: number;
  reviews: number;
  favorited: boolean;
  bookmarked: boolean;
  handle: string;
}

