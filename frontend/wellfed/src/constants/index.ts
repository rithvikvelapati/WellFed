export const sidebarIcons = [
    { name: 'home', label: 'Home', src: '/Home.svg', path: '/' },
    { name: 'add-friend', label: 'Add Friend', src: '/AddFriend.svg', path: '/add-friend' },
    { name: 'messages', label: 'Messages', src: '/Message.svg', path: '/messages' },
    { name: 'calendar', label: 'Calendar', src: '/Calendar.svg', path: '/calendar-section' },
    { name: 'groups', label: 'Groups', src: '/Groups.svg', path: '/groups' },
    { name: 'tickets', label: 'Tickets', src: '/Ticket.svg', path: '/tickets' },
    { name: 'food', label: 'Food', src: '/Food.svg', path: '/food-section/recipe-list' },
    { name: 'cog', label: 'Settings', src: '/Cog.svg', path: '/cog' },
  ];

export const slidesData = [
    {
      imageUrl: '/slide1.jpg',
      title: 'Delicious Salad',
      description: 'A healthy green salad to keep you energized throughout the day.',
    },
    {
      imageUrl: '/slide2.jpg',
      title: 'Spicy Noodles',
      description: 'Savor the taste of these spicy noodles, cooked with fresh ingredients.',
    },
    {
      imageUrl: '/slide3.jpg',
      title: 'Refreshing Smoothie',
      description: 'Cool off with a refreshing smoothie made from fresh fruits.',
    },
  ];

export const recipesData = [
    { id: 1, title: "Chicken Alfredo", imageUrl: "/CA.jpg", time: "30min", cost: "$$", rating: 4, reviews: 23, favorited: false, bookmarked: false, handle: "@AriNosoKitchen" },
    { id: 2, title: "Chicken Biryani", imageUrl: "/CB.jpg", time: "45min", cost: "$$", rating: 4.5, reviews: 12, favorited: false, bookmarked: false, handle: "@AriNosoKitchen" },
    { id: 3, title: "Karelian Pie", imageUrl: "/KP.jpg", time: "20min", cost: "$", rating: 4, reviews: 8, favorited: false, bookmarked: false, handle: "@AriNosoKitchen" },
    { id: 4, title: "Mushroom Risotto", imageUrl: "/MR.jpg", time: "40min", cost: "$$", rating: 4, reviews: 30, favorited: false, bookmarked: false, handle: "@AriNosoKitchen" },
  ];

export const eventsData = [
    { id: 1, title: "SF Night Grille", imageUrl: "/SF.svg", rating: 5, bookmarked: false, priceLevel: 3 },
    { id: 2, title: "Beach BBQ Bash", imageUrl: "/SF.svg", rating: 4, bookmarked: false, priceLevel: 2 },
    { id: 3, title: "SF Night Grille", imageUrl: "/SF.svg", rating: 5, bookmarked: false, priceLevel: 3 },
    { id: 4, title: "Beach BBQ Bash", imageUrl: "/SF.svg", rating: 4, bookmarked: false, priceLevel: 2 },
    { id: 5, title: "SF Night Grille", imageUrl: "/SF.svg", rating: 5, bookmarked: false, priceLevel: 3 },
    { id: 6, title: "Beach BBQ Bash", imageUrl: "/SF.svg", rating: 4, bookmarked: false, priceLevel: 2 },
    { id: 7, title: "SF Night Grille", imageUrl: "/SF.svg", rating: 5, bookmarked: false, priceLevel: 3 },
    { id: 8, title: "Beach BBQ Bash", imageUrl: "/SF.svg", rating: 4, bookmarked: false, priceLevel: 2 },
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
    name: 'Appetizers',
    recipeCount: 324,
    image: '/appetizers.png',
  },
  {
    id: 2,
    name: 'Breakfast',
    recipeCount: 440,
    image: '/breakfast.png',
  },
  {
    id: 3,
    name: 'Lunch',
    recipeCount: 430,
    image: '/lunch.png',
  },
  {
    id: 4,
    name: 'Dinner',
    recipeCount: 515,
    image: '/dinner.png',
  },
  {
    id: 5,
    name: 'Desserts',
    recipeCount: 230,
    image: '/desserts.png',
  },
  {
    id: 6,
    name: 'Beverages',
    recipeCount: 350,
    image: '/beverages.png',
  },
  {
    id: 7,
    name: 'Snacks',
    recipeCount: 200,
    image: '/snack.png',
  }
  // Add more categories as needed
];
