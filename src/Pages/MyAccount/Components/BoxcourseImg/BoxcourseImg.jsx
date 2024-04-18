import React from 'react'
import './BoxcourseImg.css'

export default function BoxcourseImg({imgSrc, text}) {
  return (
    <div className='box-course-img'>
        <img src={imgSrc} alt="corseImg" />
        <p>{text}</p>
    </div>
  )
}
