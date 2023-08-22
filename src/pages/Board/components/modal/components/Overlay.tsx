interface OverlayProps {
	onClose: () => void;
}

export function Overlay({ onClose }: OverlayProps) {
	return (
		<div
			onClick={onClose}
			className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30'
		></div>
	);
}
