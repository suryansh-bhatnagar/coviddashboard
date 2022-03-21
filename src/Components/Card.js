import React from 'react'

const Card = (props) => {
  return (
    <div className='card' style={{backgroundColor:props.background , fontWeight:'bold'}}>{props.children}</div>
  )
}

export default Card