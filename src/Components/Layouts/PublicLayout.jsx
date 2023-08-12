// components
import RecipeLayout from './RecipeLayout'

// libs
import React from 'react'

// styles
import './style.scss'

const PublicLayout = ({children}) => {
  return (
    <>
		<RecipeLayout>
      		{children}       
		</RecipeLayout>
    </>
  )
}

export default PublicLayout