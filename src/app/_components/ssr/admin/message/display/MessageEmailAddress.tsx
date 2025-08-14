'use client';

export default async function MessageEmailAddress({
	email,
}: {
	email: string;
}) {
	return (
		<p
			className="text-sm text-gray-500 cursor-pointer"
			onClick={async () => {
				await navigator.clipboard.writeText(email);
			}}
		>
			From: <span className="font-medium">{email}</span>
		</p>
	);
}
