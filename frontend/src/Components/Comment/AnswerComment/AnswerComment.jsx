import React from 'react'
import './AnswerComment.css'
import { LiaReplySolid } from "react-icons/lia";

export default function AnswerComment({ respondCreatorName, respondCreatorRole, respondCreatorDate, respondCreatorContent, yourstyle, setFunc, bgAnswer }) {
    return (
        <div className={`comments__ansewr ${yourstyle}`} style={{ backgroundColor: bgAnswer }}>

            <div className="comments__ansewr-header">

                <div className="comments__ansewr-header-right">
                    <div>
                        <p className="comments__ansewr-name comment-name">{respondCreatorName}</p>
                        <p className={`comment-status ${respondCreatorRole === 'user' ? 'comment-status-user ' : ''}`}>
                            {
                                respondCreatorRole === 'user' ? 'دانشجو' : 'مدرس'
                            }
                        </p>
                    </div>
                    <p className="comments__ansewr-date comment-date">{respondCreatorDate}</p>
                </div>
                {
                    !bgAnswer &&
                    <div className="comments__ansewr-header-left">
                        <button className="comments__ansewr-header-link comment-link" onClick={() => setFunc(true)}><LiaReplySolid /></button>
                    </div>
                }
            </div>

            <div className="comments__ansewr-text">
                <p className="comments__ansewr-paragraph comment-paragraph">{respondCreatorContent}</p>
            </div>

        </div>
    )
}
