import { ButtonHTMLAttributes } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: keyof typeof handlerVariant;
}
const handlerVariant = {
	primary: 'bg-primary hover:bg-primary text-white',
	secondary: 'bg-secondary hover:bg-secondary',
	outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
	'outline-secondary': 'border border-secondary text-secondary hover:bg-secondary hover:text-white',
	ghost: 'text-primary hover:bg-primary hover:text-white',
	'ghost-secondary': 'text-secondary hover:bg-secondary hover:text-white',
	negative: 'bg-red-500 hover:bg-red-600 text-white',
	'outline-negative': 'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
	custom: '',
};

export const Button = ({ children, variant = 'primary', className, ...rest }: IButton) => {
	return (
		<button
			className={`w-2/3 h-10 brightness-100 hover:brightness-90 hover:shadow-lg transition-all ease-in-out duration-300 rounded-md ${handlerVariant[variant]} ${className} ${
				rest.disabled ? 'opacity-50 cursor-not-allowed bg-gray-300' : ''
			}`}
			{...rest}
		>
			{children}
		</button>
	);
};
