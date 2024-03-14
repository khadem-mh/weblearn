import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom';
import './OffCanvasBottom.css'

export default function OffCanvasBottom({ titleHeader, namesLi, iconBtn, displayCanvas }) {

    const refCanvasFilter = useRef()
    const [menuBottomFilter, setMenuBottomFilter] = useState(false)
    const [itemSelected, setItemSelected] = useState(0)

    useEffect(() => {
        if (menuBottomFilter) {
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

    }, [menuBottomFilter])

    useEffect(() => {
        if (itemSelected >= 0) {
            refCanvasFilter.current.classList.contains('show') && refCanvasFilter.current.classList.replace('show', 'hiding')
            setMenuBottomFilter(prev => !prev)        
            document.documentElement.querySelector('#root').classList.remove('blur-page')
        }
    }, [itemSelected])

    useEffect(() => {
        refCanvasFilter.current.classList.contains('hiding') && refCanvasFilter.current.classList.replace('hiding', 'show')
        setMenuBottomFilter(prev => !prev)
    }, [])

    return (
        <>

            <button className={`btn-offcanvas ${displayCanvas}`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" onClick={() => setMenuBottomFilter(prev => !prev)}>
                {iconBtn}
                <p className='btn-text-offcanvas'>{namesLi[itemSelected]}</p>
            </button>

            {ReactDOM.createPortal(
                <div className="offcanvas offcanvas-bottom" tabIndex="-1" id="offcanvasBottom" ref={refCanvasFilter}>
                    <div className="offcanvas-header offcanvas-header-category">
                        <button type="button" className="btn-close btn-close-category" data-bs-dismiss="offcanvas" onClick={() => setMenuBottomFilter(prev => !prev)}></button>
                        <h5 className="offcanvas-title" id="offcanvasBottomLabel">{titleHeader}</h5>
                    </div>
                    <div className="offcanvas-body small">

                        <div className='sort-parent'>
                            {
                                namesLi.length > 1 ?
                                    namesLi.map((li, index) => (
                                        <div key={index}>
                                            {
                                                index === namesLi.length - 1
                                                    ? <p key={index} className={`sort-parent__item noline ${(itemSelected === index) ? 'text-info' : ''}`} onClick={() => setItemSelected(index)}>{li}</p>
                                                    : <p key={index} className={`sort-parent__item ${(itemSelected === index) ? 'text-info' : ''}`} onClick={() => setItemSelected(index)}>{li}</p>
                                            }
                                        </div>
                                    ))
                                    :
                                    <p className='sort-parent__item'>{namesLi}</p>
                            }
                        </div>

                    </div>
                </div>,
                document.documentElement.querySelector('#offcanvases')
            )}

        </>
    )
}
