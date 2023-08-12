// libs
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// Contstants
import { LABELS, RIGHT_ACTION } from '../../../Shared/Constants'

// actions
import { setUpdatedToken } from '../../../Redux/Actions/Auth'

// styles
import "./styles.scss"

const RightSideAction = ({closeModal=() => {}}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout  = () => {
        dispatch(setUpdatedToken(null))
    }

    const handleClick = (data) => {

        if (data?.label ===  LABELS?.LOGOUT) {
            handleLogout()
            return;
        }
        navigate(data?.path)
    }

    return (
    <>
        <aside className="right-action ">
            <ul className=''>
                {RIGHT_ACTION.map((item, index) => (
                    
                        <li className='p-3 action-item-link' key={"kkoo"+index} id={`right_action ${index}`}
                            onClick={()=> {
                                closeModal()
                                handleClick(item)
                            }}
                        >
                            <em className='pe-2'><img className='img-fluid' src={item?.icon} alt={index+"image"}/></em>
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