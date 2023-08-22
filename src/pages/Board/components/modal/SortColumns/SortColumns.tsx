import { useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { Menu } from 'react-feather';

import { Button } from '../../../../../components/atoms/Button';
import { Body, Header, Overlay } from '../components';

interface SortColumnsProps {
	isOpen: boolean;
	onClose: () => void;
	columns: string[];
	submit: (columns: string[]) => void;
}

const ID = 'sort-columns';
export function ModalSortColumns({ isOpen, onClose, columns, submit }: SortColumnsProps) {
	if (!isOpen) return null;
	const [columnsSorted, setColumnsSorted] = useState(columns);

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;
		const items = Array.from(columnsSorted);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setColumnsSorted(items);
	};

	return (
		<>
			<Overlay onClose={onClose} />
			<Body Y='medium'>
				<Header
					title='Ordenar colunas'
					onClose={onClose}
				/>
				<div className='h-full flex flex-col justify-between'>
					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable droppableId={ID}>
							{(provided) => {
								return (
									<div
										className='h-full flex flex-col py-6 gap-4'
										ref={provided.innerRef}
										{...provided.droppableProps}
									>
										{columnsSorted.map((column, index) => (
											<Line
												column={column}
												index={index}
												key={column}
											/>
										))}
										{provided.placeholder}
									</div>
								);
							}}
						</Droppable>
					</DragDropContext>
					<div className='w-full flex items-center justify-between gap-10'>
						<Button
							variant='outline-negative'
							className='w-1/3'
							type='button'
							onClick={onClose}
						>
							Cancelar
						</Button>
						<Button
							className='w-1/3'
							onClick={() => {
								submit(columnsSorted);
								onClose();
							}}
						>
							Salvar alterações
						</Button>
					</div>
				</div>
			</Body>
		</>
	);
}

const Line = ({ column, index }: { column: string; index: number }) => (
	<>
		<Draggable
			key={column}
			draggableId={column}
			index={index}
		>
			{(provided) => {
				return (
					<div
						className='flex items-center gap-2 bg-zinc-100 p-2 rounded-md shadow-md'
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<Menu
							size={14}
							stroke='#C0C0C0'
						/>
						{column}
					</div>
				);
			}}
		</Draggable>
	</>
);
