import React, { useState } from 'react'
import './Article.css'
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { FaArrowCircleLeft } from "react-icons/fa";

export default function Article({ srcImg, titleArticle, detailsArticle }) {

    const [imageLoaded, setImageLoaded] = useState(false)
    const onImageLoaded = () => setImageLoaded(true)

    return (
        <div className="col-12 article-card">
            <div className="article__card">

                <div className="article-card__header">
                    <Link to="/article-info" className="article-card__link-img">
                        <div className='blog__banner'>
                            <img
                                src={`Images/Blogs/${srcImg}`}
                                alt="card"
                                className="article-card__img"
                                onLoad={onImageLoaded}
                            />
                            {
                                !imageLoaded &&
                                <div className='parent-spinner'>
                                    <Spinner animation="grow" variant="success" />
                                </div>
                            }
                        </div>
                    </Link>
                </div>

                <div className="article-card__content">
                    <a href="/" className="article-card__link">{titleArticle}</a>
                    <p className="article-card__text line-clamp-article">{detailsArticle}</p>
                </div>

                <p className="article-card__link-btn">
                    <Link to="/article-info" className='read-article'>مطالعه مقاله</Link>
                    <FaArrowCircleLeft className='article-card__icon-arrow' />
                </p>

            </div>
        </div>
    )
}
