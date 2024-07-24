import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import './OffCanvasRight.css'

export default function OffCanvasRight({ iconBtn, displayCanvas, children }) {

  const refCanvasFilter = useRef()
  const [menuRightFilter, setMenuRightFilter] = useState(false)

  useEffect(() => {

    if (menuRightFilter) {
      if (refCanvasFilter.current.classList.contains('hiding')) {
        refCanvasFilter.current.classList.replace('hiding', 'show')
        document.documentElement.querySelector('#root').classList.add('blur-page')
      } else {
        refCanvasFilter.current.classList.add('show')
        document.documentElement.querySelector('#root').classList.add('blur-page')
      }
    } else {
      if (refCanvasFilter.current.classList.contains('show')) {
        refCanvasFilter.current.classList.replace('show', 'hiding')
        document.documentElement.querySelector('#root').classList.remove('blur-page')
      }
    }

  }, [menuRightFilter])

  return (
    <>

      <button className={`btn-offcanvas ${displayCanvas} w-100`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" onClick={() => setMenuRightFilter(prev => !prev)}>
        {iconBtn}
        <p className='btn-text-offcanvas'>فیلتر</p>
      </button>

      {ReactDOM.createPortal(
        <div className='offcanvas offcanvas-end' tabIndex="-1" id="offcanvasRight" ref={refCanvasFilter}>
          <div className="offcanvas-header">
            <button type="button" className="btn-close btn-close-category" data-bs-dismiss="offcanvas" onClick={() => setMenuRightFilter(prev => !prev)}></button>
            <h5 className="offcanvas-title title-main" id="offcanvasRightLabel">فیلتر</h5>
          </div>
          <div className="offcanvas-body">
            {children}
          </div>
        </div>,
        document.documentElement.querySelector('#offcanvases')
      )}

    </>
  )
}
