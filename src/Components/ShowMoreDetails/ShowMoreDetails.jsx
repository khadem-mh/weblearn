import React, { useEffect, useState } from 'react'
import './ShowMoreDetails.css'
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export default function ShowMoreDetails({ refDetails }) {

    const [isShowDetails, setIsShowDetails] = useState(false)

    useEffect(() => {
        if (isShowDetails) refDetails.current.classList.replace('unShowOveflowYDetails', 'showOveflowYDetails')
        else refDetails.current.classList.replace('showOveflowYDetails', 'unShowOveflowYDetails')
    })

    return (
        <div className={`parent-show-more-intro ${isShowDetails ? 'show-more' : ''}`}>
            <button className='show-more-intro' onClick={() => setIsShowDetails(prev => !prev)}>
                {
                    isShowDetails
                        ?
                        (
                            <>
                                مشاهده کمتر
                                < IoIosArrowUp className='show-more-intro-icon' />
                            </>
                        )
                        :
                        (
                            <>
                                مشاهده بیشتر
                                <IoIosArrowDown className='show-more-intro-icon' />
                            </>
                        )
                }

            </button>
        </div>
    )
}
