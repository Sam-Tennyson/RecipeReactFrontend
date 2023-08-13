// libs
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// components
import CustomModalBody from '../CustomModalBody'
import ReactModal from '../ReactModal'

// constants
import { ERROR_MESSAGE, LABELS } from '../../../Shared/Constants'
import { Images } from '../../../Shared/Images'

// styles
import "./style.scss"

const CONSTANTS_STRINGS = {
    FILTER: "Filter",
    RESET: "Reset Filter"
}

const CommonSearch = ({
    categoryData, setCategoryData = () => { },
    search, setSearch = () => { },
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
        if (selectedFilter) {
            setCategoryData(selectedFilter)
        }
    }, [selectedFilter])

    const handleClose = () => {
        setShowFilterModal(false)
    }

    return (
        <>
            <ReactModal
                isOpen={showFilterModal}
                handleToggle={handleClose}
                title={LABELS.FILTER}
            >
                <CustomModalBody>
                    {categoryData?.length? (
                        <span className="d-flex justify-content-end align-items-center reset-class"
                            onClick={() => setSelectedFilter([])}
                        >
                            <FontAwesomeIcon icon={faRefresh} /> &nbsp; {CONSTANTS_STRINGS.RESET}
                        </span>
                    ): null}
                    <div className="sam-offcanvas-filter">                       
                        <div className="lays-chips d-flex justify-content-center flex-wrap align-items-center pb-0 mb-0">
                            {recipeCategoryRed ? (
                                recipeCategoryRed.map((item, ind) => {
                                    return (
                                        <div key={item?._id} className={`my-chip-class my-3 `}
                                            onClick={() => handleFilterClick(item)}
                                        >
                                            <span className={`chip-data ${(selectedFilter.indexOf(item?._id) !== -1) ? "active" : ""} `}>{item?.name}</span>
                                        </div>
                                    )
                                })
                            ) : (<div className='error'>{ERROR_MESSAGE.NO_DATA_FOUND}</div>)}
                        </div>
                    </div>
                </CustomModalBody>
            </ReactModal>

            {showFilterModal ? <div className="offcanvas-backdrop fade show"></div> : null}
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <div className='search-class-container'>
                        <em className='image-em search-icon'>
                            <img className='img-fluid' src={Images?.searchSvg} alt="" width={"20px"} height={"20px"} />
                        </em>
                        <input
                            type="text"
                            value = {search}
                            onChange={(e) => setSearch(e.target.value)}
                            className=" my-input"
                            placeholder='Search here...'
                        />
                        <span className='filter-class image-em' onClick={() => setShowFilterModal((prev) => !prev)}>
                            {CONSTANTS_STRINGS.FILTER}
                            <em className='filter-icon '>
                                <img className='img-fluid' src={Images?.filterEditSvg} alt="" width={"20px"} height={"20px"} />
                            </em>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommonSearch