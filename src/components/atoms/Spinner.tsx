import { useEffect, useState } from 'react';

export const Spinner = ({ message }: { message: string }) => {
	const [etc, setEtc] = useState('...');

	useEffect(() => {
		const interval = setInterval(() => {
			if (etc.length === 3) {
				setEtc('');
			} else {
				setEtc(etc + '.');
			}
		}, 500);
		return () => clearInterval(interval);
	}, [etc]);

	return (
		<>
			<div className='absolute h-full w-full z-40 bg-black opacity-50'></div>
			<div className='h-full w-full flex flex-col gap-4 justify-center items-center absolute z-50'>
				<div className='animate-spin rounded-full h-32 w-32 border-2 border-white border-b-4 border-b-secondary'></div>
				<p className='text-white text-xl'>
					{message} {etc}
				</p>
			</div>
		</>
	);
};
