import React, { useEffect, useState } from "react";
import './SearchGlobal.css'
import Course from "../../Components/Course/Course";
import HeaderTitle from "../../Components/HeaderTitle/HeaderTitle"
import Article from "../../Components/Article/Article"
import { useParams } from "react-router-dom";
import swal from 'sweetalert'

export default function SearchGlobal() {

    const { val } = useParams()

    const [courses, setCourses] = useState([])
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/v1/search/${val.slice(2)}`)
            .then(res => res.ok ? res.json() : res.text().then(err => { throw new Error(err) }))
            .then(allResult => {
                console.log(allResult);
                setCourses(allResult.allResultCourses)
                setArticles(allResult.allResultArticles)
            })
            .catch(err => swal({ title: 'مشکلی در ارتباط با سرور پیش امده', timer: 7000, icon: 'error', buttons: 'باشه' }))
    }, [val])

    return (
        <div>

            <h1 className="category-h2 mt-5">نتایج جستجو</h1>

            <article id="courses" style={{ marginTop: '13rem', marginBottom: '10rem' }}>
                <div className="container">

                    {courses.length ?
                        <>
                            <HeaderTitle title={'دوره ها'} subTitle={'سکوی پرتاپ شما به سمت موفقیت'} textBtn={`${courses.length} دوره`} />

                            <div className="courses-content">
                                <div className="container">

                                    <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4" id="courses-container">
                                        {
                                            courses.map((courseInformation, index) => (
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
                        articles.length
                            ?
                            <>
                                <HeaderTitle title={'مقالات'} subTitle={'پیش به سوی ارتقای دانش'} textBtn={`${articles.length} مقاله`} />

                                <div className="article__content">
                                    <div className="row row-cols-sm-2 row-cols-md-3 row-cols-xl-4 d-flex justify-content-center justify-content-sm-start" id="articles-wrapper">
                                        {
                                            articles.map((articleInformation, index) => (
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