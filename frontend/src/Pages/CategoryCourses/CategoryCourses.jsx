import React, { useEffect, useState } from 'react'
import '../../Css/categories.css'
//components
import Course from '../../Components/Course/Course'
import OffCanvasBottom from '../../Components/OffCanvasesMenu/OffCanvasBottom/OffCanvasBottom';
import OffCanvasRight from '../../Components/OffCanvasesMenu/OffCanvasRight/OffCanvasRight';
import FilterCategory from '../../Components/FilterCategory/FilterCategory';
import Pagination from '../../Components/Pagination/Pagination';
import CategorySort from '../../Components/CategorySort/CategorySort';
//icons
import { RiSearchLine } from "react-icons/ri";
import { ImSortAmountDesc } from "react-icons/im";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { useParams, useLocation } from 'react-router-dom';
//
import swal from 'sweetalert'

export default function CategoryCourses() {

  const location = useLocation()
  const { category } = useParams()
  const [categoryCourses, setCategoryCourses] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${category}`)
      .then(res => res.ok ? res.json() : res.text().then(err => { throw new Error(err) }))
      .then(allCourses => setCategoryCourses(allCourses))
      .catch(err => swal({ title: 'مشکلی در ارتباط با سرور پیش امده', timer: 7000, icon: 'error', buttons: 'باشه' }))
  }, [location])

  useEffect(() => {
    console.log(categoryCourses);
  }, [categoryCourses])

  return (
    <section className='page category-page'>



      {categoryCourses.length
        ?
        <>
          <h2 className='category-h2'>دوره ها</h2>

          <div className='category-filters'>

            <aside className='category-aside'>

              <section className='category-research'>
                <input type="text" className='category-research__input' placeholder='در بین دوره ها جستجو کنید' />
                <RiSearchLine className='category-research__icon' />
              </section>

              <div className='d-flex align-items-center justify-content-between'>
                <OffCanvasBottom displayCanvas={'d-flex d-sm-none'} iconBtn={<ImSortAmountDesc />} titleHeader={'مرتب سازی بر اساس'} namesLi={['همه دوره ها', 'ارزان ترین', 'گران ترین', 'پرمخاطب ترین']} />
                <OffCanvasRight displayCanvas={'d-flex d-sm-none'} iconBtn={<HiMiniAdjustmentsHorizontal />} children={<FilterCategory categorySwitch={true} titleCategory={'دسته بندی دوره ها'} />} />
              </div>

              <div className='d-none d-sm-block'>
                <FilterCategory categorySwitch={true} titleCategory={'دسته بندی دوره ها'} />
              </div>

            </aside>

            <div className='category-courses-and-sort-parent'>

              <CategorySort namesList={['همه دور ها', 'ارزان ترین', 'گران ترین', 'پرمخاطب ترین']} />

              <section className='category-courses'>
                <div className="row row-cols-sm-2 row-cols-md-2 row-cols-xl-3" id="courses-container">

                  {
                    categoryCourses.map((courseInfo, index) => (
                      <Course key={index} {...courseInfo} />
                    ))
                  }

                </div>
              </section>

            </div>

          </div>

          <Pagination />
        </>
        :
        <div style={{ height: '40vh', textAlign: 'center', marginTop: '15rem'}}>
          <h2 className='category-h2 mb-0'>هنوز برای این دسته بندی دوره ای قرار نگرفته است</h2>
          <h3 className='text-success display-1'>⌡☻⌠</h3>
        </div>
      }

    </section>
  )
}