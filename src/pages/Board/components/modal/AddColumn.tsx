import { useState } from 'react';
import { X } from 'react-feather';
import { toast } from 'react-toastify';

import { Button } from '../../../../components/atoms/Button';
import { Input } from '../../../../components/atoms/Input';
import { Body, Header, Overlay } from './components';

interface ModalAddColumnProps {
	isOpen: boolean;
	onClose: () => void;
	addColumn: (title: string) => void;
}

export function ModalAddColumn({ isOpen, onClose, addColumn }: ModalAddColumnProps) {
	if (!isOpen) return null;
	const [title, setTitle] = useState('');

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!title) return toast.error('Preencha o campo de título');
		addColumn(title?.trim());
		onClose();
	};

	return (
		<>
			<Overlay onClose={onClose} />
			<Body
				X='small'
				Y='xsmall'
			>
				<Header
					title='Adicionar coluna'
					onClose={onClose}
				/>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col justify-between h-full'
				>
					<div className='flex flex-col justify-center gap-10 h-full'>
						<Input
							label='Nome da coluna'
							placeholder='Digite o Nome da coluna'
							value={title}
							onChange={(event) => {
								const { value } = event.target;
								const rgx = /[^a-zA-Z\s]/g;
								const keepOnlyLettersAndSpaces = value.replace(rgx, '');
								setTitle(keepOnlyLettersAndSpaces);
							}}
							required
							type='text'
						/>
					</div>
					<div className='w-full flex items-center justify-between gap-10'>
						<Button
							variant='outline-negative'
							className='w-1/3'
							type='button'
						>
							Cancelar
						</Button>
						<Button
							type='submit'
							className='w-1/3'
						>
							Adicionar
						</Button>
					</div>
				</form>
			</Body>
		</>
	);
}
