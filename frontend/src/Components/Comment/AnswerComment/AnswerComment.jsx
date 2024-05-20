import React from 'react'
import './AnswerComment.css'
import { LiaReplySolid } from "react-icons/lia";

export default function AnswerComment({ respondCreatorName, respondCreatorRole, respondCreatorDate, respondCreatorContent, yourstyle, bgAnswer }) {
    return (
        <div className={`comments__ansewr ${yourstyle}`} style={{ backgroundColor: bgAnswer }}>

            <div className="comments__ansewr-header">

                <div className="comments__ansewr-header-right">
                    <div>
                        <p className="comments__ansewr-name comment-name">{respondCreatorName}</p>
                        <p className={`comment-status ${respondCreatorRole === 'USER' ? 'comment-status-user ' : respondCreatorRole === 'ADMIN' ? 'comment-status-admin' : ''}`}>
                            {
                                respondCreatorRole === 'USER' ? 'دانشجو' : respondCreatorRole === 'ADMIN' ? 'مدیر' : 'مدرس'
                            }
                        </p>
                    </div>
                    <p className="comments__ansewr-date comment-date">{respondCreatorDate}</p>
                </div>
            </div>

            <div className="comments__ansewr-text">
                <p className="comments__ansewr-paragraph comment-paragraph">{respondCreatorContent}</p>
            </div>

        </div>
    )
}
