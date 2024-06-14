const config = {
  apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDING_ID),
  appId: String(import.meta.env.VITE_FIREBASE_APP_ID),
  databaseUrl: String(import.meta.env.VITE_FIREBASE_DATABASE_URL),
};

export default config;
