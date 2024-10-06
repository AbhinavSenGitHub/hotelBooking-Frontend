import React from 'react'
import { useLocation } from 'react-router-dom'

const Description = () => {

    const location = useLocation().state
    console.log("locaiton in description", location)
  return (
    <div>
      
    </div>
  )
}

export default Description
