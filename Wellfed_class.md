## Wellfed_class

<p><strong>Sign In and Sign Out</strong></p>

<p>
  The project utilizes 
  <a href="https://clerk.dev/">Clerk</a> 
  to handle authentication, making the sign-in and sign-out processes secure and seamless for users.
</p>

<p><strong>Sign In:</strong></p>
<p>
  - Users can sign in using their email or social providers like Google, GitHub (if configured in Clerk).<br/>
  - The authentication system checks user credentials and manages the session, ensuring a smooth login experience.<br/>
  - Implemented with Clerk's <code>SignIn</code> component, which handles all necessary login logic.
</p>

<p><strong>Sign Out:</strong></p>
<p>
  - Users can securely sign out of their account with the <code>SignOut</code> component provided by Clerk.<br/>
  - Once signed out, the session is terminated, and the user is redirected to the appropriate page as configured.
</p>

<p>
  Both processes are integrated through Clerk’s React SDK, providing secure, ready-to-use UI components that are easy to configure and customize.
</p>






<a href="https://github.com/rithvikvelapati/WellFed/blob/main/frontend/wellfed/src/components/ui/SlideCard.tsx" target="_blank"> Slide Card </a> <p> Image Carousel with Navigational Dots, where each card has an imageUrl, title, and description.</p>


