import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-start min-h-screen bg-black pt-20">
      <div className="flex flex-col items-center w-full max-w-md mx-4">
        <div className="flex items-center justify-center mb-6 w-full">
          <img src="/Wellfedlogo.svg" alt="Wellfed Logo" />
        </div>

        <div className="p-4 md:p-8 rounded-lg shadow-lg w-full">
          <SignUp
            appearance={{
              variables: {
                colorPrimary: "#E97C38",
                colorBackground: "#ffffff",
                colorText: "#333333",
                fontFamily: "Arial, sans-serif",
                borderRadius: "10px",
              },
              layout: {
                logoPlacement: "none",
                socialButtonsPlacement: "top",
                termsPageUrl: "/terms",
                helpPageUrl: "/help",
                privacyPageUrl: "/privacy",
              },
              elements: {
                card: "bg-white shadow-lg",
                formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white",
                formInput: "border-gray-300 focus:border-blue-500",
              },
            }}
            additionalFields={{
              fields: [
                { label: "Full Name", id: "name", type: "text", required: true },
                { label: "Street Address", id: "street_address", type: "text", placeholder: "123 Main St", required: true },
                { label: "City", id: "city", type: "text", placeholder: "City", required: true },
                { label: "State", id: "state", type: "text", placeholder: "State", required: true },
                { label: "Zip Code", id: "zip_code", type: "text", placeholder: "12345", required: true },
                { label: "Date of Birth", id: "dob", type: "date", placeholder: "MM/DD/YYYY", required: true },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}
