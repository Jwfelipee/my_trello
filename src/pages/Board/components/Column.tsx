import { memo, useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Check, Plus, Trash } from 'react-feather';

import { Card } from '.';
import { Task } from '../types';

interface ColumnProps {
	id: string;
	data: Task[];
	removeColumn: (column: string) => void;
	openCard: (column: string) => void;
	updateCard: (id: string, column: string) => void;
	removeCard: (column: string, id: string) => void;
}

function ColumnComponent({ id, data, removeColumn, openCard, updateCard, removeCard }: ColumnProps) {
	const [deleteAction, setDeleteAction] = useState(false);

	useEffect(() => {
		if (deleteAction) {
			setTimeout(() => {
				setDeleteAction(false);
			}, 2000);
		}
	}, [deleteAction]);

	const handleDelete = () => {
		if (!deleteAction) {
			setDeleteAction(true);
			return;
		}
		removeColumn(id);
		setDeleteAction(false);
	};

	const handleAdd = () => openCard(id);

	return (
		<div className='w-60'>
			<Droppable droppableId={id}>
				{(provided) => {
					return (
						<div
							ref={provided.innerRef}
							className='h-full'
							{...provided.droppableProps}
						>
							<div className='flex flex-col gap-3 w-56 h-fit bg-[#000137] rounded-md shadow-md p-2'>
								<h6 className='bg-gray-200 h-10 flex items-center justify-between p-2 rounded-md shadow-md'>
									{id}
									<div className='flex items-center justify-end gap-2'>
										<button
											className={`
										rounded-full w-5 h-5 shadow-lg flex items-center justify-center hover:shadow-lg hover:pb-0.5 transition ease-in-out duration-150 border
											${deleteAction ? 'border-green-500' : ''}
										`}
											type='button'
											onClick={handleDelete}
										>
											<Trash
												stroke='#FF0000'
												className={`p-0.5 ${deleteAction ? 'hidden' : 'block'}`}
											/>
											<Check
												stroke='#00FF00'
												className={`p-0.5 ${deleteAction ? 'block' : 'hidden'}`}
											/>
										</button>
										<button
											className='rounded-full w-5 h-5 shadow-lg flex items-center justify-center hover:shadow-lg hover:pb-0.5 transition ease-in-out duration-150 border border-green-500'
											type='button'
											onClick={handleAdd}
										>
											<Plus
												stroke='#52a447'
												className={`p-0.5`}
											/>
										</button>
									</div>
								</h6>

								{data?.map((item, index) => {
									return (
										<Card
											values={item}
											index={index}
											updateCard={() => updateCard(item.id, id)}
											removeCard={(cardId) => removeCard(id, cardId)}
										/>
									);
								})}

								{provided.placeholder}
							</div>
						</div>
					);
				}}
			</Droppable>
		</div>
	);
}

export const Column = memo(ColumnComponent);
