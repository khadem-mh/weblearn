import React from 'react'
import './ReapondComment.css'

export default function ReapondComment({ commentCreatorName, commentCreatorDate, commentBody, respondCreatorName, respondCreatorRole, respondCreatorDate, respondCreatorContent }) {
    return (
        <section className="comments__item">

            <div className="comments__question">
                <div className="comments__question-header">
                    <div className="comments__question-header-right">
                        <span className="comments__question-name comment-name">{commentCreatorName}</span>
                        <span className="comments__question-status comment-status">
                            دانشجو
                        </span>
                        <span className="comments__question-date comment-date">{commentCreatorDate}</span>
                    </div>
                    <div className="comments__question-header-left">
                        <a className="comments__question-header-link comment-link" href="/">پاسخ</a>
                    </div>
                </div>
                <div className="comments__question-text">

                    <p className="comments__question-paragraph comment-paragraph">
                        {commentBody}
                    </p>
                </div>
            </div>

            <div className="comments__ansewr">
                <div className="comments__ansewr-header">
                    <div className="comments__ansewr-header-right">
                        <span className="comments__ansewr-name comment-name">
                            {respondCreatorName}
                        </span>
                        <span className="comments__ansewr-staus comment-status">
                            {respondCreatorRole}
                        </span>
                        <span className="comments__ansewr-date comment-date">{respondCreatorDate}</span>
                    </div>
                    <div className="comments__ansewr-header-left">
                        <a className="comments__ansewr-header-link comment-link" href="/">پاسخ</a>
                    </div>
                </div>
                <div className="comments__ansewr-text">
                    <p className="comments__ansewr-paragraph comment-paragraph">
                        {respondCreatorContent}
                    </p>
                </div>
            </div>

        </section>
    )
}
