import { useState } from "react";
import { DragDropContext, DropResult, Droppable, Draggable } from "react-beautiful-dnd"

export function BoxStreet() {
    return (
        <div className="w-full h-screen flex-col flex justify-center items-center">
            <Box />
        </div>
    )
}

type House = {
    id: number;
    number: number;
    order: number;
}

const Box = () => {
    const [houses, setHouses] = useState<House[]>([
        {
                id: 1,
                number: 1,
                order: 1 - 1
            },
            {
                id: 2,
                number: 2,
                order: 2 - 1
            },
            {
                id: 3,
                number: 3,
                order: 3 - 1
            },
            {
                id: 4,
                number: 4,
                order: 4 - 1
            },
            {
                id: 5,
                number: 5,
                order: 5 - 1
            },
            {
                id: 6,
                number: 6,
                order: 6 - 1
            }
        ])

    const drag = (result: DropResult) => {
        const { destination, source } = result

        if (!destination) {
            return
        }
        console.log({destination, source})
    }

    // uma função para dividir a variavel houses em N colunas
    const divideHouses = (houses: House[], columns: number) => {
        const dividedHouses: House[][] = []
        
        let index = 0

        houses.sort((a, b) => a.order - b.order).forEach((house) => {
            if(index === columns) {
                index = 0
            }

            if(!dividedHouses[index]) {
                dividedHouses[index] = []
            }
            dividedHouses[index].push(house)
            index++
        })

        return dividedHouses
    }

    return (
        <div className="bg-gray-400 h-80 w-80">
            <DragDropContext onDragEnd={drag}>
                <div className="flex">
                    {divideHouses(houses, 4).map((column, index) => {
                        return (
                            <Droppable droppableId={column.toString()} key={index}>
                                {(provided) => (
                                    <div
                                        className="flex flex-col gap-2"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {column.map((house, index) => {
                                            return (
                                                <HouseComponent house={house} index={index} key={index} />
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        )
                    })}
                </div>
            </DragDropContext>
        </div>
    )
}

const HouseComponent = ({ house, index }: { house: House, index: number }) => {
    return (
        <Draggable draggableId={house.order.toString()} index={index}>
            {(provided) => (
                <div
                    className="w-12 h-12 border border-black"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <h1>{house.number}</h1>
                </div>
            )}
        </Draggable>
    )
}