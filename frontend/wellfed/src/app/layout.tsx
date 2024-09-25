import './globals.css';
import RootLayoutClient from '../components/Dashboard/RootLayoutClient';
import SearchOverlayManager from "../components/SearchOverlay/SearchOverlayManager";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
        <SearchOverlayManager />
      </body>
    </html>
  );
}
