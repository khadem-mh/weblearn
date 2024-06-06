import React, { useState } from 'react'
import './Article.css'
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { FaArrowCircleLeft } from "react-icons/fa";

export default function Article({ cover, title, description, shortName }) {

    const [imageLoaded, setImageLoaded] = useState(false)
    const onImageLoaded = () => setImageLoaded(true)

    return (
        <div className="col-12 article-card">
            <div className="article__card">

                <div className="article-card__header">
                    <Link to={`/article-info/${shortName}`} className="article-card__link-img">
                        <div className='blog__banner'>
                            <img
                                src={`/Images/Blogs/${cover}`}
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
                    <a href="/" className="article-card__link">{title}</a>
                    <p className="article-card__text line-clamp-article">{description}</p>
                </div>

                <p className="article-card__link-btn">
                    <Link to={`/article-info/${shortName}`} className='read-article'>مطالعه مقاله</Link>
                    <FaArrowCircleLeft className='article-card__icon-arrow' />
                </p>

            </div>
        </div>
    )
}
