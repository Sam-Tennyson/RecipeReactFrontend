// components
import RecipeLayout from './RecipeLayout'

// libs
import React from 'react'

// styles
import './style.scss'

const PrivateLayout = ({children}) => {
  return (
    <>
		<RecipeLayout>
			<div className='container private-screen'>
				{children}
			</div>
		</RecipeLayout>
	</>
  )
}

export default PrivateLayout