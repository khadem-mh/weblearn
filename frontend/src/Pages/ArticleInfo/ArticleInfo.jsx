import React, { useEffect, useState } from 'react'
import './ArticleInfo.css'
import './media.css'
//components
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import CategoryBox from '../../Components/CategoryBox/CategoryBox'
import CourseCoverAside from '../../Components/CourseCoverAside/CourseCoverAside'
import ReapondComment from '../../Components/Comment/RespondComment/ReapondComment'
//icons
import { BsCalendar2Date, BsEye, BsShare } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import CopyLinkBox from '../../Components/CopyLinkBox/CopyLinkBox';
import { useParams } from 'react-router-dom'
import swal from 'sweetalert'
import sanitizeHtml from 'sanitize-html';

export default function ArticleInfo() {

  const [articleInfo, setArticleInfo] = useState(null)
  const { name } = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles/${name}`)
      .then(res => res.ok ? res.json() : res.text().then(err => { throw new Error(err) }))
      .then(datas => setArticleInfo(datas))
      .catch(err => swal({ title: 'مشکلی در ارتباط با سرور پیش امده', timer: 7000, icon: 'error', buttons: 'باشه' }))
  }, [name])

  useEffect(() => {
    console.log(articleInfo);
  }, [articleInfo])

  return (
    <>
      {articleInfo &&
        <section className="container-article-info page">

          {/* <!-- Start Breadcrumb --> */}
          <BreadCrumb
            links={
              [
                { to: 'all-articles/page/1', title: 'وبلاگ', },
                { title: articleInfo.title, to: false },
              ]
            }
          />
          {/*  <!-- Finish Breadcrumb --> */}



          <section className='blog-infos'>

            <section className='parent-right-page'>

              <div className='blog-infos__right'>

                <div className='blog-infos__parent-title'>
                  <h1 className='blog-infos__title title-main'>{articleInfo.title}</h1>
                </div>
                <hr />
                <section className='blog-infos__details'>
                  <div className='blog-infos__declare'>
                    <p>{articleInfo.creator.name}</p>
                    <IoPersonOutline className='blog-infos__declare-icon' />
                  </div>
                  <div className='blog-infos__declare'>
                    <p>{articleInfo.creator.createdAt.slice(0, 10).split('-').join('/')}</p>
                    <BsCalendar2Date className='blog-infos__declare-icon' />
                  </div>
                  <div className='blog-infos__declare'>
                    <p>{Math.floor(Math.random() * 1000)}</p>
                    <BsEye className='blog-infos__declare-icon' />
                  </div>
                </section>

                <section className='mx-4 mt-5'>
                  {
                    articleInfo.description
                  }
                  <img src={`/Images/Blogs/${articleInfo.cover}`} alt="card" className='rounded-4 my-5 w-100'/>
                  {
                    
                  }
                  <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(articleInfo.body) }}>

                  </div>
                  {/* fill full content from panel admin website  */}
                </section>

              </div>

              <div className="comments">
                <ReapondComment />
              </div>

            </section>

            <div className='blog-infos__left'>
              <section className='blog-infos__share'>

                <CopyLinkBox textForCopy={window.location.href} titleBox={'اشتراک گذاری مطلب'} children={<BsShare className='blog-infos__share-icon' />} fzTitle={'1.6rem'} />

                <CategoryBox title={'پیشنهاد مطالعه'}>
                  <CourseCoverAside fzTitle={'1.1rem'} pathImg={'Blogs/1.png'} title={'حداقل سیستم برای برنامه نویسی'} teacher={'محمد امین سعیدی راد'} link={'pwa'} />
                  <CourseCoverAside fzTitle={'1.1rem'} pathImg={'Blogs/2.png'} title={'بهترین افزونه های کروم برای برنامه نویسان'} teacher={'علی اکبری'} link={'typescript'} />
                  <CourseCoverAside fzTitle={'1.1rem'} pathImg={'Blogs/4.png'} title={'ابزار های ورد پرس'} teacher={'قاسم سلیمانی'} link={'blackjs'} />
                  <CourseCoverAside fzTitle={'1.1rem'} pathImg={'Blogs/5.png'} title={'نحوه یادگیری برنامه نویسی جاوا'} teacher={'خادم المهدی'} link={'blackjs'} />
                </CategoryBox>

              </section>
            </div>

          </section>


        </section>
      }
    </>
  )
}
