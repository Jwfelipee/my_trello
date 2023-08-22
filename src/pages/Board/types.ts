
export type Task = {
	id: string;
	title: string;
	description: string;
	content: string;
	column: string;
};
export type IData = Record<any, Task[]>;