import React from 'react'
import '../../Css/categories.css'
import './media.css'
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

export default function CategoryCourses() {

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
            <OffCanvasRight displayCanvas={'d-flex d-sm-none'} iconBtn={<HiMiniAdjustmentsHorizontal />} children={<FilterCategory categorySwitch={true} titleCategory={'دسته بندی دوره ها'}/>} />
          </div>

          <div className='d-none d-sm-block'>
            <FilterCategory categorySwitch={true} titleCategory={'دسته بندی دوره ها'}/>
          </div>

        </aside>

        <div className='category-courses-and-sort-parent'>

        <CategorySort namesList={['همه دور ها', 'ارزان ترین', 'گران ترین', 'پرمخاطب ترین']}/>

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