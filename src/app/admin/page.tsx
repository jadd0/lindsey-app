import MessagePreviews from "../_components/ssr/admin/message/preview/MessagePreviews";

export default function AdminPage() {
	return (
		<div className="flex flex-col items-center">
			<h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
			<MessagePreviews />
		</div>
	);
}
