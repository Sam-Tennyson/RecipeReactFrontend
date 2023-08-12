import React from 'react'
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const token = useSelector((state) => state.auth.token);
  
    return (
    <>
        <aside>
            <ul className=''>
                <li>one</li>
                <li>two</li>
                <li>three</li>
                <li>four</li>
                <li>five</li>
            </ul>
        </aside>
    </>
  )
}

export default Sidebar