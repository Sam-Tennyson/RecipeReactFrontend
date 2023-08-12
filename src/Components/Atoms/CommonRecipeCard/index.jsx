// libs
import moment from 'moment/moment'
import React from 'react'

// constants
import { Images } from '../../../Shared/Images'

// components
import ReadMore from '../ReadMore'

// styles
import "./style.scss"

const CommonRecipeCard = ({
	data, isMyRecipe = false,
	handleClick = () => { },
	handleDelete = () => { },
	handleEdit = () => { }
}) => {
	return (
		<>
			<div className="card parentCard p-2" >
				<img className="img-fluid rounded" onClick={handleClick} src={data?.image ? data?.image : Images?.logoImage} alt="Card image cap" />
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
						>Edit</button>
						<button className="btn btn-sm btn-outline-danger"
							onClick={handleDelete}
						>Delete</button>
					</div>
				) : null}
			</div>
		</>
	)
}

export default CommonRecipeCard