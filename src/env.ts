// import { z } from 'zod';

// // Initialize environmental variables schema
// const envSchema = z.object({
// 	FIREBASE_API_KEY: z.string().min(1),
// 	FIREBASE_AUTH_DOMAIN: z.string().min(1),
// 	FIREBASE_PROJECT_ID: z.string().min(1),
// 	FIREBASE_STORAGE_BUCKET: z.string().min(1),
// 	FIREBASE_SENDER_ID: z.string().min(1),
// 	FIREBASE_APP_ID: z.string().min(1),
// 	FIREBASE_MEASUREMENT_ID: z.string().min(1),
// 	NODE_ENV: z.enum(['development', 'production']).default('development'),
// });

// // Typesafe environmental variables
// export const env = envSchema.parse(process.env);
// console.log(env)