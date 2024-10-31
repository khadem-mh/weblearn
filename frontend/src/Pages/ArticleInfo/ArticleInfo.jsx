import React, { useContext, useEffect, useState } from 'react'
import './ArticleInfo.css'
import './media.css'
//components
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import ReapondComment from '../../Components/Comment/RespondComment/ReapondComment'
//icons
import { BsCalendar2Date, BsEye, BsShare } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import CopyLinkBox from '../../Components/CopyLinkBox/CopyLinkBox';
import { useParams } from 'react-router-dom'
import swal from 'sweetalert'
import sanitizeHtml from 'sanitize-html';
import { AuthContext } from '../../Contexts/AuthContext'

export default function ArticleInfo() {

  const authContext = useContext(AuthContext)
  const [articleInfo, setArticleInfo] = useState(null)
  const { name } = useParams()

  useEffect(() => {
    fetch(`https://kind-tips-jam.loca.lt/v1/articles/${name}`)
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
                  <img src={`/Images/Blogs/${articleInfo.cover}`} alt="card" className='rounded-4 my-5 w-100' />
                  {

                  }
                  <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(articleInfo.body) }}>

                  </div>
                  {/* fill full content from panel admin website  */}
                </section>

              </div>

              <div className="comments">

                <div className="comments__content">
                  <ReapondComment showCommentHeader={authContext.isLoggedIn} />
                </div>

              </div>

            </section>

            <div className='blog-infos__left'>
              <section className='blog-infos__share'>

                <CopyLinkBox textForCopy={window.location.href} titleBox={'اشتراک گذاری مطلب'} children={<BsShare className='blog-infos__share-icon' />} fzTitle={'1.6rem'} />

              </section>
            </div>

          </section>


        </section>
      }
    </>
  )
}
