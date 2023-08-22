export const IcExit = ({ stroke = '#0A66C2' }: { stroke?: string }) => {
	return (
		<svg
			width='12'
			height='12'
			viewBox='0 0 12 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M11 1L1 11M1 1L11 11'
				stroke={stroke || '#0A66C2'}
				strokeWidth='1.66667'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};
