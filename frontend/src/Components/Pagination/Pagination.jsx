import React from 'react'
import './Pagination.css'

export default function Pagination() {
    return (
        <div className="pagination">
            <ul className="pagination-list">
                <li className="pagination-item">
                    <a href="/" className="pagination-link">
                        <i className="fas fa-long-arrow-alt-right pagination-icon"></i>
                    </a>
                </li>

                <li className="pagination-item">
                    <a href="/" className="pagination-link">
                        1
                    </a>
                </li>
                <li className="pagination-item">
                    <a href="/" className="pagination-link">
                        2
                    </a>
                </li>

                <li className="pagination-item">
                    <a href="/" className="pagination-link">
                        <i className="fas fa-long-arrow-alt-left pagination-icon"></i>
                    </a>
                </li>
            </ul>
        </div>
    )
}
