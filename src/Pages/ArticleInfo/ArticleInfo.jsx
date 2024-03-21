import React from 'react'
import './ArticleInfo.css'
import './media.css'
//components
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import faNumber from '../../Functions/FaNumber/FaNumber'
import CategoryBox from '../../Components/CategoryBox/CategoryBox'
import CourseCoverAside from '../../Components/CourseCoverAside/CourseCoverAside'
import ReapondComment from '../../Components/Comment/RespondComment/ReapondComment'
//icons
import { BsCalendar2Date, BsEye, BsShare } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import CopyLinkBox from '../../Components/CopyLinkBox/CopyLinkBox';

export default function ArticleInfo() {
  return (
    <section className="container-article-info page">

      {/* <!-- Start Breadcrumb --> */}
      <BreadCrumb
        links={
          [
            { to: 'category-articles', title: 'وبلاگ', },
            { title: 'بهترین وبسایت های فریلنسری خارجی', },
          ]
        }
      />
      {/*  <!-- Finish Breadcrumb --> */}



      <section className='blog-infos'>

        <section className='parent-right-page'>

          <div className='blog-infos__right'>

            <div className='blog-infos__parent-title'>
              <h1 className='blog-infos__title title-main'>بهترین سایت های فریلنسری خارجی</h1>
            </div>
            <hr />
            <section className='blog-infos__details'>
              <div className='blog-infos__declare'>
                <p>محمد حسین نصرتی</p>
                <IoPersonOutline className='blog-infos__declare-icon' />
              </div>
              <div className='blog-infos__declare'>
                <p>{faNumber(1402, 12, 29)}</p>
                <BsCalendar2Date className='blog-infos__declare-icon' />
              </div>
              <div className='blog-infos__declare'>
                <p>{faNumber(379)}</p>
                <BsEye className='blog-infos__declare-icon' />
              </div>
            </section>

            <section>
              {/* fill full content from panel admin website  */}
            </section>

          </div>

          <div className="comments">
            <ReapondComment />
          </div>

        </section>

        <div className='blog-infos__left'>
          <section className='blog-infos__share'>

            <CopyLinkBox textForCopy={'https://sabzlearn.ir/?blog=31592'} titleBox={'اشتراک گذاری مطلب'} children={<BsShare className='blog-infos__share-icon' />} fzTitle={'1.6rem'} />

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
  )
}
