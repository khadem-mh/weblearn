import React from 'react'
import './StatusBoxAccount.css'

export default function StatusBoxAccount({ logo, title, subTitle, bgColorBox, bgColorLogo }) {
    return (
        <section className='status-box-account' style={{ backgroundColor: bgColorBox }}>
            <div className='status-box-account__right'>
                {logo}
            </div>

            <div className='status-box-account__left'>
                <p className='status-box-account__title'>{title}</p>
                <p className='status-box-account__sub-title'>{subTitle}</p>
            </div>
        </section>
    )
}
