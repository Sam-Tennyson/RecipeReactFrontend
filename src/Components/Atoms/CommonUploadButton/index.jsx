// libs
import React from 'react'
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// constants
import { STRINGS } from '../../../Shared/Constants'

// styles
import "./style.scss"

const CommonUploadButton = ({
	id, 
	name,
	imageUrl,
	onChange = () => {},
	handleView = () => {},
	handleDelete = () => {},
}) => {
	return (
    <>
		<div className="d-flex justify-content-start align-items-center">
			<label  
				className="form-label upload_file mb-0" 
				htmlFor={id}
				onChange={onChange}
			> 
				{STRINGS.UPLOAD_FILE} <input className='form-control' hidden name={name} type="file" id={id} />
			</label>
			{imageUrl ? (
				<div className="ms-3 d-flex justify-content-between align-items-start action-upload">
					<span
						onClick={handleView}
					><FontAwesomeIcon icon={faEye} /></span>
					<span
						onClick={handleDelete}
					><FontAwesomeIcon icon={faTrash} /></span>
				</div>
			): null}
		</div>
    </>
  )
}

export default CommonUploadButton