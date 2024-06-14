import React, { useEffect, useReducer } from "react";
import './SearchGlobal.css'
import Course from "../../Components/Course/Course";
import HeaderTitle from "../../Components/HeaderTitle/HeaderTitle"
import Article from "../../Components/Article/Article"

const reducerIndexPage = (state = {}, action) => {
    switch (action.type) {
        case 'COURSES': return { ...state, courses: action.payload }
        case 'ARTICLES': return { ...state, articles: action.payload }
        default: return state
    }
}

export default function SearchGlobal() {

    const [state, dispatch] = useReducer(reducerIndexPage, {
        courses: [],
        articles: [],
    })

    useEffect(() => {

    }, [])

    return (
        <div>

            <h1 className="category-h2 mt-5">نتایج جستجو</h1>

            <article id="courses" style={{ marginTop: '13rem', marginBottom: '10rem' }}>
                <div className="container">

                    {state.courses.length ?
                        <>
                            <HeaderTitle title={'دوره ها'} subTitle={'سکوی پرتاپ شما به سمت موفقیت'} textBtn={`${state.courses.length} دوره`} />

                            <div className="courses-content">
                                <div className="container">

                                    <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4" id="courses-container">
                                        {
                                            state.courses.length && state.courses.map((courseInformation, index) => (
                                                <Course
                                                    key={index}
                                                    {...courseInformation}
                                                />
                                            ))
                                        }

                                    </div>

                                </div>
                            </div>
                        </>
                        :
                        <HeaderTitle title={'دوره ها'} textBtn={'هیچ دوره ای برای سرچ شما وجود ندارد'} />
                    }

                </div>
            </article>


            <article className="article">
                <div className="container">

                    {
                        state.articles.length
                            ?
                            <>
                                <HeaderTitle title={'مقالات'} subTitle={'پیش به سوی ارتقای دانش'} textBtn={`${state.courses.length} مقاله`} />

                                <div className="article__content">
                                    <div className="row row-cols-sm-2 row-cols-md-3 row-cols-xl-4 d-flex justify-content-center justify-content-sm-start" id="articles-wrapper">
                                        {
                                            state.articles.length && state.articles.map((articleInformation, index) => (
                                                <Article
                                                    key={index}
                                                    {...articleInformation}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </>
                            :
                            <HeaderTitle title={'مقالات'} textBtn={'هیچ مقاله ای برای سرچ شما وجود ندارد'} />
                    }
                </div>
            </article>

        </div>
    )
}