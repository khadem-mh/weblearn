import React from 'react'
import './BoxcourseImg.css'

export default function BoxcourseImg({ imgSrc, text}) {
  return (
    <div className='col col-8 col-sm-5 col-md-4 col-xl-5 box-course-img'>
      <img src={imgSrc} alt="corseImg" />
      <p>{text}</p>
    </div>
  )
}
