import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const RecipeLayout = ({ children }) => {
	return (
		<>
			<Header />
			<main className="container ">
				{children}
			</main>
			<Outlet />
		</>
	)
}

export default RecipeLayout