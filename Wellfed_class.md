## Wellfed_class

<p><strong>Sign In and Sign Out</strong></p>

<p>
  The project utilizes 
  <a href="https://clerk.dev/">Clerk</a> 
  to handle authentication, making the sign-in and sign-out processes secure and seamless for users.
</p>

- <p><strong>Sign In:</strong></p>
<p>
   Users can sign in using their email or social providers like Google, GitHub.<br/>
   The authentication system checks user credentials and manages the session, ensuring a smooth login experience.<br/>
   Implemented with Clerk's <strong>SignIn</strong> component, which handles all necessary login logic.
</p>

- <p><strong>Sign Out:</strong></p>
<p>
   Users can securely sign out of their account with the <strong>SignOut</strong> component provided by Clerk.<br/>
   Once signed out, the session is terminated, and the user is redirected to the appropriate page as configured.
</p>

<p>
  Both processes are integrated through Clerk’s React SDK, providing secure, ready-to-use UI components that are easy to configure and customize.
</p>
<a href="https://github.com/rithvikvelapati/WellFed/tree/feature/clerk-auth" target="_blank"> <strong>Here's the code</strong></a><br/><br/>

<p><strong>Bottom Bar and Profile Section</strong></p>
<p>
  The bottom bar now includes quick access to <strong>Camera</strong>, <strong>Search</strong>, and <strong>Profile</strong> sections.<br/>
  The Profile page allows users to edit personal details such as name, email, date of birth, gender, and more.<br/>
  Calendar picker functionality has been added for selecting the date of birth.<br/>
</p>
<a href="https://github.com/rithvikvelapati/WellFed/tree/feature/bottom-bar" target="_blank"> <strong>Here's the code</strong></a><br/><br/>

<p><strong>Side Bar</strong></p>
<p>
  This component dynamically tracks and highlights the active icon based on the current page, updates the view when an icon is clicked, and hides itself when a modal is open. It also adds smooth animations to enhance the user experience.
</p>
<a href="https://github.com/rithvikvelapati/WellFed/blob/dummy_main/frontend/wellfed/src/components/Sidebar.tsx" target="_blank"> <strong>Here's the code</strong></a><br/><br/>

<p><strong>Top Bar</strong></p>
<p>
  The TopBar hides when a modal is open, displays a clickable logo on the left, and shows global notification and cart icons on the right. It remains fixed at the top of the screen for consistent visibility while scrolling.
</p>
<a href="https://github.com/rithvikvelapati/WellFed/blob/dummy_main/frontend/wellfed/src/components/TopBar/TopBar.tsx" target="_blank"> <strong>Here's the code</strong></a><br/><br/>

<p><strong>Dashboard Section</strong></p>
<ul>
<li>
  <a href="https://github.com/rithvikvelapati/WellFed/blob/dummy_main/frontend/wellfed/src/components/Dashboard/ui/SlideShow.tsx" target="_blank"> SlideShow (News Card) </a> 
  <p> 
    It renders a slideshow using the SlideCard component. It imports the data and passes it as a prop to SlideCard for rendering. The slideshow is wrapped in a container with rounded corners for styling purposes.
  </p>
</li>

<li>
  <a href="https://github.com/rithvikvelapati/WellFed/blob/dummy_main/frontend/wellfed/src/components/Dashboard/ui/SuggestedRecipes.tsx" target="_blank"> Suggested Recipes </a> 
</li>
<p>
  It displays a scrollable list of recipe cards, where users can mark recipes as favorites or bookmarks. It updates the list dynamically as these actions are toggled, allowing users to interact with each recipe.
</p>
<li>
  <a href="https://github.com/rithvikvelapati/WellFed/blob/dummy_main/frontend/wellfed/src/components/Dashboard/ui/FeaturedMedia.tsx"> Featured Media </a>
  <p>
    It renders a responsive video embedded using an iframe. It accepts a videoUrl prop and ensures the video is properly styled with a 16:9 aspect ratio using absolute positioning within a container. The component allows fullscreen playback and other media controls
  </p>
</li>

<li>
  <a href="https://github.com/rithvikvelapati/WellFed/blob/dummy_main/frontend/wellfed/src/components/Dashboard/ui/DiscoverEvents.tsx" target="_blank"> Discover Events </a>
  <p>
    It displays events in a horizontal scroll container, allowing users to toggle bookmarks. It manages event data through state and renders each event using EventCard.
  </p>
</li>
  
</ul>




<p><strong>Reusable Components :</strong></p>
<ul>
<li>
  <a href="https://github.com/rithvikvelapati/WellFed/blob/main/frontend/wellfed/src/components/ui/SlideCard.tsx" target="_blank"> Slide Card </a> 
  <p> 
    Image Carousel with Navigational Dots, where each card has an imageUrl, title, and description.
  </p>
</li>

<li>
  <a href="https://github.com/rithvikvelapati/WellFed/blob/dummy_main/frontend/wellfed/src/components/AutoScrollText.tsx" target="_blank"> Auto-Scroll Text </a> 
</li>
<p>
  It displays text and scrolls it if it’s longer than 15 characters when focused. It shows a truncated version otherwise. Gradient overlays appear on focus, and it uses Tailwind CSS for styling.
</p>
<li>
  <a href="https://github.com/rithvikvelapati/WellFed/blob/dummy_main/frontend/wellfed/src/components/RecipeCard.tsx" target="_blank"> Recipe Card </a>
  <p>
    It displays recipe details (image, title, rating, time) with toggleable favorite and bookmark icons. It handles focus for visual effects and is styled using Tailwind CSS, making it easily adaptable for various recipe data inputs.
  </p>
</li>

<li>
  <a href="https://github.com/rithvikvelapati/WellFed/blob/dummy_main/frontend/wellfed/src/components/EventCard.tsx" target="_blank"> Event Card </a>
  <p>
    It displays an event's image, title, rating (with stars), and bookmark icon. It allows toggling the bookmark status.
  </p>
</li>
  
</ul>


