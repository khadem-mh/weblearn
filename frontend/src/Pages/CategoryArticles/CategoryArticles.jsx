import React, { useState, useEffect } from 'react'
import './media.css'
import '../../Css/categories.css'
//icons
import { RiSearchLine } from "react-icons/ri";
import { ImSortAmountDesc } from "react-icons/im";
//components
import Article from '../../Components/Article/Article';
import OffCanvasBottom from '../../Components/OffCanvasesMenu/OffCanvasBottom/OffCanvasBottom';
import FilterCategory from '../../Components/FilterCategory/FilterCategory';
import Pagination from "react-pagination-master"
import CategorySort from '../../Components/CategorySort/CategorySort'
//
import swal from 'sweetalert';

export default function CategoryArticles() {

  const [allArticles, setAllArticles] = useState([])
  const [filterArticlesPage, setFilterArticlesPage] = useState([])
  //
  const [filterArticlesTypes, setFilterArticlesTypes] = useState('all')
  const [selectedItem, setSelectedItem] = useState(4)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then(res => res.ok ? res.json() : res.text().then(err => { throw new Error(err) }))
      .then(allDatas => setAllArticles(allDatas))
      .catch(err => swal({ title: 'مشکلی در ارتباط با سرور پیش امده', timer: 7000, icon: 'error', buttons: 'باشه' }))
  }, [])

  useEffect(() => {
    switch (filterArticlesTypes.newText || filterArticlesTypes) {
      case 'all': {
        setCategories(filterArticlesTypes.newText ? categories : allArticles)
        setSelectedItem(4)
        break
      }
      case 'past': {
        setCategories([...categories].reverse())
        setSelectedItem(5)
        break
      }
      case 'new': {
        setCategories([...categories])
        setSelectedItem(6)
        break
      }
      default: setCategories(allArticles)
    }
  }, [filterArticlesTypes])

  const handleFilterArticles = datas => setFilterArticlesPage(datas)

  const filteredArticlesHandler = filterType => setFilterArticlesTypes(filterType)

  return (
    <>
      {
        allArticles.length &&
        <section className='page category-page'>

          <h2 className='category-h2'>تمامی مقالات</h2>
          <p className='text-light me-3 mb-2'>{allArticles.length} مقاله</p>

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
                <FilterCategory categorySwitch={false} titleCategory={'دسته بندی مقالات'} />
              </div>

            </aside>

            <div className='category-courses-and-sort-parent'>

              <CategorySort namesList={['عادی', 'قدیمی ترین', 'جدیدترین', 'پرمخاطب ترین']} onSelectedItem={filteredArticlesHandler} selectItem={selectedItem} />

              <section className='category-courses'>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-xl-3" id="courses-container">

                  {
                    filterArticlesPage.length ? filterArticlesPage.map((articleInfo, index) => (
                      <Article key={index} {...articleInfo} pathCover={'public/Images/Blogs/'} />
                    )) :
                      <div className='w-100' style={{ height: '40vh', textAlign: 'center', marginTop: '15rem' }}>
                        <h2 className='mb-0 mb-4 text-light' style={{ fontSize: '3rem', fontFamily: 'Lalezar' }}>فعلا برای این دسته بندی مقاله ای قرار نگرفته است</h2>
                        <h5 className='text-success display-3'>⌡☻⌠</h5>
                      </div>
                  }

                </div>
              </section>

            </div>

          </div>

          <Pagination
            bgColorActive='rgb(43, 203, 86)'
            colorActive='white'
            arrDatas={allArticles}
            countDataPerPage={6}
            pathName={'/all-articles/page/'}
            onFilterDatas={handleFilterArticles}
          />
        </section>
      }
    </>
  )
}
