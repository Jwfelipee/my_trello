import { memo, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Trash } from 'react-feather';

import { Task } from '../types';

interface CardProps {
	values: Task;
	index: number;
	updateCard: (id: string) => void;
	removeCard: (id: string) => void;
}

function CardComponent({ values, index, updateCard, removeCard }: CardProps) {
	const [abbleClick, setAbbleClick] = useState<'card' | 'trash'>('card');

	const onClickCard = () => {
		if (abbleClick !== 'card') return;
		updateCard(values.id);
	};
	return (
		<>
			<Draggable
				key={values.id}
				draggableId={values.id}
				index={index}
			>
				{(provided) => {
					return (
						<div
							className='w-full h-fit max-h-[120px] overflow-hidden p-2 rounded-md shadow-md bg-[#02055A] bg-opacity-90 text-white flex flex-col gap-1'
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							onClickCapture={onClickCard}
						>
							<div className='flex items-center justify-between'>
								<h6 className='font-semibold text-lg'>{values.title}</h6>
								<button
									type='button'
									onClick={(e) => {
										if (abbleClick !== 'trash') return;
										e.stopPropagation();
										removeCard(values.id);
									}}
									onMouseEnter={() => setAbbleClick('trash')}
									onMouseLeave={() => setAbbleClick('card')}
								>
									<Trash
										size={16}
										stroke='#c30010'
									/>
								</button>
							</div>
							<span>{values.description}</span>
						</div>
					);
				}}
			</Draggable>
		</>
	);
}

export const Card = memo(CardComponent);
