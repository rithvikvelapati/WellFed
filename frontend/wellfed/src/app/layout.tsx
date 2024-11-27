import './globals.css';
import RootLayoutClient from '@/components/Dashboard/RootLayoutClient';
import ReduxProvider from '../store/ReduxProvider'; // Import ReduxProvider
import { ClerkProvider } from '@clerk/nextjs';
import SearchModal from '@/components/SearchModal';
import SampleDataLoader from '../components/common/SampleDataLoader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <ReduxProvider>
            <SampleDataLoader />
            <RootLayoutClient>{children}</RootLayoutClient>
          </ReduxProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
