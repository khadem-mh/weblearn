import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import './CourseInfo.css'
import './Comments.css'
import './media.css'
//?package
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
//?icons
import { GoShieldCheck } from "react-icons/go";
import { MdOutlineAccessTime, MdOutlineDateRange } from "react-icons/md";
import { FaUserFriends, FaUsers, FaRedRiver } from "react-icons/fa";
import { GiHandBag } from "react-icons/gi";
import { CiVideoOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
//!components
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import StatusBox from '../../Components/StatusBox/StatusBox';
import CourseCoverAside from '../../Components/CourseCoverAside/CourseCoverAside';
import TilteHeadeer from '../../Components/TilteHeadeer/TilteHeadeer';
import AccordionListVideo from '../../Components/AccordionListVideo/AccordionListVideo';
import ShowMoreDetails from '../../Components/ShowMoreDetails/ShowMoreDetails';
import ReapondComment from '../../Components/Comment/RespondComment/ReapondComment';
import CopyLinkBox from '../../Components/CopyLinkBox/CopyLinkBox';
import CategoryBox from '../../Components/CategoryBox/CategoryBox';
import DetailsTeacher from '../../Components/DetailsTeacher/DetailsTeacher';
//?Funcs
import faNumber from '../../Functions/FaNumber/FaNumber';
import { AuthContext } from '../../Contexts/AuthContext'

export default function CourseInfo() {

  const authContext = useContext(AuthContext)
  const [courseInfo, setCourseInfo] = useState({})
  const [allcourses, setAllCourses] = useState([])
  const [coursesRelated, setCoursesRelated] = useState([])
  const [comments, setComments] = useState([])
  const [maxScore, setMaxScore] = useState(0)
  const [sessions, setSessions] = useState([])
  const [durationTimeMinuteCourses, setDurationTimeMinuteCourses] = useState(null)
  const [durationTimeHoursCourses, setDurationTimeHoursCourses] = useState(null)
  const location = useLocation()
  const introductionRef = useRef()
  const params = useParams()

  useEffect(() => {

    const userToken = JSON.parse(localStorage.getItem('user'))

    fetch(`http://localhost:4000/v1/courses/covers/${courseInfo.cover}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken && userToken.token ? userToken.token : ''}`
      }
    })
    .then(res => res.json())
    .then(datas => console.log(datas))

    fetch(`http://localhost:4000/v1/courses/${params.course}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken && userToken.token ? userToken.token : ''}`
      }
    })
      .then(res => res.json())
      .then(datas => {
        console.log(datas);
        setCourseInfo(datas)
        setComments(datas.comments)
        setSessions(datas.sessions)
      })

    fetch(`http://localhost:4000/v1/courses`)
      .then(res => res.json())
      .then(courses => setAllCourses(courses))
  }, [location])

  useEffect(() => {
    if (courseInfo?.name && allcourses.length >= 2) {
      let filterCourses = [...allcourses].filter(course => course.categoryID.name === courseInfo.categoryID.name && course)
      let randomChooseItem = filterCourses.sort(() => 0.5 - Math.random())
      setCoursesRelated(randomChooseItem.slice(0, 3))
    } else setCoursesRelated([])
  }, [allcourses, courseInfo])

  useEffect(() => {
    console.log(sessions);
    if (sessions) {
      let sessionMinuteTime = 0
      sessions.map(session => sessionMinuteTime += +session.time.split(':')[0])
      sessionMinuteTime >= 60 ? setDurationTimeHoursCourses(Math.floor(sessionMinuteTime / 60)) : setDurationTimeMinuteCourses(sessionMinuteTime)
    }
  }, [sessions])

  useEffect(() => {
    let commentScore = []
    if (comments && comments.length) {
      comments.map(comment => commentScore.push(comment.score))
      let maxScore = commentScore.reduce((prevNum, currentNum) => prevNum < currentNum ? currentNum : prevNum, 0)
      setMaxScore(maxScore)
    }
  }, [comments])

  return (
    <>
      {
        courseInfo.createdAt &&
        <section className="page-course-info page">

          <BreadCrumb
            links={
              [
                { to: `${courseInfo.categoryID.name}/page/1`, title: `${courseInfo.categoryID.title}` },
                { to: `course-info/${courseInfo.shortName}`, title: `${courseInfo.name}` },
              ]
            }
          />

          <section className="course-info">
            <div>
              <div className="course-info__parent-box">
                <div className="course-info__parent">

                  <div className='course-info__header-top'>
                    <h1 className="course-info__title">
                      {courseInfo.name}
                    </h1>

                    <p className="course-info__text">
                      {courseInfo.description}
                    </p>
                  </div>

                  <div className='course-info__footer'>
                    <div className='course-info__footer_right'>
                      <button className='course-info__footer_btn'>
                        <GoShieldCheck className='course-info__footer_icon' />
                        <span className='course-info__footer_text-btn'>{courseInfo.isUserRegisteredToThisCourse ? 'دانشجوی این دوره' : 'شرکت در دوره'}</span>
                      </button>
                    </div>

                    <div className='course-info__footer-left'>
                      <span className='course-info__footer-left_price'>{!courseInfo.price ? 'رایگان' : faNumber(courseInfo.price)}</span>
                      <span className='course-info__footer-left_toman'>{courseInfo.price === 0 ? '' : 'تومان'}</span>
                    </div>

                  </div>

                </div>

                <div className="mt-4 mt-md-0 parent-video">
                  <div className='container-plyr course-info__video'>
                    <Plyr
                      source={{
                        type: 'video',
                        poster: '',
                        ratio: '16:9',
                        sources: [
                          {
                            src: 'Images/video-1.mp4',
                            type: 'video/mp4',
                          },
                        ],
                      }}
                      options={{
                        controls: [
                          'play-large',
                          'play',
                          'progress',
                          'current-time',
                          'mute',
                          'volume',
                          'captions',
                          'settings',
                          'pip',
                          'airplay',
                          'fullscreen'
                        ],
                        autoplay: false,
                        volume: 0.5,
                      }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>

          <section className="main">
            <div>
              <div className="row row-cols-lg-2">

                <div className="col-12 col-lg-8">
                  <div className="course">

                    <div className="course-boxes">
                      <div className="row row-cols-3">

                        <StatusBox classParentBox={'col-12 col-sm-6 col-lg-4'} title={'وضعیت دوره'} subTitle={courseInfo.isComplete === 1 ? 'تکمیل شده' : 'در حال برگزاری'} icon={<FaRedRiver />} />
                        <StatusBox classParentBox={'col-12 col-sm-6 col-lg-4'} title={'مدت زمان دوره'} subTitle={sessions.length ? `${durationTimeHoursCourses ? `${durationTimeHoursCourses} ساعت` : `${durationTimeMinuteCourses} دقیقه`}` : 'در حال ظبط'} icon={<MdOutlineAccessTime />} />
                        <StatusBox classParentBox={'col-12 col-sm-6 col-lg-4'} title={'آخرین بروزرسانی'} subTitle={courseInfo.updatedAt.slice(0, 10).split('-').join('/')} icon={<MdOutlineDateRange />} />
                        <StatusBox classParentBox={'col-12 col-sm-6 col-lg-4'} title={'روش پشتیبانی'} subTitle={courseInfo.support} icon={<FaUserFriends />} />
                        <StatusBox classParentBox={'col-12 col-sm-6 col-lg-4'} title={'پیش نیاز'} subTitle={'HTML & CSS & JS'} icon={<GiHandBag />} />
                        <StatusBox classParentBox={'col-12 col-sm-6 col-lg-4'} title={'نوع مشاهده'} subTitle={'دانلودی/آنلاین'} icon={<CiVideoOn />} />

                      </div>
                    </div>

                    <div className='parent-introduction'>
                      <div style={{ borderRadius: '1.5rem', overflow: 'hidden' }}>
                        <div className="introduction unShowOveflowYDetails" ref={introductionRef}>

                          <div className="introduction__item">
                            <TilteHeadeer title={'توضیحات'} />
                            <p className="introduction__text">
                              کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد و سالانه چندین
                              کتابخانه
                              جدید نیز به این لیست اضافه می شود که در بازار کار به شدت از آن ها استفاده می شود
                              و
                              اگر بدون بلد بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت خواهید شد و حتی
                              ممکن است ناامید شوید!
                            </p>
                            <img src={`/images/courses/${courseInfo.cover}`} alt="course-info"
                              className="introduction__img img-fluid" />
                            <p className="introduction__text">
                              در این دوره نحوه کار با 20 مورد از پر استفاده ترین کتابخانه های جاوا اسکریپت به
                              صورت
                              پروژه محور به شما عزیزان آموزش داده می شود تا هیچ مشکلی برای ورود به بازار کار
                              نداشته باشید
                            </p>
                          </div>

                          <div className="introduction__item">
                            <TilteHeadeer title={'هدف از این دوره چیست'} />
                            <img src="/images/info/2.jpg" alt="course-info"
                              className="introduction__img img-fluid" />
                            <p className="introduction__text">
                              وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم، از کتابخانه هایی به
                              اسم
                              Lodash و Formik استفاده می شد، در حالی که من اولین بارم بود اسم Formik را می
                              شنیدم و
                              تا اون موقع از این کتابخانه ها استفاده نکرده بودم.
                            </p>
                            <p className="introduction__text">
                              همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از مهم ترین مباحثی هستند
                              که هر
                              برنامه نویس وب برای ورود به بازار کار و کسب درآمد بهتر، راحت و بیشتر باید با آن
                              ها
                              کار کرده باشد </p>
                            <p className="introduction__text">
                              همان طور که از اسم این دوره مشخص است، هدف از این دوره آموزش 20 مورد از کاربردی
                              ترین
                              و پر استفاده ترین کتابخانه های جاوا اسکریپت است تا شما بتوانید بعد از این دوره
                              با
                              قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را ادامه دهید، ری اکت یا نود یا …
                              را
                              راحت تر یاد بگیرید و در نهایت وارد بازار کار شده و کسب درآمد کنید.
                            </p>
                            <p className="introduction__text">
                              شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی کار نکرده باشید، باید
                              بلد
                              باشید که چطور باید یک کتابخانه جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید
                              ساخته شد. آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                            </p>
                            <p className="introduction__text">
                              در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه، نحوه یادگیری یک
                              کتابخانه
                              جدید را نیز به شما عزیزان آموزش دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ
                              دوره یا
                              شخص خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و وب اضافه شد، به
                              راحتی
                              بتوانید آن را یاد بگیرید.
                            </p>
                          </div>

                        </div>
                        <ShowMoreDetails refDetails={introductionRef} />
                      </div>
                    </div>

                    <div className="introduction__topic">
                      <div className='introduction__header'>
                        <TilteHeadeer title={'سرفصل های دوره'} yourStyle={'mt-0'} />
                        <p>
                          {
                            sessions.length ? durationTimeHoursCourses ? `+${durationTimeHoursCourses} ساعت` : `+${durationTimeMinuteCourses} دقیقه` : 'در حال ظبط'
                          }
                        </p>
                      </div>
                      <AccordionListVideo sessionsList={sessions} shortNameCourse={courseInfo.shortName}/>
                    </div>

                    <div className="comments">

                      <div className="comments__content">
                        {
                          comments.length === 0
                            ?
                            <ReapondComment />
                            :
                            <ReapondComment commentsArr={comments} showCommentHeader={authContext.isLoggedIn} />
                        }

                      </div>

                    </div>

                  </div>
                </div>

                <div className="col-12 col-lg-4 sidebar">

                  <div className="courses-info">

                    <section className='parent-course-box-details-aside'>
                      <div className="course-info course-box-teacher">
                        <div className="course-info__total">

                          <div className="course-info__top">
                            <StatusBox fzTitle='2rem' bgColor='var(--blue-lighter-color)' title={courseInfo.courseStudentsCount !== 0 ? faNumber(courseInfo.courseStudentsCount) : '0'} subTitle={'دانشجو'} icon={<FaUsers />} />
                            <StatusBox fzTitle='2rem' bgColor='var(--blue-lighter-color)' title={`0.${maxScore ? maxScore : 5}`} subTitle={'رضایت'} icon={<FaStar style={{ color: 'gold' }} />} />
                          </div>

                        </div>
                      </div>

                      {
                        courseInfo.createdAt &&
                        <DetailsTeacher
                          nameTeacher={courseInfo.creator.name}
                          imgTeacher={courseInfo.creator.profile}
                          textBio={''}
                          to={'/'}
                        />
                      }


                    </section>


                    <CopyLinkBox textForCopy={`http://localhost:3000/course-info/${params.course}`} titleBox={'لینک کوتاه'} yourStyle={'d-none d-lg-block'} children={<i className="fas fa-link short-url-icon"></i>} />

                    {
                      coursesRelated.length >= 2
                        ?
                        <CategoryBox title={'دوره های مرتبط'} yourStyle={'d-none d-lg-block'}>
                          {
                            coursesRelated.map((course, index) => (
                              <CourseCoverAside key={index} teacher={course.creator} pathImg={`/images/courses/${course.cover}`} link={`course-info/${course.shortName}`} title={course.name} />
                            ))
                          }
                        </CategoryBox>
                        :
                        <div>
                          <CategoryBox title={'دوره های مرتبط'} yourStyle={'d-none d-lg-block'}>
                            <p className='text-center text-secondary'>فعلا دوره ای قرار نگرفته است</p>
                          </CategoryBox>
                        </div>
                    }


                  </div>
                </div>

              </div>
            </div>
          </section>
        </section>
      }
    </>
  )
}
