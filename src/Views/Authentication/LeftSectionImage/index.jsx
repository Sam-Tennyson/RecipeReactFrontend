import React from 'react'
import { Images } from '../../../Shared/Images'
import  "./style.scss"

const LeftSectionImage = () => {
  return (
    <>
        <div className='image-container text-center'>
            <img className='p-2 ' src={Images?.recipe_logo} alt="" />
        </div>
    </>
  )
}

export default LeftSectionImage