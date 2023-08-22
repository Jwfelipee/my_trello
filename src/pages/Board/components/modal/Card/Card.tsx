import { useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '../../../../../components/atoms/Button';
import { Input } from '../../../../../components/atoms/Input';
import { Task } from '../../../types';
import { Body, Header, Overlay } from '../components';

interface CardModalProps {
	isOpen: boolean;
	column: string;
	onClose: () => void;
	update: Task | null;
	submit: (task: Task, column: string, id?: string) => void;
}

export function CardModal({ isOpen, column, onClose, update, submit }: CardModalProps) {
	if (!isOpen) return null;
	const [cardData, setCardData] = useState<Task | null>(update);

	const updateValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = target;
		setCardData({ ...cardData, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!cardData) return toast.error('Erro ao adicionar tarefa');
		if (!cardData.title) return toast.error('Tarefa sem título');
		submit(cardData, column, update?.id);
		onClose();
	};

	return (
		<>
			<Overlay onClose={onClose} />
			<Body
				X='large'
				Y='large'
			>
				<Header
					title={
						<HeaderCard
							title={cardData?.title}
							updateTitle={(title) => setCardData({ ...cardData, title })}
						/>
					}
					onClose={onClose}
				/>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col h-full gap-10'
				>
					<Input
						placeholder='Digite a Descrição'
						className='mt-10'
						value={cardData?.description}
						name='description'
						onChange={updateValue}
					/>
					<textarea
						placeholder='Conteúdo aqui'
						className='h-full border border-slate-500 px-2 py-1 rounded-md w-full ransition-all ease-in-out duration-300 hover:border-blue-600 focus:border-blue-600 focus:outline-none resize-none'
						value={cardData?.content}
						name='content'
						onChange={updateValue as any}
					/>
					<div className='w-full flex items-center justify-between gap-10'>
						<Button
							variant='outline-negative'
							className='w-1/3'
							type='button'
							onClick={onClose}
						>
							Cancelar
						</Button>
						<Button
							type='submit'
							className='w-1/3'
						>
							{update ? 'Atualizar' : 'Adicionar'}
						</Button>
					</div>
				</form>
			</Body>
		</>
	);
}

interface HeaderCardProps {
	title: string | null;
	updateTitle: (title: string) => void;
}

const HeaderCard = ({ title, updateTitle }: HeaderCardProps) => {
	const [focused, setFocused] = useState(false);
	const [titlePrivate, setTitlePrivate] = useState(title ?? 'Nova Tarefa');

	const onBlur = () => {
		setFocused(false);
		updateTitle(titlePrivate);
	};

	return (
		<>
			{focused ? (
				<Input
					className='border-none focus:ring-0 outline-none text-gray-700'
					value={titlePrivate}
					onChange={(e) => setTitlePrivate(e.target.value)}
					onBlur={onBlur}
					autoFocus
				/>
			) : (
				<h1
					className='px-2 py-1 bg-zinc-100 rounded-md'
					onClick={() => setFocused(true)}
				>
					{titlePrivate}
				</h1>
			)}
		</>
	);
};
