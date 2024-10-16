import './globals.css';
import RootLayoutClient from '@/components/Dashboard/RootLayoutClient';
import SearchOverlayManager from '@/components/SearchOverlay/SearchOverlayManager';
import RecipeCardLayout from "../components/RecipeCard/RecipeCardLayout";
import ReduxProvider from '../store/ReduxProvider'; // Import ReduxProvider

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <RootLayoutClient>{children}</RootLayoutClient>
          <SearchOverlayManager />
        </ReduxProvider>
      </body>
    </html>
  );
}
