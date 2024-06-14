import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import config from "../config/db.config";

const firebaseConfig = config;

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase();
