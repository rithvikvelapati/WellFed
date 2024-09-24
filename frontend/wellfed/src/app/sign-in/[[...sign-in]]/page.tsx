import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center items-start min-h-screen bg-black pt-20"> {/* Entire background is black and sign-in card moves up */}
      {/* Container for the logo and sign-in card */}
      <div className="flex flex-col items-center w-full max-w-md mx-4">
        {/* Wellfed Logo */}
        <div className="flex items-center justify-center mb-6 w-full">
          <img src="/Wellfedlogo.svg" alt="Wellfed Logo"  />
        </div>

        {/* Clerk's SignIn Component */}
        <div className="p-4 md:p-8 rounded-lg shadow-lg w-full"> {/* Card wrapper with white background */}
          <SignIn
          appearance={{
            variables: {
              colorPrimary: "#E97C38", // Primary button color (orange)
              colorBackground: "#ffffff", // Set the sign-in card background to white
              colorText: "#333333", // Text color
              fontFamily: "Arial, sans-serif", // Font family
              borderRadius: "10px", // Rounded corners for buttons and input fields
            },
            layout: {
              logoPlacement: "none", // Disable Clerk's default logo
              socialButtonsPlacement: "top", // Position of social buttons
              termsPageUrl: "/terms", // URL for the Terms link
              helpPageUrl: "/help", // URL for the Help link
              privacyPageUrl: "/privacy", // URL for the Privacy link
            },
            elements: {
              card: "bg-white shadow-lg",  // Ensure the card background is explicitly white
              formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white", // Button styling
              formInput: "border-gray-300 focus:border-blue-500", // Input styling
            },
          }} />
        </div>

      </div>
    </div>
  );
}
