import React from 'react'
import { useLocation } from 'react-router-dom'

const CardContent = () => {
    const location = useLocation().state
    console.log("location in place conetnet", location)
  return (
    <div>
      <h1>yo!</h1>
    </div>
  )
}

export default CardContent
