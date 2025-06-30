import React, { useCallback, useMemo } from 'react';
import { FileUploader, FileInput } from '@/components/ui/file-upload';
import { ImagePlus, Trash2, X } from 'lucide-react';
import { IMAGE_UPLOAD_CONFIG } from '@/app/shared/constants';
import { Button } from '@/components/ui/button';
import imageCompression from 'browser-image-compression';

interface MultipleImageUploaderProps {
	files: File[];
	onFilesChange: (files: File[]) => void;
	maxFiles?: number;
	disabled?: boolean;
	className?: string;
}

export function MultipleImageUploader({
	files,
	onFilesChange,
	maxFiles = 10,
	disabled = false,
	className = '',
}: MultipleImageUploaderProps) {
	// Generate preview URLs for the images
	const imagePreviewUrls = useMemo(() => {
		return files.map((file) => URL.createObjectURL(file));
	}, [files]);

	// Cleanup effect for the preview URLs
	React.useEffect(() => {
		return () => {
			imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [imagePreviewUrls]);

	// Compress a single image file
	const compressImage = useCallback(async (file: File): Promise<File> => {
		try {
			const options = {
				maxSizeMB: 2, // Maximum size in MB
				maxWidthOrHeight: 1920, // Max width or height
				useWebWorker: true,
			};
			const compressedFile = await imageCompression(file, options);
			return compressedFile;
		} catch (error) {
			console.error('Error compressing image:', error);
			return file; // fallback to original file
		}
	}, []);

	// Handle file selection with compression
	const handleFilesChange = useCallback(
		async (newFiles: File[] | null) => {
			if (!newFiles) return;

			const totalFiles = files.length + newFiles.length;
			let filesToProcess: File[];

			if (totalFiles > maxFiles) {
				// Take only the files that fit within the limit
				const availableSlots = maxFiles - files.length;
				filesToProcess = newFiles.slice(0, availableSlots);
			} else {
				filesToProcess = newFiles;
			}

			// Compress all files in parallel
			try {
				const compressedFiles = await Promise.all(
					filesToProcess.map((file) => compressImage(file))
				);
				onFilesChange([...files, ...compressedFiles]);
			} catch (error) {
				console.error('Error processing files:', error);
				// Fallback to original files if compression fails
				onFilesChange([...files, ...filesToProcess]);
			}
		},
		[files, maxFiles, onFilesChange, compressImage]
	);

	// Remove a specific file
	const removeFile = useCallback(
		(index: number) => {
			const newFiles = files.filter((_, i) => i !== index);
			onFilesChange(newFiles);
		},
		[files, onFilesChange]
	);

	// Clear all files
	const clearAllFiles = useCallback(() => {
		onFilesChange([]);
	}, [onFilesChange]);

	const hasFiles = files.length > 0;
	const canAddMore = files.length < maxFiles;

	return (
		<div className={`space-y-4 ${className}`}>
			{/* Upload Area */}
			{canAddMore && (
				<FileUploader
					value={[]}
					onValueChange={handleFilesChange}
					dropzoneOptions={{
						...IMAGE_UPLOAD_CONFIG,
						maxFiles: maxFiles - files.length,
						multiple: true, // Enable multiple file selection
					}}
					className="w-full p-0.5"
					disabled={disabled}
				>
					<FileInput className="w-full overflow-hidden flex flex-col items-center justify-center border-dashed border-2 border-gray-300 hover:border-blue-400 p-8 rounded-lg transition-all duration-200 bg-gray-50 hover:bg-blue-50">
						<div className="w-full rounded-xl flex flex-col gap-3 items-center justify-center">
							<div className="p-4 bg-blue-100 rounded-full">
								<ImagePlus className="text-blue-500 w-8 h-8" />
							</div>
							<p className="mb-1 text-sm text-gray-700">
								<span className="font-semibold text-blue-600">
									Click to upload
								</span>{' '}
								or drag and drop
							</p>
							<p className="text-xs text-gray-500">
								PNG, JPG or GIF (max. 20MB each)
							</p>
							<p className="text-xs text-gray-400">
								{files.length} of {maxFiles} files selected
							</p>
							<p className="text-xs text-blue-500 font-medium">
								Hold Ctrl/Cmd to select multiple files
							</p>
						</div>
					</FileInput>
				</FileUploader>
			)}

			{/* File Previews */}
			{hasFiles && (
				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<h3 className="text-sm font-medium text-gray-700">
							Selected Files ({files.length}/{maxFiles})
						</h3>
						<Button
							variant="outline"
							size="sm"
							onClick={clearAllFiles}
							disabled={disabled}
							className="cursor-pointer"
						>
							<Trash2 className="w-4 h-4 mr-1" />
							Clear All
						</Button>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{files.map((file, index) => (
							<div
								key={`${file.name}-${index}`}
								className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
							>
								<img
									src={imagePreviewUrls[index]}
									alt={`Preview ${index + 1}`}
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>

								{/* Overlay with file info and remove button */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-2">
									<button
										type="button"
										onClick={() => removeFile(index)}
										className="self-end bg-white/20 backdrop-blur-sm hover:bg-red-500 text-white rounded-full p-1 transition-colors duration-200"
										disabled={disabled}
									>
										<X className="w-4 h-4" />
									</button>

									<div className="text-white text-xs">
										<p className="truncate font-medium">{file.name}</p>
										<p className="text-white/80">
											{(file.size / 1024 / 1024).toFixed(2)} MB
										</p>
									</div>
								</div>

								{/* Loading overlay for disabled state */}
								{disabled && (
									<div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
										<div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white"></div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
