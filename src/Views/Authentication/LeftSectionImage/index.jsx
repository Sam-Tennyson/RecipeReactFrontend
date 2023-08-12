import React from 'react'
import { Images } from '../../../Shared/Images'

const LeftSectionImage = () => {
  return (
    <>
        <div className='image-container'>
            <img className='p-2 ' src={Images?.recipeImage} alt="" />
        </div>
    </>
  )
}

export default LeftSectionImage