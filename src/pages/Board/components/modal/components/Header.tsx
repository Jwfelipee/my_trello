import { X } from 'react-feather';

export interface HeaderProps {
	title: string | JSX.Element;
	onClose: () => void;
}

export function Header({ title, onClose }: HeaderProps) {
	return (
		<div className='h-8 flex items-center justify-between'>
			<h1 className='w-fit whitespace-nowrap'>{title}</h1>
			<button
				type='button'
				onClick={onClose}
				className='rounded-full w-8 h-8 shadow-lg flex items-center justify-center hover:shadow-lg hover:pb-0.5 transition ease-in-out duration-150'
			>
				<X />
			</button>
		</div>
	);
}
