export default function ItemPreviewSkeleton() {
	return (
		<div className="flex flex-col">
			<div className="w-full h-60 animate-pulse bg-gray-300"></div>
			<div className="flex flex-col gap-2 mt-3">
				<div className="w-6/12 h-4 animate-pulse bg-gray-300" />
				<div className="w-3/12 h-5 animate-pulse bg-gray-300" />
				<div className="w-8/12 h-7 animate-pulse bg-gray-300" />
			</div>
		</div>
	);
}
