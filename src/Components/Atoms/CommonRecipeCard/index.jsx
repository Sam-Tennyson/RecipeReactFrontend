// libs
import moment from 'moment/moment'
import React, { useState } from 'react'

// constants
import { Images } from '../../../Shared/Images'

// components
import ReadMore from '../ReadMore'

// styles
import "./style.scss"
import { Spinner } from 'react-bootstrap'

const CONSTANTS_STRINGS = {
    EDIT: "Edit",
	DELETE: "Delete",
	LOADING: "Loading..."
}

const CommonRecipeCard = ({
	data, isMyRecipe = false,
	handleClick = () => { },
	handleDelete = () => { },
	handleEdit = () => { }
}) => {
	const [isLoading, setIsLoading] = useState(true);

	const handleImageLoad = () => {
	  setIsLoading(false);
	};
  
	const handleImageError = () => {
	  setIsLoading(false);
	  // You can also set an error state if necessary
	};
	return (
		<>
			<div className="card parentCard h-100 p-2" >
				
			{isLoading && <div className='load_image d-flex justify-content-center align-items-center'><Spinner className=' d-flex justify-content-center align-items-center' size="sm" animation="border" variant="primary" />&nbsp;{CONSTANTS_STRINGS.LOADING}</div>} 
				<img
					className={`img-fluid rounded ${isLoading ? 'd-none' : ''}`} onClick={handleClick} src={data?.image ? data?.image : Images?.logoImage} alt="Card image cap"
					onLoad={handleImageLoad}
					onError={handleImageError}
				/>
				<div className="card-body p-2">
					<h4>{data?.title}</h4>
					<p className="card-text">
						<ReadMore 
							content={data?.description}
							isListing={true}
							handleListingRead={handleClick}
						/>
					</p>
					<div className='d-flex justify-content-md-between'>
						<p>
							{data?.userId?.name}
						</p>
						<em>{moment(data?.createdAt).format('LL')}</em>
					</div>
				</div>
				{isMyRecipe ? (
					<div className="d-flex justify-content-end align-items-center">
						<button className="btn btn-sm btn-outline-primary me-2"
							onClick={handleEdit}
						>{CONSTANTS_STRINGS.EDIT}</button>
						<button className="btn btn-sm btn-outline-danger"
							onClick={handleDelete}
						>{CONSTANTS_STRINGS.DELETE}</button>
					</div>
				) : null}
			</div>
		</>
	)
}

export default CommonRecipeCard