import React from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ReactSkelton = ({
    count, duration, wrapper
}) => {
  return (
    <>
        <Skeleton
           count={count} 
           duration={duration}
           wrapper={wrapper}
        />
    </>
  )
}

export default ReactSkelton