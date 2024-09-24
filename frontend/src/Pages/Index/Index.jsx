import React, { useEffect, useReducer } from 'react'
import './Index.css'
//components
import Course from '../../Components/Course/Course'
import AboutUsBox from '../../Components/AboutUsBox/AboutUsBox'
import SwiperComponent from '../../Components/Swiper/Swiper'
import Article from '../../Components/Article/Article'
import HeaderTitle from '../../Components/HeaderTitle/HeaderTitle'
import swal from 'sweetalert'

const reducerIndexPage = (state = {}, action) => {
  switch (action.type) {
    case 'LAST_COURSES': return { ...state, lastCourses: action.payload }
    case 'LAST_ARTICLES': return { ...state, lastArticles: action.payload }
    case 'PRESELL__COURSES': return { ...state, presellCourses: action.payload }
    case 'POPULAR__COURSES': return { ...state, popularCourses: action.payload }
    default: return state
  }
}

export default function Index() {

  const [state, dispatch] = useReducer(reducerIndexPage, {
    lastCourses: [],
    lastArticles: [],
    presellCourses: [],
    popularCourses: [],
  })


  useEffect(() => {

    fetch(`http://localhost:4000/v1/courses`)
      .then(res => res.ok ? res.json() : res.text().then(err => { throw new Error(err) }))
      .then(allCourses => dispatch({ type: 'LAST_COURSES', payload: allCourses.reverse().slice(0, 8) }))
      .catch(err => swal({ title: 'مشکلی در ارتباط با سرور پیش امده', timer: 7000, icon: 'error', buttons: 'باشه' }))

    fetch(`http://localhost:4000/v1/articles`)
      .then(res => res.ok ? res.json() : res.text().then(err => { throw new Error(err) }))
      .then(allArticles => dispatch({ type: 'LAST_ARTICLES', payload: allArticles.reverse().slice(0, 8) }))
      .catch(err => swal({ title: 'مشکلی در ارتباط با سرور پیش امده', timer: 7000, icon: 'error', buttons: 'باشه' }))

    fetch(`http://localhost:4000/v1/courses/presell`)
      .then(res => res.ok ? res.json() : res.text().then(err => { throw new Error(err) }))
      .then(presell => dispatch({ type: 'PRESELL__COURSES', payload: presell.reverse().slice(0, 8) }))
      .catch(err => swal({ title: 'مشکلی در ارتباط با سرور پیش امده', timer: 7000, icon: 'error', buttons: 'باشه' }))

    fetch(`http://localhost:4000/v1/courses/popular`)
      .then(res => res.ok ? res.json() : res.text().then(err => { throw new Error(err) }))
      .then(popular => dispatch({ type: 'POPULAR__COURSES', payload: popular.reverse().slice(0, 8) }))
      .catch(err => swal({ title: 'مشکلی در ارتباط با سرور پیش امده', timer: 7000, icon: 'error', buttons: 'باشه' }))
  }, [])

  return (
    <section className="page">

      <article id="courses" style={{ marginTop: '13rem' }}>
        <div className="container">

          <HeaderTitle routeUrl={'/all-courses/page/1'} title={'جدیدترین دوره ها'} subTitle={'سکوی پرتاپ شما به سمت موفقیت'} textBtn={'تمامی دوره ها'} />

          <div className="courses-content">
            <div className="container">

              <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4" id="courses-container">
                {
                  state.lastCourses.length && state.lastCourses.map((courseInformation, index) => (
                    <Course
                      key={index}
                      {...courseInformation}
                    />
                  ))
                }

              </div>

            </div>
          </div>

        </div>
      </article>

      <article>
        <div className="container">

          <div className="about-us__header">
            <span className="about-us__title title">ما چه کمکی بهتون میکنیم ؟</span>
            <span className="about-us__subtitle">از اونجایی که آکادمی وب لرن یک آکادمی خصوصی هست</span>
          </div>

          <div className="container">
            <div className="row row-cols-sm-1 row-cols-lg-2">

              <AboutUsBox iconBox={<i className="far fa-copyright about-us__icon"></i>} titleBox={'دوره های اختصاصی'} subTitleBox={'با پشتیبانی و کیفیت بالا اراِئه میده'} />
              <AboutUsBox iconBox={<i className="fas fa-leaf about-us__icon"></i>} titleBox={'اجازه تدریس'} subTitleBox={'به هر مدرسی رو نمیده. چون کیفیت براش مهمه !'} />
              <AboutUsBox iconBox={<i className="fas fa-gem about-us__icon"></i>} titleBox={'دوره پولی و رایگان'} subTitleBox={'براش مهم نیست. به مدرسینش حقوق میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره ارائه بده'} />
              <AboutUsBox iconBox={<i className="fas fa-crown about-us__icon"></i>} titleBox={'اهمیت به کاربر'} subTitleBox={'اولویت اول و آخر آکادمی آموزش برنامه نویسی وب لرن اهمیت به کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست'} />

            </div>
          </div>

        </div>
      </article>

      <article className="popular">
        <div className="container">

          <div className="popular__header">
            <span className="popular__title title">محبوب ترین دوره ها</span>
          </div>
          <SwiperComponent>
            {
              state.popularCourses.length && state.popularCourses.map((courseInformation, index) => (
                <Course
                  key={index}
                  {...courseInformation}
                  courseBadg={'پرطرفدارترین'}
                />
              ))
            }
          </SwiperComponent>

        </div>
      </article>

      <article className="presell">
        <div className="container">
          <div className="presell__header">
            <span className="presell__title title">دوره های در حال پیش فروش</span>
          </div>

          <SwiperComponent>
            {
              state.presellCourses.length && state.presellCourses.map((courseInformation, index) => (
                <Course
                  key={index}
                  {...courseInformation}
                  courseBadg={'پیش فروش'}
                />
              ))
            }
          </SwiperComponent>

        </div>
      </article>

      <article className="article">
        <div className="container">

          <HeaderTitle routeUrl={'all-articles/page/1'} title={'جدیدترین مقاله ها'} subTitle={'پیش به سوی ارتقای دانش'} textBtn={'تمامی مقاله ها'} />

          <div className="article__content">
            <div className="row row-cols-sm-2 row-cols-md-3 row-cols-xl-4 d-flex justify-content-center justify-content-sm-start" id="articles-wrapper">
              {
                state.lastArticles.length && state.lastArticles.map((articleInformation, index) => (
                  <Article
                    key={index}
                    {...articleInformation}
                  />
                ))
              }
            </div>
          </div>

        </div>
      </article>

    </section>
  )
}
