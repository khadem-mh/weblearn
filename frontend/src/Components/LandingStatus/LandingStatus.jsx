import React from 'react'
import './LandingStatus.css'

export default function LandingStatus({statusIcon, statusCount, statusText}) {
    return (
        <div className="landing-status">
            <div className="landing-status__item">
                {statusIcon}
                <span className="landing-status__count">{statusCount}</span>
                <span className="landing-status__text">{statusText}</span>
            </div>
        </div>
    )
}
