import React, { useState, useRef } from 'react'
import './Category.css'
import './media.css'
//components
import Course from '../../Components/Course/Course'
import OffCanvasBottom from '../../Components/OffCanvasesMenu/OffCanvasBottom/OffCanvasBottom';
import OffCanvasRight from '../../Components/OffCanvasesMenu/OffCanvasRight/OffCanvasRight';
import FilterCategory from '../../Components/FilterCategory/FilterCategory';
import Pagination from '../../Components/Pagination/Pagination';
//icons
import { RiSearchLine } from "react-icons/ri";
import { ImSortAmountDesc } from "react-icons/im";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

export default function Category() {

  const refListSort = useRef()
  const [selectedItem, setSelectedItem] = useState(0)

  const clickHandlerSelectItem = (e) => {
    if (e.target.dataset.value !== selectedItem) {
      const childrenListArray = Array.from(refListSort.current.children)
      childrenListArray.map(child => child.classList.contains('select-item-sort') && child.classList.remove('select-item-sort'))
    }
    e.target.classList.add('select-item-sort')
    setSelectedItem(e.target.dataset.value)
  }

  return (
    <section className='page category-page'>

      <h2 className='category-h2'>دوره ها</h2>

      <div className='category-filters'>

        <aside className='category-aside'>

          <section className='category-research'>
            <input type="text" className='category-research__input' placeholder='در بین دوره ها جستجو کنید' />
            <RiSearchLine className='category-research__icon' />
          </section>

          <div className='d-flex align-items-center justify-content-between'>
            <OffCanvasBottom displayCanvas={'d-flex d-sm-none'} iconBtn={<ImSortAmountDesc />} titleHeader={'مرتب سازی بر اساس'} namesLi={['همه دوره ها', 'ارزان ترین', 'گران ترین', 'پرمخاطب ترین']} />
            <OffCanvasRight displayCanvas={'d-flex d-sm-none'} iconBtn={<HiMiniAdjustmentsHorizontal />} children={<FilterCategory />} />
          </div>

          <div className='d-none d-sm-block'>
            <FilterCategory />
          </div>

        </aside>

        <div className='category-courses-and-sort-parent'>

          <section className='category-sort d-none d-sm-flex'>
            <div className='category-sort__right'>
              <ImSortAmountDesc className='category-sort__icon' />
              <span className='category-sort__title'>مرتب سازی :</span>
            </div>
            <div className='category-sort__left' ref={refListSort}>
              <p className='category-sort__item select-item-sort' data-value="0" onClick={(e) => clickHandlerSelectItem(e)}>همه دوره ها</p>
              <p className='category-sort__item' data-value="1" onClick={(e) => clickHandlerSelectItem(e)}>ارزان ترین</p>
              <p className='category-sort__item' data-value="2" onClick={(e) => clickHandlerSelectItem(e)}>گران ترین</p>
              <p className='category-sort__item' data-value="3" onClick={(e) => clickHandlerSelectItem(e)}>پرمخاطب ترین</p>
            </div>
          </section>

          <section className='category-courses'>
            <div className="row row-cols-sm-2 row-cols-md-2 row-cols-xl-3" id="courses-container">

              <Course coursePathImg={'../'} courseImg={'PWA-min.jpg'} courseTitle={'آموزش پروژه محور PWA'} courseTeacher={'سید محمدحسین خادم المهدی'} courseCountUsers={800} coursePrice={1000_000} courseScore={5} courseDetails={' عنوان دوره گویای همه چی هست اما نیازه برخی موارد گفته بشه تا بتونید با دید بهتری تو این دوره شرکت کنید'} courseSector={'فرانت اند'} />
              <Course coursePathImg={'../'} courseImg={'nodejs.png'} courseTitle={'آموزش پروژه محور node js'} courseTeacher={'سید محمدحسین خادم المهدی'} courseCountUsers={800} coursePrice={1000_000} courseScore={5} courseDetails={' عنوان دوره گویای همه چی هست اما نیازه برخی موارد گفته بشه تا بتونید با دید بهتری تو این دوره شرکت کنید'} courseSector={'فرانت اند'} />
              <Course coursePathImg={'../'} courseImg={'TypeScript-min-2.jpg'} courseTitle={'آموزش پروژه محور type script'} courseTeacher={'سید محمدحسین خادم المهدی'} courseCountUsers={800} coursePrice={1000_000} courseScore={5} courseDetails={' عنوان دوره گویای همه چی هست اما نیازه برخی موارد گفته بشه تا بتونید با دید بهتری تو این دوره شرکت کنید'} courseSector={'فرانت اند'} />
              <Course coursePathImg={'../'} courseImg={'jango.png'} courseTitle={'آموزش پروژه محور jango'} courseTeacher={'سید محمدحسین خادم المهدی'} courseCountUsers={800} coursePrice={1000_000} courseScore={5} courseDetails={' عنوان دوره گویای همه چی هست اما نیازه برخی موارد گفته بشه تا بتونید با دید بهتری تو این دوره شرکت کنید'} courseSector={'فرانت اند'} />

            </div>
          </section>

        </div>

      </div>

      <Pagination />

    </section>
  )
}