import { DragDropContext } from 'react-beautiful-dnd';

import { Button } from '../../components/atoms/Button';
import { Column } from './components';
import { CardModal, ModalAddColumn, ModalSortColumns } from './components/modal';
import { useBoard, useBoardModal } from './hooks';
import { Task } from './types';

export function Board() {
	const { columns, data, drag, addColumn, removeColumn, sortColumns, submitCardModal, removeItem } = useBoard();
	const { modal, openModal, closeModal, openCard, updateCard, cardModal, closeCard } = useBoardModal();

	const getToUpdate = (id: string): Task | null => {
		let finded = null;
		columns.forEach((column) => {
			const find = data[column].find((card) => card.id === id);
			if (find) {
				finded = find;
			}
		});
		return finded;
	};

	return (
		<>
			<ModalAddColumn
				isOpen={modal === 'add'}
				onClose={closeModal}
				addColumn={addColumn}
			/>
			<ModalSortColumns
				isOpen={modal === 'sort'}
				onClose={closeModal}
				columns={columns}
				submit={sortColumns}
			/>
			<CardModal
				isOpen={cardModal.isOpen}
				column={cardModal.column}
				onClose={closeCard}
				update={getToUpdate(cardModal.id)}
				submit={submitCardModal}
			/>
			<div className='w-screen h-screen flex justify-center items-center bg-[#000137]'>
				<div
					className='w-11/12 h-5/6 p-4 bg-white opacity-95 shadow-md drop-shadow-md rounded-md flex flex-col gap-8'
					style={{ backgroundImage: 'url(https://trello-backgrounds.s3.amazonaws.com/54aaae13b8275361d2f78815/2560x1600/b9a42611c9e1e42ffb3f933432bde53a/graphic-project-mgmt.png)' }}
				>
					<div className='w-full flex items-center'>
						<h1 className='w-fit whitespace-nowrap text-white text-2xl'>Bem vindo ao Trello Individual</h1>
						<div className='w-full flex items-center justify-end gap-4'>
							<Button
								className='w-40 !text-white'
								variant='outline'
								onClick={() => openModal('sort')}
							>
								Ordenar colunas
							</Button>
							<Button
								onClick={() => openModal('add')}
								className='w-40'
							>
								Adicionar coluna
							</Button>
						</div>
					</div>
					<DragDropContext onDragEnd={drag}>
						<div className='flex flex-row w-full h-full gap-2 overflow-x-auto'>
							{columns?.map((column) => {
								return (
									<Column
										id={column}
										data={data[column]}
										removeColumn={removeColumn}
										key={column}
										openCard={openCard}
										updateCard={updateCard}
										removeCard={removeItem}
									/>
								);
							})}
						</div>
					</DragDropContext>
				</div>
			</div>
		</>
	);
}
