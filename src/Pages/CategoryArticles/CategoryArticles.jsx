import React from 'react'
import './CategoryArticles.css'
//icons
import { RiSearchLine } from "react-icons/ri";
import { ImSortAmountDesc } from "react-icons/im";
//components
import Article from '../../Components/Article/Article';
import OffCanvasBottom from '../../Components/OffCanvasesMenu/OffCanvasBottom/OffCanvasBottom';
import FilterCategory from '../../Components/FilterCategory/FilterCategory';
import Pagination from '../../Components/Pagination/Pagination'
import CategorySort from '../../Components/CategorySort/CategorySort'

export default function CategoryArticles() {
  return (
    <section className='page category-page'>

      <h2 className='category-h2'>مقالات</h2>

      <div className='category-filters'>

        <aside className='category-aside'>

          <section className='category-research'>
            <input type="text" className='category-research__input' placeholder='در بین مقالات جستجو کنید' />
            <RiSearchLine className='category-research__icon' />
          </section>

          <div className='d-flex align-items-center justify-content-center'>
            <OffCanvasBottom displayCanvas={'d-flex d-sm-none'} iconBtn={<ImSortAmountDesc />} titleHeader={'مرتب سازی بر اساس'} namesLi={['همه مقالات', 'جدیدترین', 'قدیمی ترین', 'پرمخاطب ترین']} />
          </div>

          <div className='d-none d-sm-block'>
            <FilterCategory categorySwitch={false} titleCategory={'دسته بندی مقالات'}/>
          </div>

        </aside>

        <div className='category-courses-and-sort-parent'>

          <CategorySort />

          <section className='category-courses'>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-xl-3" id="courses-container">

              <Article srcImg={'1.png'} titleArticle={"آیا زبان برنامه نویسی پایتون بهتر است یا جاوااسکریپت؟"} detailsArticle={"شاید این سوال برایتان پیش آمده است که برای شروع طراحی وبسایت از کدام زبان استفاده کنم ما در این مقاله کامل به شما توضیح می دهیم که چه معیار هایی برای شروع بهتر است"} />
              <Article srcImg={'2.png'} titleArticle={"آیا زبان برنامه نویسی پایتون بهتر است یا جاوااسکریپت؟"} detailsArticle={"شاید این سوال برایتان پیش آمده است که برای شروع طراحی وبسایت از کدام زبان استفاده کنم ما در این مقاله کامل به شما توضیح می دهیم که چه معیار هایی برای شروع بهتر است"} />
              <Article srcImg={'3.png'} titleArticle={"آیا زبان برنامه نویسی پایتون بهتر است یا جاوااسکریپت؟"} detailsArticle={"شاید این سوال برایتان پیش آمده است که برای شروع طراحی وبسایت از کدام زبان استفاده کنم ما در این مقاله کامل به شما توضیح می دهیم که چه معیار هایی برای شروع بهتر است"} />
              <Article srcImg={'4.png'} titleArticle={"آیا زبان برنامه نویسی پایتون بهتر است یا جاوااسکریپت؟"} detailsArticle={"شاید این سوال برایتان پیش آمده است که برای شروع طراحی وبسایت از کدام زبان استفاده کنم ما در این مقاله کامل به شما توضیح می دهیم که چه معیار هایی برای شروع بهتر است"} />
              <Article srcImg={'5.png'} titleArticle={"آیا زبان برنامه نویسی پایتون بهتر است یا جاوااسکریپت؟"} detailsArticle={"شاید این سوال برایتان پیش آمده است که برای شروع طراحی وبسایت از کدام زبان استفاده کنم ما در این مقاله کامل به شما توضیح می دهیم که چه معیار هایی برای شروع بهتر است"} />
              <Article srcImg={'6.png'} titleArticle={"آیا زبان برنامه نویسی پایتون بهتر است یا جاوااسکریپت؟"} detailsArticle={"شاید این سوال برایتان پیش آمده است که برای شروع طراحی وبسایت از کدام زبان استفاده کنم ما در این مقاله کامل به شما توضیح می دهیم که چه معیار هایی برای شروع بهتر است"} />

            </div>
          </section>

        </div>

      </div>

      <Pagination />
    </section>
  )
}
