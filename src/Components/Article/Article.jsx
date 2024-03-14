import React from 'react'
import './Article.css'
import { FaArrowCircleLeft } from "react-icons/fa";

export default function Article({ srcImg, titleArticle, detailsArticle }) {
    return (
        <div className="col-12">
            <div className="article__card">

                <div className="article-card__header">
                    <a href="/" className="article-card__link-img">
                        <div className='blog__banner'>
                            <img src={`Images/Blogs/${srcImg}`} alt="card" className="article-card__img" />
                        </div>
                    </a>
                </div>

                <div className="article-card__content">
                    <a href="/" className="article-card__link">{titleArticle}</a>
                    <p className="article-card__text line-clamp-article">{detailsArticle}</p>
                </div>

                <p className="article-card__link-btn">
                    <hr />
                    <a href="/" className='read-article'>مطالعه مقاله</a>
                    <FaArrowCircleLeft className='article-card__icon-arrow' />
                </p>

            </div>
        </div>
    )
}
