import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wellfed.myapp',
  appName: 'wellfed',
  webDir: '.next',
  bundledWebRuntime: false,
  server: {
    url: 'https://wellfed-gegagma4dwgkc6fg.eastus2-01.azurewebsites.net', // URL of your Azure App Service
    cleartext: false, // Ensure this is false for HTTPS
  },
};

export default config;
