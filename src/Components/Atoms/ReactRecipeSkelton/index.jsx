import React from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// style
import './style.scss'

const ReactRecipeSkelton = () => {
	return (
		<>
			{Array(10).fill(0).map((item, ind) => (
				<div className='my-2 col-sm-6 col-md-6 col-lg-4' key={item?._id}>
					<Skeleton
						className='my-recipe-skelton'
						count={1}
						height={200}
					/>
					<Skeleton
						className='my-recipe-skelton'
						count={5}
					/>
				</div>
			))}
		</>
	)
}

export default ReactRecipeSkelton