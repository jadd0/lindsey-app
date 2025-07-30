'use client';

import { toast } from 'sonner';
import { createNewMessageAction } from '../_actions/messages.actions';
import { messageValidationInsertSchema } from '../_shared/validation';

import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';
import { Label } from '../_components/ui/label';

function AutoResizeTextarea({ value, onChange, ...props }) {
	const textareaRef = useRef(null);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'; // reset height first
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [value]);

	return (
		<textarea
			ref={textareaRef}
			value={value}
			onChange={onChange}
			{...props}
			style={{
				resize: 'none',
				overflow: 'hidden',
				minHeight: 80,
				...props.style,
			}}
		/>
	);
}

export default function ContactPage() {
	const [title, setTitle] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const TITLE_MAX = 75;
	const MESSAGE_MAX = 500;

	async function handleSubmit(e) {
		e.preventDefault();
		const messageData = {
			title,
			email,
			message,
		};

		try {
			const validated = messageValidationInsertSchema.safeParse(messageData);

			if (validated.error) {
				toast.error(`Please enter all fields correctly and try again`);
				return;
			}

			const response = await createNewMessageAction({ message: messageData });

			if (response.success) {
				toast.success('Message sent successfully!');
				setTitle('');
				setEmail('');
				setMessage('');
			} else {
				toast.error(`Error sending message: ${response.error}`);
			}
		} catch (error) {
			toast.error('An unexpected error occurred while sending the message.');
		}
	}

	// Single input style object
	const inputStyles =
		'w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-gray-400 transition text-base';

	return (
		<div className="w-full font-sans flex flex-col overflow-x-hidden">
			<div className="flex flex-col items-center justify-center mt-10 gap-4">
				<h1 className="text-3xl font-bold">Contact Page</h1>
				<p className='text-sm sm:text-md pl-4 pr-4'>
					Want to get in touch? Just fill out the form below and I will get in
					touch as soon as possible.
				</p>
			</div>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center gap-4 mt-8"
			>
				{/* Title/Name */}
				<div
					className="flex flex-col mb-2 w-full gap-2"
					style={{
						maxWidth: 300,
						width: 'clamp(200px, 50vw, 300px)',
					}}
				>
					<Label htmlFor="title">Title</Label>
					<input
						id="title"
						className={inputStyles}
						type="text"
						placeholder="Title"
						maxLength={TITLE_MAX}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<div className="text-xs text-right -mt-1">
						{title.length} / {TITLE_MAX}
					</div>
				</div>
				{/* Email */}
				<div
					className="flex flex-col mb-2 w-full gap-2"
					style={{
						maxWidth: 300,
						width: 'clamp(200px, 50vw, 300px)',
					}}
				>
					<Label htmlFor="email">Email</Label>
					<input
						id="email"
						className={inputStyles}
						type="email"
						placeholder="Email"
						value={email}
						autoComplete="email"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				{/* Body/Message */}
				<div
					className="flex flex-col mb-2 w-full gap-2"
					style={{
						maxWidth: 300,
						width: 'clamp(200px, 50vw, 300px)',
					}}
				>
					<Label htmlFor="body">Message</Label>
					<AutoResizeTextarea
						id="body"
						className={inputStyles + ' min-h-[80px]'}
						placeholder="Your message..."
						maxLength={MESSAGE_MAX}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<div className="text-xs text-right -mt-1">
						{message.length} / {MESSAGE_MAX}
					</div>
				</div>
				<Button type="submit" className="w-fit mt-2 bg-white text-black cursor-pointer hover:bg-gray-400">
					Send Message
				</Button>
			</form>
		</div>
	);
}
