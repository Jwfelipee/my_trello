interface BodyProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	Y?: keyof typeof height;
	X?: keyof typeof width;
}

const height = {
	xxsmall: 'h-[50vh] max-h-[250px]',
	xsmall: 'h-[60vh] max-h-[350px]',
	small: 'h-[70vh] max-h-[450px]',
	medium: 'h-[80vh] max-h-[550px]',
	large: 'h-[90vh] max-h-[650px]',
};

const width = {
	small: 'w-[70vh] max-w-[450px]',
	medium: 'w-[80vh] max-w-[550px]',
	large: 'w-[90vh] max-w-[650px]',
	xlarge: 'w-[90vh] max-w-[750px]',
	xxlarge: 'w-[90vh] max-w-[850px]',
};

export function Body({ children, X = 'medium', Y = 'medium', ...rest }: BodyProps) {
	return (
		<div
			className={`
				absolute flex items-center justify-center h-full w-full
			`}
			{...rest}
		>
			<div
				className={`
					bg-white z-40 rounded-md shadow-lg flex flex-col p-8 relative
					${height[Y]}
					${width[X]}
				`}
			>
				{children}
			</div>
		</div>
	);
}
