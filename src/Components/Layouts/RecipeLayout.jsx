import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const RecipeLayout = ({children}) => {
  return (
    <>
        <div className="container">
			<Header />
            {children}
        </div>
      	<Outlet />
    </>
  )
}

export default RecipeLayout