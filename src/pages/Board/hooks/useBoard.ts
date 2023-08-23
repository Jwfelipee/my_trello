import { useEffect, useState } from "react";
import { IData, Task } from "../types";
import { generateUUID } from "../../../helpers/uuidGenerate";
import { DropResult } from "react-beautiful-dnd";
import { useStorageState } from "./useStorageState";

export const useBoard = () => {
	const [data, setData] = useStorageState<IData>('board-data', {
		esperando: [],
		'em processo': [],
		'finalizado': [],
	} as IData);
	const [columns, setColumns] = useStorageState('board-columns', Object.keys(data) ?? []);

	const initialData: IData = columns?.reduce((acc, current) => {
		if (current === 'esperando') {
			acc[current] = begin;
		} else acc[current] = [];

		return acc;
	}, {} as IData);

	useEffect(() => {
		const hasDataLocalStorage = localStorage.getItem('board-data');
		if (hasDataLocalStorage) return
		setTimeout(() => {
			setData(initialData);
		}, 1000);
	}, []);

	function drag(result: DropResult) {
		const { source, destination } = result;

		if (!destination) return;

		if (source.droppableId === destination.droppableId && source.index === destination.index) return;

		const sourceData = data[source.droppableId];
		const destinationData = data[destination.droppableId];

		const [removed] = sourceData.splice(source.index, 1);
		destinationData.splice(destination.index, 0, removed);
		destinationData.forEach((item) => {
			item.column = destination.droppableId;
		});
		sourceData.forEach((item) => {
			item.column = source.droppableId;
		});

		setData({ ...data, [source.droppableId]: sourceData, [destination.droppableId]: destinationData });
	}

	const updateItem = (id: string, column: string, item: Task) => {
		const columnData = data[column];
		const index = columnData.findIndex(item => item.id === id);
		columnData[index] = item;
		setData({ ...data, [column]: columnData });
	}

	const addItem = (column: string, item: Task) => {
		const columnData = data[column];
		item.id = generateUUID();
		columnData.push(item);
		setData({ ...data, [column]: columnData });
	}

	const removeItem = (column: string, id: string) => {
		const columnData = data[column];
		const index = columnData.findIndex(item => item.id === id);
		columnData.splice(index, 1);
		setData({ ...data, [column]: columnData });
	}

	const submitCardModal = (task: Task, column: string, id?: string) => {
		if (id) updateItem(id, column, task);
		else addItem(column, task);
	}

	const addColumn = (column: string) => {
		setData({ ...data, [column]: [] });
		setColumns([...columns, column]);
	}
	const removeColumn = (column: string) => {
		const { [column]: removed, ...rest } = data;
		setData(rest);
		setColumns(columns.filter(item => item !== column));
	}
	const sortColumns = (columns: string[]) => {
		setColumns(columns);
	}

	return {
		data,
		columns,
		drag,
		addColumn,
		removeColumn,
		sortColumns,
		submitCardModal,
		removeItem
	}
}

const begin: Task[] = [
	{ id: generateUUID(), title: 'Exemplo', description: '', content: '', column: 'esperando' },
	{ id: generateUUID(), title: 'Exemplo 2', description: 'com descrição simples', content: '', column: 'esperando' },
];