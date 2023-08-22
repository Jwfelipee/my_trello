import { useState } from 'react';

import { Eye } from '../icons/Eye';
import { NotEye } from '../icons/NotEye';

/* eslint-disable */
interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
	ref?: any;
	label?: string;
}

export const Input: React.FC<IInput> = ({ label, type, ref, className, ...rest }) => {
	const [currentType, setCurrentType] = useState(type);

	return (
		<div className='flex flex-col w-full gap-1'>
			{label && <label>{label}</label>}
			<div className='flex relative'>
				<input
					className={`
						border border-slate-500 px-2 py-1 rounded-md w-full h-10 transition-all ease-in-out duration-300 hover:border-blue-600 focus:border-blue-600 focus:outline-none
						${className}
					`}
					type={currentType}
					ref={ref}
					{...rest}
				/>
				{type === 'password' && (
					<button
						type='button'
						className='text-slate-500 text-sm font-semibold absolute right-1 top-2'
						onClick={() => {
							setCurrentType(currentType === 'password' ? 'text' : 'password');
						}}
					>
						{currentType === 'password' ? <Eye /> : <NotEye />}
					</button>
				)}
			</div>
		</div>
	);
};
