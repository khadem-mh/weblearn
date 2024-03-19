import React, { useState, useLayoutEffect, useRef, Children } from 'react'
import ReactDOM from 'react-dom';
import './CopyLinkBox.css'
import { RiFileCopy2Line } from "react-icons/ri";

export default function CopyLinkBox({ yourStyle, titleBox, textForCopy, children, fzTitle, fzCopyText }) {

    const toastRef = useRef()
    const [showCopyText, setShowCopyText] = useState('')

    useLayoutEffect(() => {
        if (showCopyText.length) {
            let timeToast = setTimeout(() => {
                toastRef.current.classList.replace('show', 'hide')
            }, 5000)
            return () => {
                clearTimeout(timeToast)
                setShowCopyText('')
            }
        }
    }, [showCopyText])

    const clickHandleCopy = (text) => {
        setShowCopyText('')
        if (toastRef.current) {
            if (toastRef.current.classList.contains('hide')) {
                toastRef.current.classList.replace('hide', 'show')
            }
        }
        navigator.clipboard.writeText(text)
            .then(() => {
                setShowCopyText('متن با موفقیت به کلیپ‌بورد کپی شد! 📋')
            })
            .catch(err => {
                setShowCopyText('مشکلی در کپی کردن متن به وجود آمده است')
            });
    }

    return (
        <>
            <div className={`parent-copy-text ${yourStyle}`}>
                <div className="header-short-url">
                    {children}
                    <span className="short-url-text" style={{ fontSize: fzTitle }}>
                        {titleBox}
                    </span>
                </div>
                <hr />
                <p className="short-url">
                    <p style={{ fontSize: fzCopyText }}>{textForCopy}</p>
                    <RiFileCopy2Line className='short-url-iconcopy' onClick={() => clickHandleCopy({ textForCopy })} />
                </p>
            </div>

            {
                showCopyText && ReactDOM.createPortal(
                    <div className="toast align-items-center fade show toast-text-copy rounded-4" role="alert" aria-live="assertive" aria-atomic="true" ref={toastRef}>
                        <div className="d-flex parent-toast">
                            <div className="toast-body">
                                {showCopyText}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => {
                                toastRef.current.classList.replace('show', 'hide')
                                setShowCopyText('')
                            }}></button>
                        </div>
                    </div>,
                    document.documentElement.querySelector('#offcanvases')
                )
            }
        </>
    )
}
