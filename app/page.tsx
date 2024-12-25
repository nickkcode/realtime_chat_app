'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { LogOut, Send, Smile } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ChatPage() {
	const [messages, setMessages] = useState<any[]>([]);
	const [newMessage, setNewMessage] = useState('');
	const [user, setUser] = useState<any>(null);
	const router = useRouter();
	const { toast } = useToast();

	useEffect(() => {
		const checkUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) {
				router.push('/auth');
				return;
			}
			setUser(user);

			// Subscribe to new messages
			const channel = supabase
				.channel('messages')
				.on(
					'postgres_changes',
					{
						event: 'INSERT',
						schema: 'public',
						table: 'messages',
					},
					(payload) => {
						setMessages((prev) => [...prev, payload.new]);
					}
				)
				.subscribe();

			return () => {
				supabase.removeChannel(channel);
			};
		};

		checkUser();
	}, [router]);

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.push('/');
	};

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newMessage.trim()) return;

		try {
			const { error } = await supabase.from('messages').insert({
				content: newMessage,
				profile_id: user.id,
				chat_id: 'general', // Using a default chat room for simplicity
			});

			if (error) throw error;
			setNewMessage('');
		} catch (error: any) {
			toast({
				variant: 'destructive',
				title: 'Error',
				description: error.message,
			});
		}
	};

	return (
		<div className='flex flex-col h-screen bg-background'>
			<header className='border-b p-4 flex justify-between items-center'>
				<h1 className='text-xl font-bold'>Chatterbox</h1>
				<Button variant='ghost' size='icon' onClick={handleSignOut}>
					<LogOut className='h-5 w-5' />
				</Button>
			</header>

			<ScrollArea className='flex-1 p-4'>
				<div className='space-y-4'>
					{messages.map((message) => (
						<Card
							key={message.id}
							className={`p-4 max-w-[80%] animate-in slide-in-from-bottom-2 ${
								message.profile_id === user?.id
									? 'ml-auto bg-primary text-primary-foreground'
									: 'mr-auto'
							}`}
						>
							<div className='flex items-start gap-3'>
								<Avatar>
									<AvatarImage
										src={`https://avatar.vercel.sh/${message.profile_id}`}
									/>
									<AvatarFallback>
										{message.profile_id
											.slice(0, 2)
											.toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className='text-sm font-medium'>
										{message.profile_id === user?.id
											? 'You'
											: 'User'}
									</p>
									<p>{message.content}</p>
								</div>
							</div>
						</Card>
					))}
				</div>
			</ScrollArea>

			<form onSubmit={handleSendMessage} className='p-4 border-t'>
				<div className='flex gap-2'>
					<Button variant='outline' size='icon' type='button'>
						<Smile className='h-5 w-5' />
					</Button>
					<Input
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder='Type a message...'
						className='flex-1'
					/>
					<Button type='submit' size='icon'>
						<Send className='h-5 w-5' />
					</Button>
				</div>
			</form>
		</div>
	);
}
