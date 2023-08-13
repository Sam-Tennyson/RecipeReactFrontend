import moment from 'moment'
import React, { useState } from 'react'
import CommonHeader from '../../../../Components/Atoms/CommonHeader'
import ReadMore from '../../../../Components/Atoms/ReadMore'
import ReactModal from '../../../../Components/Atoms/ReactModal'
import { LABELS } from '../../../../Shared/Constants'
import CustomModalBody from '../../../../Components/Atoms/CustomModalBody'

const CONSTANTS_STRINGS = {
    COMMENT_LIST: "Comments Listing"
}

const CommentsListing = ({ data }) => {
    const [commentModal, setCommentModal] = useState(false);
    const [currentData, setCurrentData] = useState("")

    const openCommentModal = (data) => {
        setCurrentData(data)
        setCommentModal(true)
    }

    const handleClose = () => {
        setCurrentData("")
        setCommentModal(false)
    }

    return (
        <>
            <ReactModal
                size={"lg"}
                isOpen={commentModal}
                handleToggle={handleClose}
                title={LABELS.COMMENT}
            >
                <CustomModalBody>
                    <p className='text-center mb-2'>{currentData?.text}</p>
                </CustomModalBody>
            </ReactModal>

            <CommonHeader
                title={CONSTANTS_STRINGS?.COMMENT_LIST}
                hideButton={true}
            />
            <div className='row my-3'>
                {data?.map((item, ind) => {
                    return (
                        <div className="col-sm-6 col-md-4 col-lg-3 my-2" key={item?._id}>
                            <div className='border  h-100 card p-3' >
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5>{item?.user_id?.name}</h5>
                                    <h5>{moment(item?.created_at).format("LL")}</h5>
                                </div>
                                <p>
                                    <ReadMore
                                        content={item?.text}
                                        isListing={true}
                                        handleListingRead={() => openCommentModal(item)}
                                    />
                                </p>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </>
    )
}

export default CommentsListing