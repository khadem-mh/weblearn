import React, { useState, useLayoutEffect, useRef } from 'react'
import ReactDOM from 'react-dom';
import './CourseInfo.css'
import './Comments.css'
import './media.css'
//icons
import { GoShieldCheck } from "react-icons/go";
import { MdOutlineAccessTime, MdOutlineDateRange } from "react-icons/md";
import { FaUserFriends, FaUsers, FaRedRiver } from "react-icons/fa";
import { GiHandBag } from "react-icons/gi";
import { CiVideoOn } from "react-icons/ci";
import { FaStar, FaArrowRightFromBracket } from "react-icons/fa6";
import { RiFileCopy2Line } from "react-icons/ri";
//components
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import StatusBox from '../../Components/StatusBox/StatusBox';
import CourseCoverAside from '../../Components/CourseCoverAside/CourseCoverAside';
import TilteHeadeer from '../../Components/TilteHeadeer/TilteHeadeer';
import AccordionListVideo from '../../Components/AccordionListVideo/AccordionListVideo';
import ShowMoreDetails from '../../Components/ShowMoreDetails/ShowMoreDetails';
import ReapondComment from '../../Components/Comment/RespondComment/ReapondComment';
//Funcs
import faNumber from '../../Functions/FaNumber/FaNumber';

export default function CourseInfo() {

  const toastRef = useRef()
  const introductionRef = useRef()
  const [showCopyText, setShowCopyText] = useState('')

  useLayoutEffect(() => {
    if (showCopyText.length) {
      let timeToast = setTimeout(() => {
        toastRef.current.classList.replace('show', 'hide')
      }, 5000)
      return () => {
        clearTimeout(timeToast)
        setShowCopyText('')
      }
    }
  }, [showCopyText])

  const clickHandleCopy = (text) => {
    setShowCopyText('')
    if (toastRef.current) {
      if (toastRef.current.classList.contains('hide')) {
        toastRef.current.classList.replace('hide', 'show')
      }
    }
    navigator.clipboard.writeText(text)
      .then(() => {
        setShowCopyText('متن با موفقیت به کلیپ‌بورد کپی شد! 📋')
      })
      .catch(err => {
        setShowCopyText('مشکلی در کپی کردن متن به وجود آمده است')
      });
  }

  return (
    <>
      <section className="page-course-info page">

        <BreadCrumb
          links={
            [
              { to: 'category-info/frontend', title: 'برنامه نویسی فرانت اند', },
              { to: '#', title: 'آموزش برنامه نویسی React Js', },
            ]
          }
        />

        <section className="course-info">
          <div>
            <div className="course-info__parent-box">
              <div className="course-info__parent">

                <div className='course-info__header-top'>
                  <h1 className="course-info__title">
                    آموزش ری اکت ( ReactJS ) در دنیای واقعی | از 0 تا استخدام [منتورشیپ]
                  </h1>

                  <p className="course-info__text">
                    حدود 40 ساعت آموزش جامع و تخصصی ری اکت!  شما در دوره آموزش ری اکت ReactJS ، این کتابخانه قدرتمند و پر استفاده جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید! ری اکت گل سرسبد فرانت اند محسو
                  </p>
                </div>

                <div className='course-info__footer'>
                  <div className='course-info__footer_right'>
                    <button className='course-info__footer_btn'>
                      <GoShieldCheck className='course-info__footer_icon' />
                      <span className='course-info__footer_text-btn'>شرکت در دوره</span>
                    </button>
                  </div>

                  <div className='course-info__footer-left'>
                    <span className='course-info__footer-left_price'>{faNumber(4800000)}</span>
                    <span className='course-info__footer-left_toman'>تومان</span>
                  </div>

                </div>

              </div>

              <div className="mt-4 mt-md-0 parent-video">
                <video
                  poster='/Images/Courses/Burp-852x479-1.png'
                  src="https://tech.sabzlearn.ir/uploads/ce01010101it/js-expert-project/jsExPrjcts-59-blog-page-shared-components.mp4"
                  className="course-info__video" controls></video>
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

                      <StatusBox classParentBox={'col-12 col-sm-6 col-lg-4'} title={'وضعیت دوره'} subTitle={'تکمیل شده'} icon={<FaRedRiver />} />
                      <StatusBox classParentBox={'col-12 col-sm-6 col-lg-4'} title={'مدت زمان دوره'} subTitle={`${faNumber(99)} ساعت`} icon={<MdOutlineAccessTime />} />
                      <StatusBox classParentBox={'col-12 col-sm-6 col-lg-4'} title={'آخرین بروزرسانی'} subTitle={faNumber(1402, 12, 10)} icon={<MdOutlineDateRange />} />
                      <StatusBox classParentBox={'col-12 col-sm-6 col-lg-4'} title={'روش پشتیبانی'} subTitle={'گروه تلگرامی'} icon={<FaUserFriends />} />
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
                          <img src="images/info/1.png" alt="course-info"
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
                          <img src="images/info/2.jpg" alt="course-info"
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
                      <p>{faNumber(99, 26)}</p>
                    </div>
                    <AccordionListVideo
                      obj={{
                        'carousel - 1': [
                          { textBody: "اوزش js", hasPriceText: 'نقدی', isFree: false, time: '05:56', to: 'js' },
                          { textBody: "اوزش react", hasPriceText: 'نقدی', isFree: false, time: '15:06', to: 'react' },
                          { textBody: "اوزش css", hasPriceText: 'رایگان', isFree: true, time: '8:10', to: 'css' },
                        ],
                        'carousel - 2': [
                          { textBody: "اوزش nextJS", hasPriceText: 'نقدی', isFree: false, time: '02:36', to: 'next' },
                        ],
                        'carousel - 3': [
                          { textBody: "اوزش js", hasPriceText: 'نقدی', isFree: false, time: '05:56', to: 'js' },
                          { textBody: "اوزش react", hasPriceText: 'نقدی', isFree: false, time: '15:06', to: 'react' },
                        ],
                        'carousel-feature': []
                      }}
                    />
                  </div>

                  <div className="comments">

                    <div className="comments__content">

                      <ReapondComment
                        commentCreatorName={'محمدحسین خادم المهدی'}
                        commentCreatorRole={'user'}
                        commentCreatorDate={'1402/12/09'}
                        commentBody={'سلام آقای سعیدی راد از دوره ای که برگزار کردید بسیار سپاس گزارم'}

                        responds={[
                          {
                            name: 'محمد امین سعیدی راد', role: 'teachr', date: '1402/12/10', comment: "خیلی خوشحالم محمدحسین جانم که از این دوره راضی بودی موفق باشی☻", responds: [
                              { name: 'علی مرادی', role: 'user', date: '1402/12/10', comment: 'استاد چه زمانی این دوره به پایان میرسه' },
                              { name: 'محمد امین سعیدی راد', role: 'teacher', date: '1402/12/12', comment: 'مردای جان به شما هیچ ربطی نداره' },
                              { name: 'علی مرادی', role: 'user', date: '1402/12/13', comment: 'استاد من گزارش بد اخلاقیتون رو به مدیر دادم' },
                              { name: 'یاسین فراز دل', role: 'user', date: '1402/12/14', comment: 'انقدر شما دوتا بجه بازی در نیارین خجالت بکشین از سنتون با هردو تونم' },
                            ]
                          },

                          { name: 'عباس پور', role: 'user', date: '1402/12/29', comment: 'من با نظرت موافقم  خادم المهدی دمت گرم ♥' },

                          {
                            name: 'محمد امین سعیدی راد', role: 'teachr', date: '1402/12/10', comment: "خیلی خوشحالم محمدحسین جانم که از این دوره راضی بودی موفق باشی☻", responds: [
                              { name: 'علی مرادی', role: 'user', date: '1402/12/10', comment: 'خیلی ممنون بابت زحماتتون' },
                              { name: 'محمد امین سعیدی راد', role: 'teacher', date: '1402/12/12', comment: 'خواهش می کنم' }
                            ]
                          },

                          { name: 'محمد امین سعیدی راد', role: 'teacher', date: '1403/01/01', comment: 'من به عنوان بزرگترتون حق درام به گردنتون پس لطفا دهناتون رو ببندید' },

                        ]}
                      />

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
                          <StatusBox fzTitle='2rem' bgColor='var(--blue-lighter-color)' title={faNumber(1699)} subTitle={'دانشجو'} icon={<FaUsers />} />
                          <StatusBox fzTitle='2rem' bgColor='var(--blue-lighter-color)' title={faNumber(5, 0, undefined, true)} subTitle={'رضایت'} icon={<FaStar style={{ color: 'gold' }} />} />
                        </div>

                        <div className="course-info__bottom">

                          <div className='course-info__bottom-header'>
                            <p>درصد تکمیل دوره</p>
                            <p>{faNumber(75)}%</p>
                          </div>

                          <div className='course-info__bottom-footer w-100'>
                            <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                              <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '75%' }}></div>
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>

                    <div className='course-info course-box-details'>

                      <div className="techer-details__header">

                        <div className="techer-details__header-right">
                          <img src="images/info/teacher.png" alt="Teacher Profile" className="techer-details__header-img" />
                          <a href="/" className="techer-details__header-link">محمدامین سعیدی راد</a>
                        </div>

                        <div className="techer-details__header-left">
                          <span className="techer-details__header-name">مدرس دوره</span>
                          <FaArrowRightFromBracket className='techer-details__header-icon' />
                        </div>

                      </div>

                      <p className="techer-details__footer">
                        اولین کدم رو 14 سالگی زدم، حدود 9 سال پیش که با زبان ویژوال بیسیک بود و بعد حدودا 2 سال تو فیلد برنامه نویسی موبایل با زبان جاوا کار کردم و در نهایت با عشقی به اسم جاوا اسکریپت آشنا شدم و حدودا یه 7 سالی هست جاوا اسکریپت کد می‌زنم و به صورت Mern Stack فعالیت می‌کنم.
                      </p>

                    </div>
                  </section>

                  <div className="course-info d-none d-lg-block">
                    <div className="course-info__header-short-url">
                      <i className="fas fa-link course-info__short-url-icon"></i>
                      <span className="course-info__short-url-text">
                        لینک کوتاه
                      </span>
                    </div>
                    <p className="course-info__short-url">
                      <p>https://sabzlearn.ir/?p=117472</p>
                      <RiFileCopy2Line className='course-info__short-url-iconcopy' onClick={() => clickHandleCopy('https://sabzlearn.ir/?p=117472')} />
                    </p>
                  </div>

                  <div className="course-info d-none d-lg-block">
                    <span className="course-info__courses-title">دوره های مرتبط</span>
                    <ul className="course-info__courses-list">

                      <CourseCoverAside teacher={'سید محمد حسین خادم المهدی'} img={'PWA-min.jpg'} link={'pwa'} title={'دوره آموزشی Pwa'} />
                      <CourseCoverAside teacher={'محمد امین سعیدی راد'} img={'TypeScript-min-2.jpg'} link={'typescript'} title={'دوره آموزشی TypeScript'} />
                      <CourseCoverAside teacher={'قدیر یلمه'} img={'BJS-852x479-1.png'} link={'blackjs'} title={'دوره آموزشی هک و امنیت جاوااسکریپت سیاه'} />


                    </ul>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>


      </section>

      {showCopyText && ReactDOM.createPortal(
        <div className="toast align-items-center fade show toast-text-copy rounded-4" role="alert" aria-live="assertive" aria-atomic="true" ref={toastRef}>
          <div className="d-flex parent-toast">
            <div className="toast-body">
              {showCopyText}
            </div>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => {
              toastRef.current.classList.replace('show', 'hide')
              setShowCopyText('')
            }}></button>
          </div>
        </div>,
        document.documentElement.querySelector('#offcanvases')
      )}
    </>
  )
}
