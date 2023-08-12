import React from 'react'

const CommonHeader = ({
    title, hideButton=false,
    handleBack = () => {},
}) => {
  return (
    <>
        <div className="d-flex justify-content-between align-items-center">
            <h2 className='heading_title'>{title}</h2>
            {!hideButton ? (
                <button className='btn btn-outline-info btn-sm'
                  onClick={handleBack}
                >Back</button>
            ): null}
        </div>
    </>
  )
}

export default CommonHeader