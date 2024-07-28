import React, { useEffect, useState } from 'react'
import './CategoryCourses.css'
//components
import Course from '../../Components/Course/Course'
import OffCanvasRight from '../../Components/OffCanvasesMenu/OffCanvasRight/OffCanvasRight';
import FilterCategory from '../../Components/FilterCategory/FilterCategory';
import Pagination from "react-pagination-master"
import CategorySort from '../../Components/CategorySort/CategorySort';
//icons
import { RiSearchLine } from "react-icons/ri";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { useParams, useLocation } from 'react-router-dom';
//
import swal from 'sweetalert'

export default function CategoryCourses() {

  const { category } = useParams()
  const location = useLocation()
  const [filterCoursesPage, setFilterCoursesPage] = useState([])
  //
  const [allCourses, setAllCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [filterCourseTypes, setFilterCourseTypes] = useState('all')
  const [selectedItem, setSelectedItem] = useState(0)
  const [categoriesFilter, setCategoriesFilter] = useState([])
  const [searchCourse, setSearchCourse] = useState('')

  useEffect(() => {
    setFilterCourseTypes('all')
    setSelectedItem(0)
    setAllCourses([])
    setCategories([])
    setFilterCoursesPage([])
    setCategoriesFilter([])
    console.log(category);
    fetch(`https://weblearning.liara.run/v1/courses/category/${category}`)
      .then(res => res.ok ? res.json() : res.text().then(err => { throw new Error(err) }))
      .then(courses => {
        console.log(courses);
        setAllCourses(courses)
        setCategories(courses)
      })
      .catch(err => swal({ title: 'مشکلی در ارتباط با سرور پیش امده', timer: 7000, icon: 'error', buttons: 'باشه' }))

  }, [location])

  useEffect(() => {
    switch (filterCourseTypes.newText || filterCourseTypes) {
      case 'all': {
        setCategories(filterCourseTypes.newText ? categories : allCourses)
        setSelectedItem(0)
        break
      }
      case 'popular': {
        setCategories([...categories].sort((first, second) => second.courseAverageScore - first.courseAverageScore))
        setSelectedItem(4)
        break
      }
      case 'cheap': {
        setCategories([...categories].sort((first, second) => first.price - second.price))
        setSelectedItem(1)
        break
      }
      case 'expensive': {
        setCategories([...categories].sort((first, second) => second.price - first.price))
        setSelectedItem(2)
        break
      }
      case 'free': {
        setCategoriesFilter([...categories].filter(course => course.price === 0 && course))
        setSelectedItem(5)
        break
      }
      case 'personMore': {
        setCategories([...categories].sort((first, second) => second.registers - first.registers))
        setSelectedItem(3)
        break
      }
      default: setCategories(allCourses)
    }
  }, [filterCourseTypes])


  //search value
  const searchCourseHandler = event => {
    setSearchCourse(event.target.value)
    let removedWord = false
    if (event._reactName === 'onKeyDown' && event.code === "Backspace") removedWord = true
    if (event._reactName !== 'onKeyDown' && event.target.value === '') setCategories(allCourses)
    else {
      if (removedWord) {
        let newSearch = event.target.value.slice(0, event.target.value.length - 1)
        let alpha = [...allCourses].filter(courses => courses.name.toLowerCase().includes(newSearch) && courses)
        setCategories(alpha)

      } else {
        let alpha = [...allCourses].filter(courses => courses.name.toLowerCase().includes(event.target.value) && courses)
        setCategories(alpha)
      }
    }
  }

  const handleFilterCourses = datas => setFilterCoursesPage(datas)

  const filteredCoursesHandler = filterType => setFilterCourseTypes(filterType)

  return (
    <section className='page category-page'>


      {categories.length
        ?
        <>
          <h2 className='category-h2'>دوره های {category}</h2>
          <p className='text-light me-3 mb-2'>{selectedItem === 5 ? categoriesFilter.length : categories.length} عنوان آموزشی</p>

          <div className='category-filters'>

            <aside className='category-aside'>

              <section className='category-research'>
                <input type="text" className='category-research__input' placeholder='در بین دوره ها جستجو کنید' value={searchCourse} onChange={e => searchCourseHandler(e)} onKeyDown={e => searchCourseHandler(e)} />
                <RiSearchLine className='category-research__icon' />
              </section>

              <OffCanvasRight displayCanvas={'d-flex d-sm-none'} iconBtn={<HiMiniAdjustmentsHorizontal />} >
                <FilterCategory categorySwitch={true} onFilteredOverCourses={filteredCoursesHandler} selecteItem={selectedItem} />
              </OffCanvasRight>

              <div className='d-none d-sm-block'>
                <FilterCategory categorySwitch={true} onFilteredOverCourses={filteredCoursesHandler} selecteItem={selectedItem} />
              </div>

            </aside>

            <div className='category-courses-and-sort-parent'>

              <CategorySort namesList={['همه دور ها', 'ارزان ترین', 'گران ترین', 'پرمخاطب ترین']} onSelectedItem={filteredCoursesHandler} selectItem={selectedItem} />

              <section className='category-courses'>
                <div className="row row-cols-sm-2 row-cols-md-2 row-cols-xl-3" id="courses-container">

                  {
                    categories.length && filterCourseTypes !== 'free' || filterCourseTypes === 'free' && categoriesFilter.length ? filterCoursesPage.map((courseInfo, index) => (
                      <Course key={index} {...courseInfo} />
                    )) :
                      <div className='w-100' style={{ height: '40vh', textAlign: 'center', marginTop: '15rem' }}>
                        <h2 className='mb-0 mb-4 text-light' style={{ fontSize: '3rem', fontFamily: 'Lalezar' }}>فعلا برای این دسته بندی دوره ای قرار نگرفته است</h2>
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
            arrDatas={selectedItem === 5 ? categoriesFilter : categories}
            countDataPerPage={6}
            pathName={`/${category}/page/`}
            onFilterDatas={handleFilterCourses}
          />

        </>
        :
        <div style={{ height: '40vh', textAlign: 'center', marginTop: '15rem' }}>
          <h2 className='category-h2 mb-0'>هنوز برای این دسته بندی دوره ای قرار نگرفته است</h2>
          <h3 className='text-success display-1'>⌡☻⌠</h3>
        </div>
      }

    </section>
  )
}