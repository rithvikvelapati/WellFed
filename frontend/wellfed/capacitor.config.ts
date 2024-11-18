import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wellfed.myapp',
  appName: 'wellfed',
  webDir: '.next',
  server: {
    url: 'http://192.168.1.194:3000', // Your local IP address
    cleartext: true, // Ensure this is true for HTTP during development
  },
};

export default config;
