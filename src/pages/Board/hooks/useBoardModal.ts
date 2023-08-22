import { useState } from "react"

export const useBoardModal = () => {
	const [modal, setModal] = useState<IModal>('none')
	const [cardModal, setCardModal] = useState<{ isOpen: boolean; id: string | null; column: string }>({
		isOpen: false,
		id: null,
		column: ''
	});

	const openModal = (modal: IModal) => setModal(modal)
	const closeModal = () => setModal('none')
	const updateCard = (id: string, column: string) => setCardModal({ isOpen: true, id, column })
	const	openCard = (column: string) => setCardModal({ isOpen: true, id: null, column })
	const closeCard = () => setCardModal({ isOpen: false, id: null, column: '' })
	
	return {
		modal,
		openModal,
		closeModal,
		cardModal,
		updateCard,
		openCard,
		closeCard
	}
}

type IModal = 'add' | 'sort' | 'none'