import admin from "../firebase/admin";

export default async function handler(req: any, res: any) {
	const idToken = req.headers.authorization?.split('Bearer ')[1];
	if (!idToken) {
		return res.status(401).json({ error: 'No token provided' });
	}

	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		// User is authenticated
		return res.status(200).json({ uid: decodedToken.uid });
	} catch (error) {
		return res.status(401).json({ error: 'Invalid token' });
	}
}
