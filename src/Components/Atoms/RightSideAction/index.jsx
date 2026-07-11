// libs
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// Contstants
import { LABELS, RIGHT_ACTION } from '../../../Shared/Constants'

// actions
import { setUpdatedToken } from '../../../Redux/Actions/Auth'
import { setHeaderRoute } from '../../../Redux/Actions/Loader'

// styles
import "./styles.scss"

const RightSideAction = ({right_bar_options=[], closeModal = () => { } }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(setUpdatedToken(null))
    }

    const handleClick = (data) => {
        dispatch(setHeaderRoute(data?.path))
        if (data?.label === LABELS?.LOGOUT) {
            handleLogout()
            return;
        }
        navigate(data?.path)
    }

    return (
        <>
            <aside className="right-action ">
                <ul className=''>
                    {right_bar_options.map((item, index) => (

                        <li className={`p-3 action-item-link ${item?.path === location.pathname?"active":""}`} key={item?.id} id={`right_action ${index}`}
                            onClick={() => {
                                closeModal()
                                handleClick(item)
                            }}
                        >
                            <em className='pe-2'><img className='img-fluid' src={item?.icon} alt={index + "image"} /></em>
                            <span className=' action-link'>
                                {item?.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    )
}

export default RightSideAction