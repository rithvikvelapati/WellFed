import './globals.css';
import RootLayoutClient from '../components/Dashboard/RootLayoutClient';
import SearchOverlayManager from "../components/SearchOverlay/SearchOverlayManager";
import { ModalProvider } from '@/context/ModalContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
    <html lang="en">
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
        <SearchOverlayManager />
      </body>
    </html>
    </ModalProvider>
  );
}
