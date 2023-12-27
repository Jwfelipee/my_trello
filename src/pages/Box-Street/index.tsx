import { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable, Draggable } from "react-beautiful-dnd"
import { Button } from "../../components/atoms/Button";

export function BoxStreet() {
    const housesRaw = [
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
            },
            {
                id: 7,
                number: 7,
                order: 7 - 1
            },
            {
                id: 8,
                number: 8,
                order: 8 - 1
            },
            {
                id: 9,
                number: 9,
                order: 9 - 1
            },
            {
                id: 10,
                number: 10,
                order: 10 - 1
            },
            {
                id: 11,
                number: 11,
                order: 11 - 1
            },
            {
                id: 12,
                number: 12,
                order: 12 - 1
            },
            {
                id: 13,
                number: 13,
                order: 13 - 1
            },
            {
                id: 14,
                number: 14,
                order: 14 - 1
            },
            {
                id: 15,
                number: 15,
                order: 15 - 1
            },
            {
                id: 16,
                number: 16,
                order: 16 - 1
            },
            {
                id: 17,
                number: 17,
                order: 17 - 1
            },
            {
                id: 18,
                number: 18,
                order: 18 - 1
            },
            {
                id: 19,
                number: 19,
                order: 19 - 1
            },
            {
                id: 20,
                number: 20,
                order: 20 - 1
            },
            {
                id: 21,
                number: 21,
                order: 21 - 1
            },
            {
                id: 22,
                number: 22,
                order: 22 - 1
            },
            {
                id: 23,
                number: 23,
                order: 23 - 1
            },
            {
                id: 24,
                number: 24,
                order: 24 - 1
            },
            {
                id: 25,
                number: 25,
                order: 25 - 1
            },
            {
                id: 26,
                number: 26,
                order: 26 - 1
            },
            {
                id: 27,
                number: 27,
                order: 27 - 1
            },
            {
                id: 28,
                number: 28,
                order: 28 - 1
            },
        ]

    const callBack = (houses) => {
        console.log(houses)
    }
    return (
        <div className="w-full h-screen flex-col flex justify-center items-center">
            <Box housesRaw={housesRaw} save={callBack} />
        </div>
    )
}

type House = {
    id: number;
    number: number;
    order: number;
    column: 'A' | 'B' | 'C' | 'D';
}

const Box = ({ housesRaw, save }) => {
    const [houses, setHouses] = useState<House[]>([])

    // preciso de uma função para alterar a ordem das casas de acordo com o drag and drop
    // na renderização precisa ter 4 colunas com infinitas casas
    // a função vai precisar alterar o order de cada casa de acordo com a posição que ela foi solta
    // e ajustar o order das outras casas para que não haja conflito de ordem
    // preciso poder alterar a ordem de uma casa e ela se ajustar automaticamente
    // preciso que ao pegar uma casa eu consiga coloca-la em qualquer lugar na mesma linha ou em outra linha
    const columns = ['A', 'B', 'C', 'D', 'E']

    useEffect(() => {
        const housesToSave = housesRaw;
        let count = 0
        const housesWithColumn = housesToSave.map((house, index) => {
            if (count === columns.length) {
                count = 0
            }
            const newHouse = {
                ...house,
                column: columns[count] as any
            }
            
            count++
            return newHouse
        })
        setHouses(housesWithColumn)
    }, [])


    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return

        const { source, destination } = result

        const newHouses = [...houses]

        const sourceHouse = newHouses.filter(house => house.column === source.droppableId).find((_, index) => index === source.index)
        const sourceIndex = newHouses.findIndex(house => house.id === sourceHouse?.id)

        const destinationHouse = newHouses.filter(house => house.column === destination.droppableId).find((_, index) => index === destination.index)
        
        newHouses[sourceIndex].order = (destinationHouse.order -1) + 0.5

        const newHousesSorted = newHouses.sort((a, b) => a.order - b.order)
        let count = 0
        const newHousesWithColumn = newHousesSorted.map((house, index) => {
            if (count === columns.length) {
                count = 0
            }
            const newHouse = {
                ...house,
                column: columns[count] as any,
                order: index + 1
            }
            
            count++
            return newHouse
        })
        setHouses(newHousesWithColumn)
    }
    
    return (
        <div>
            
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-2/3">

            {columns.map((column, index) => (
                <Droppable droppableId={column} key={column}>
                    {(provided) => (
                        <div
                            className="w-1/4 h-full border border-green p-2 gap-2 space-y-2"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {houses.filter(h => h.column === column).map((house, index) => (
                                <HouseComponent house={house} index={index} key={house.id} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            ))}
            </div>
        </DragDropContext>

        <Button onClick={() => save(houses)}>Salvar</Button>

        </div>
                                
    )    
}

const HouseComponent = ({ house, index }: { house: House, index: number }) => {
    return (
        <Draggable draggableId={house.id.toString()} index={index}>
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