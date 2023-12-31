import React from 'react'
import ReactModal from '../ReactModal'
import { LABELS } from '../../../Shared/Constants'
import CustomModalBody from '../CustomModalBody'

const ConfirmationModal = ({
	openModal, closeModal, desc, buttonText,
	handleAction = () => { }
}) => {

	const footerChild = () => (
		<div className="d-flex justify-content-center align-items-center mt-4">
			<button className='btn btn-secondary mx-2'
				onClick={closeModal}
			>{LABELS?.CANCEL}</button>
			<button className='btn btn-danger mx-2'
				onClick={handleAction}
			>{buttonText}</button>
		</div>
	)
	return (
		<>
			<ReactModal
				isOpen={openModal}
				handleToggle={closeModal}
				title={LABELS.CONFIRMATION}
			>
				<CustomModalBody
					hasFooter={true}
					footerChild={footerChild}
				>
					<h5 className='text-center mb-2'>{desc}</h5>
				</CustomModalBody>
			</ReactModal>
		</>
	)
}

export default ConfirmationModal