import type React from 'react';
import { cn } from '../../_lib/utils';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { signInWithGoogle } from '@/app/_lib/auth/auth';

/**
 * Button component for OAuth providers
 */
const OauthProviderButton = ({
	disabled = false,
	provider,
	icon,
	handleClick,
}: {
	disabled?: boolean;
	icon: React.ReactNode;
	provider: string;
	handleClick: (...args: any[]) => any;
}) => {
	return (
		<Button
			disabled={disabled}
			type="button"
			variant="outline"
			className="w-full h-14 hover:bg-gray-100 hover:cursor-pointer"
			onClick={handleClick}
		>
			<span>{icon}</span>
			<span className="flex text-base">
				Login with&nbsp;
				<p className="font-bold">
					{provider.charAt(0).toUpperCase() + provider.slice(1)}
				</p>
			</span>
		</Button>
	);
};

/**
 * Google login button
 */
const GoogleButton = () => {
	const handleGoogleLogin = async () => {
		await signInWithGoogle();
	};

	return (
		<OauthProviderButton
			provider="google"
			icon={
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
						fill="currentColor"
					/>
				</svg>
			}
			handleClick={handleGoogleLogin}
		/>
	);
};

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	return (
		<div
			className={cn('w-96 inline-block overflow-hidden', className)}
			{...props}
		>
			<div className="flex flex-col w-full h-fit bg-accent pb-3 rounded-xl border-1 border-accent">
				<Card className="w-full h-full pt-12 justify-between border-1 border-accent rounded-xl">
					<CardHeader className="text-center">
						<CardTitle className="text-3xl text-center flex flex-col space-y-10">
							<span className="flex items-center justify-center text-nowrap">
								Sign in to&nbsp;
								<p className="font-black font-stretch-ultra-condensed">
									Lindsey's App
								</p>
							</span>
						</CardTitle>
						<CardDescription className="text-muted-foreground text-base">
							Welcome back! Please sign in to continue
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-4 mt-10">
							<GoogleButton />
						</div>
					</CardContent>
				</Card>
				<div className=" mx-8 py-2 text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  mt-4">
					By clicking continue, you agree to our{' '}
					<a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
				</div>
			</div>
		</div>
	);
}
