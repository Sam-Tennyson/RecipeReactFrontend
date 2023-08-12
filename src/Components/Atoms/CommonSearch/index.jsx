// libs
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// constants
import { ERROR_MESSAGE } from '../../../Shared/Constants'
import { Images } from '../../../Shared/Images'

// styles
import "./style.scss"

const CommonSearch = ({
    categoryData, setCategoryData=()=>{},
}) => {
    
	const recipeCategoryRed = useSelector((state) => state.recipe.category)

    const [showFilterModal, setShowFilterModal] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(categoryData)

    const handleFilterClick = (data) => {
        const index = selectedFilter.indexOf(data?._id);
        if (index !== -1) {
            let filterData = selectedFilter.filter((filter_id) => filter_id !== data?._id)
            setSelectedFilter(filterData)
        } else {
            setSelectedFilter((prev) => ([...prev, data?._id]))
        }
    }

    useEffect(() => {
        if (selectedFilter ) {
            setCategoryData(selectedFilter)
            return;
        }
    }, [selectedFilter])

    return (
    <>  
        {showFilterModal ? (

            <div className="sam-offcanvas-filter">
                <div className="container py-md-4 py-lg-5 pt-3 pb-2">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className={`offcanvas offcanvas-top offcanvas-filter ${showFilterModal ? "show": ""}`} 
                                tabIndex="-1" 
                                id="offcanvasTop" 
                                aria-labelledby="offcanvasTopLabel"
                            >
                                <div className="offcanvas-header">
                                    <h5 id="offcanvasTopLabel  text-center"> Search Filter </h5>
                                    <button type="button" className="btn-close text-reset" onClick={() => setShowFilterModal((prev) => !prev)}>
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clipRule="evenodd" d="M17.6955 0.714163C17.9769 0.995467 18.1349 1.377 18.1349 1.77484C18.1349 2.17267 17.9768 2.55422 17.6955 2.83553L11.3312 9.1998L17.6952 15.5638C17.9765 15.8451 18.1345 16.2266 18.1345 16.6244C18.1345 17.0223 17.9765 17.4038 17.6951 17.6851C17.4138 17.9665 17.0323 18.1245 16.6344 18.1245C16.2366 18.1245 15.8551 17.9665 15.5738 17.6852L9.20981 11.3212L2.84554 17.6855C2.56422 17.9668 2.18268 18.1249 1.78484 18.1249C1.38701 18.1249 1.00547 17.9668 0.724166 17.6855C0.442862 17.4042 0.284831 17.0227 0.284841 16.6249C0.28485 16.227 0.442899 15.8455 0.724217 15.5642L7.08849 9.1999L0.724524 2.83594C0.44322 2.55464 0.28519 2.1731 0.2852 1.77527C0.285209 1.37743 0.443257 0.995891 0.724576 0.714572C1.00589 0.433254 1.38744 0.275206 1.78527 0.275197C2.18311 0.275187 2.56464 0.433217 2.84595 0.714521L9.20991 7.07848L15.5742 0.714214C15.8555 0.432896 16.237 0.274848 16.6349 0.274839C17.0327 0.274829 17.4142 0.432859 17.6955 0.714163Z" fill="#6E7174"></path></svg>
                                    </button>
                                </div>
                            <hr className="mb-0 pb-0" />  
                                <div className="mt-0 pt-0 offcanvas-body lays-chips d-flex justify-content-center flex-wrap align-items-center pb-0 mb-0">
                                    {recipeCategoryRed ? (
                                        recipeCategoryRed.map((item, ind) => {
                                            return (
                                                <div key={ind} className={`my-chip-class m-2 `}
                                                    onClick={() => handleFilterClick(item)}
                                                >
                                                    <span className={`chip-data ${(selectedFilter.indexOf(item?._id) !== -1) ?"active" : ""} `}>{item?.name}</span>
                                                </div>
                                            )
                                        })
                                    ): (<div className='error'>{ERROR_MESSAGE.NO_DATA_FOUND}</div>)}
                                </div>
                                {/* <div className="d-flex justify-content-center align-items-center">
                                    <button className='btn btn-primary btn-sm'>Reset Filter</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
        ): null}

        {showFilterModal ? <div className="offcanvas-backdrop fade show"></div>: null}
        <div className="row">
            <div className="col-lg-6 mx-auto">
                <div className='search-class-container'>
                    <em className='image-em search-icon'>
                        <img className='img-fluid' src={Images?.searchSvg} alt="" width={"20px"} height={"20px"}/>
                    </em>
                    <input 
                        type="text" 
                        className=" my-input"
                        placeholder='Search here...'    
                    />
                    <span className='filter-class image-em' onClick={() => setShowFilterModal((prev) => !prev)}>
                                Filter
                        <em className='filter-icon '>
                            <img className='img-fluid' src={Images?.filterEditSvg} alt="" width={"20px"} height={"20px"}/>
                        </em>
                    </span>
                </div>
            </div>
        </div>
    </>
  )
}

export default CommonSearch