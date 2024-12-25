'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast'; // Fixed import path
import { Github } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AuthPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();

	const handleEmailAuth = async (isSignUp: boolean) => {
		try {
			setLoading(true);
			const { error } = isSignUp
				? await supabase.auth.signUp({
						email,
						password,
						options: {
							emailRedirectTo: `${window.location.origin}/chat`,
						},
				  })
				: await supabase.auth.signInWithPassword({
						email,
						password,
				  });

			if (error) throw error;

			toast({
				title: isSignUp ? 'Check your email!' : 'Welcome back!',
				description: isSignUp
					? 'We sent you a confirmation link.'
					: 'Successfully signed in.',
			});
		} catch (error: any) {
			toast({
				variant: 'destructive',
				title: 'Error',
				description: error.message,
			});
		} finally {
			setLoading(false);
		}
	};

	const handleGithubAuth = async () => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'github',
				options: {
					redirectTo: `${window.location.origin}/chat`,
				},
			});
			if (error) throw error;
		} catch (error: any) {
			toast({
				variant: 'destructive',
				title: 'Error',
				description: error.message,
			});
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4'>
			<Card className='w-full max-w-md p-8 animate-in zoom-in duration-500'>
				<Tabs defaultValue='signin' className='space-y-6'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='signin'>Sign In</TabsTrigger>
						<TabsTrigger value='signup'>Sign Up</TabsTrigger>
					</TabsList>

					{['signin', 'signup'].map((tab) => (
						<TabsContent
							key={tab}
							value={tab}
							className='space-y-6'
						>
							<div className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='email'>Email</Label>
									<Input
										id='email'
										type='email'
										placeholder='hello@example.com'
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										className='animate-in slide-in-from-left-2'
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='password'>Password</Label>
									<Input
										id='password'
										type='password'
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
										className='animate-in slide-in-from-left-4'
									/>
								</div>
							</div>

							<div className='space-y-4'>
								<Button
									className='w-full animate-in slide-in-from-bottom-2'
									onClick={() =>
										handleEmailAuth(tab === 'signup')
									}
									disabled={loading}
								>
									{tab === 'signin' ? 'Sign In' : 'Sign Up'}
								</Button>

								<div className='relative'>
									<div className='absolute inset-0 flex items-center'>
										<div className='w-full border-t border-muted' />
									</div>
									<div className='relative flex justify-center text-xs uppercase'>
										<span className='bg-background px-2 text-muted-foreground'>
											Or continue with
										</span>
									</div>
								</div>

								<Button
									variant='outline'
									className='w-full animate-in slide-in-from-bottom-4'
									onClick={handleGithubAuth}
								>
									<Github className='mr-2 h-4 w-4' />
									Github
								</Button>
							</div>
						</TabsContent>
					))}
				</Tabs>
			</Card>
		</div>
	);
}
