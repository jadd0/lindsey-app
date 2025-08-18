import Link from 'next/link';
import MessagePreviews from '../_components/ssr/admin/message/preview/MessagePreviews';
import { ArrowRight } from 'lucide-react';

export default function AdminPage() {
	return (
		<div className="flex flex-col gap-10 items-center">
			<div className="">
				<h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
				<MessagePreviews />
			</div>

			<Link href={'/admin/createItem'}>
				<div className="flex flex-row gap-2 items-center">
					<h1 className="text-3xl font-bold">Create New Item</h1>
					<ArrowRight />
				</div>
			</Link>

			<Link href={'/admin/editItem'}>
				<div className="flex flex-row gap-2 items-center">
					<h1 className="text-3xl font-bold">Edit An Item</h1>
					<ArrowRight />
				</div>
			</Link>
		</div>
	);
}
