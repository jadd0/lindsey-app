import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: './.env.local', debug: true, encoding: 'utf8' });

// Initialise environmental variables schema
const envSchema = z.object({
	FIREBASE_API_KEY: z.string().min(1),
	FIREBASE_AUTH_DOMAIN: z.string().min(1),
	FIREBASE_PROJECT_ID: z.string().min(1),
	FIREBASE_STORAGE_BUCKET: z.string().min(1),
	FIREBASE_SENDER_ID: z.string().min(1),
	FIREBASE_APP_ID: z.string().min(1),
	FIREBASE_MEASUREMENT_ID: z.string().min(1),
	NODE_ENV: z.enum(['development', 'production']).default('development'),
});

// Typesafe environmental variables
export const env = (() => {
	try {
		const parsed = envSchema.parse(process.env);

		console.log('ENVIRONMENT:', parsed.NODE_ENV);

		return parsed;
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error(
				`INVALID ENV: [\n${error.errors
					.map((e) => `\t'${e.path}' - ${e.message}`)
					.join(',\n')}\n]`
			);
		} else throw error;
	}
})();
