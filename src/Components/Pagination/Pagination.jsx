import React from 'react'
import './Pagination.css'

export default function Pagination() {
    return (
        <div class="pagination">
            <ul class="pagination-list">
                <li class="pagination-item">
                    <a href="#" class="pagination-link">
                        <i class="fas fa-long-arrow-alt-right pagination-icon"></i>
                    </a>
                </li>

                <li class="pagination-item">
                    <a href="#" class="pagination-link">
                        1
                    </a>
                </li>
                <li class="pagination-item">
                    <a href="#" class="pagination-link">
                        2
                    </a>
                </li>

                <li class="pagination-item">
                    <a href="#" class="pagination-link">
                        <i class="fas fa-long-arrow-alt-left pagination-icon"></i>
                    </a>
                </li>
            </ul>
        </div>
    )
}
