// libs
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';

// actions
import { getCategory } from '../../../Redux/Actions/Recipe';

// routes
import { ROUTE_CONSTANTS } from '../../../Shared/Routes';
import { HEADER_TAB, LABELS, RIGHT_ACTION, STRINGS } from "../../../Shared/Constants"

// constants
import { Images } from '../../../Shared/Images';

// components
import RightSideAction from '../../Atoms/RightSideAction';

// styles
import "./style.scss"
import { setHeaderRoute } from '../../../Redux/Actions/Loader';

const Header = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const token = useSelector((state) => state.auth.token);
	const profileReducer = useSelector((state) => state.auth.user_data);
	const header_route = useSelector((state) => state.loading.header_route);

	const [hamburger, setShowHamburger] = useState(false);
	const [showSidePopup, setShowSidePopup] = useState(false);
	const [sideBarData, setSideBarData] =  useState([])

	const handleClick = (data) => {
		dispatch(setHeaderRoute(data?.path))
		if (hamburger) setShowHamburger(false)
		navigate({
			pathname: data?.path
		})
	}

	const handleProfileClick = () => {
		if (hamburger) setShowHamburger(false)
		setShowSidePopup((prev) => !prev)
	}

	const fetchCategoryList = () => dispatch(getCategory())

	const handleSideOptions = () => {
		let data = []
		if (token) {
			let no_data = [LABELS.LOGIN, LABELS.SIGNUP]
			data = RIGHT_ACTION.filter((item) => !no_data.includes(item?.label))
			setSideBarData(data)
		} else {
			let no_data = [LABELS.MY_RECIPE, LABELS.ADD_RECIPE, LABELS.LOGOUT]
			data = RIGHT_ACTION.filter((item) => !no_data.includes(item?.label))
			setSideBarData(data)
		}
	}

	useEffect(() => {
		if (profileReducer) {

			return;
		}
	}, [profileReducer])

	useEffect(() => {
		handleSideOptions()
		fetchCategoryList()
	}, [])

	console.log(sideBarData);

	return (
		<>

			<div className={`offcanvas offcanvas-end ${showSidePopup ? "show" : ""}`}
				tabIndex="-1"
				id="offcanvasRight"
				aria-labelledby="offcanvasRightLabel"
			>
				<div className="offcanvas-header mb-0">
					<h5 id="offcanvasRightLabel">{token?profileReducer?.name :LABELS.MENU}</h5>
					<button type="button" className="btn-close text-reset" onClick={() => setShowSidePopup((prev) => !prev)}></button>
				</div>
					<hr className='mb-1 pb-0' />
				<div className="offcanvas-body p-0">
					<RightSideAction 
						right_bar_options={sideBarData}
						closeModal={() => setShowSidePopup((prev) => !prev)} 
					/>
				</div>
			</div>
			{showSidePopup ? <div className="offcanvas-backdrop fade show"></div> : null}
			<header>
				<nav className='navbar navbar-expand-lg d-flex align-items-center justify-content-between container'>
					<div className='navbar-brand logo'>
						<img src={Images?.logoImage} alt="logo_image" className="d-inline-block" width="50" onClick={() => {
							dispatch(setHeaderRoute(ROUTE_CONSTANTS?.DASHBOARD))
							navigate(ROUTE_CONSTANTS?.DASHBOARD)
						}} />
					</div>
					<button className="navbar-toggler custom-toggle"
						// onClick={() => setShowHamburger((prev) => !prev)}
						onClick={() => setShowSidePopup((prev) => !prev)}
						type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
					>
						<span className="navbar-toggler-icon">
							<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z"
									fill="#686868"
								></path>
							</svg>
						</span>
					</button>
					<div className={`${hamburger ? "show " : ""}collapse navbar-collapse main-right-navbar`} id="navbarSupportedContent">
						<ul className='navbar-nav ms-auto'>
							{HEADER_TAB.map((item, ind) => {
								return (
									<li className={`item-link  ${item.path === location.pathname ? "active" : ""}`} key={item?._id}
										onClick={() => handleClick(item)}
									>
										<span className={`link  ${item.path === location.pathname ? "active" : ""}`}> {item.name} </span>
									</li>
								)
							})}
							{!token ? (
								<>
									<li className='item-link'>
										<span className='link'
											onClick={() => {
												navigate(ROUTE_CONSTANTS?.LOGIN)
												setShowHamburger(false)
											}}
										>Login</span>
									</li>
									<li className='item-link'>
										<span className='link'
											onClick={() => {
												navigate(ROUTE_CONSTANTS?.SIGNUP)
												setShowHamburger(false)
											}}
										>Signup</span>
									</li>
								</>) : (
								<li className='item-link'>
									<span className='link'
										onClick={handleProfileClick}
									>Your Profile</span>
								</li>
							)}
						</ul>
					</div>
				</nav>
			</header>
		</>
	)
}

export default Header