import React, { useEffect, useState } from 'react'
import '../../Css/categories.css'
//components
import Course from '../../Components/Course/Course'
import OffCanvasBottom from '../../Components/OffCanvasesMenu/OffCanvasBottom/OffCanvasBottom';
import OffCanvasRight from '../../Components/OffCanvasesMenu/OffCanvasRight/OffCanvasRight';
import FilterCategory from '../../Components/FilterCategory/FilterCategory';
import Pagination from "react-pagination-master"
import CategorySort from '../../Components/CategorySort/CategorySort';
//icons
import { RiSearchLine } from "react-icons/ri";
import { ImSortAmountDesc } from "react-icons/im";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
//
import swal from 'sweetalert'

export default function AllCourses() {

    const [allCourses, setAllCourses] = useState([])
    const [categories, setCategories] = useState([])
    const [filterCoursesPage, setFilterCoursesPage] = useState([])
    const [categoryMenusCourses, setCategoryMenusCourses] = useState([])
    const [filterCategoryTypes, setFilterCategoryTypes] = useState([])
    const [filterCourseTypes, setFilterCourseTypes] = useState('')

    useEffect(() => {
        fetch(`http://localhost:4000/v1/courses`)
            .then(res => res.ok ? res.json() : res.text().then(err => { throw new Error(err) }))
            .then(allCourses => {
                setAllCourses(allCourses)
                //setCategories(allCourses)
            })
            .catch(err => swal({ title: 'مشکلی در ارتباط با سرور پیش امده', timer: 7000, icon: 'error', buttons: 'باشه' }))

        fetch(`http://localhost:4000/v1/menus`)
            .then(res => res.ok ? res.json() : res.text().then(err => { throw new Error(err) }))
            .then(menus => setCategoryMenusCourses(menus))
            .catch(err => swal({ title: 'مشکلی در ارتباط با سرور پیش امده', timer: 7000, icon: 'error', buttons: 'باشه' }))
    }, [])

    useEffect(() => {
        console.log(allCourses);
        console.log(categoryMenusCourses);
    }, [allCourses, categoryMenusCourses])

    useEffect(() => {
        if (allCourses.length >= 1 && filterCategoryTypes.length) {
            let arrCategory = []
            filterCategoryTypes.map(name => {
                arrCategory.push(...allCourses.filter(course => course.categoryID.name === name && course))
            })
            setCategories(arrCategory)
        } else if (!filterCategoryTypes.length) {
            setCategories(allCourses)
        }
    }, [filterCategoryTypes, allCourses])

    useEffect(() => {
        function resizeHandler() {
            window.location.reload()
        }
        window.addEventListener('resize', resizeHandler)
        return () => window.removeEventListener('resize', resizeHandler)
    })

    const showCategoriesCoursesHandler = filter => setFilterCategoryTypes(prev => [...prev, filter])

    const removeCategoryHandler = nameCategory => setFilterCategoryTypes(filterCategoryTypes.filter(name => name !== nameCategory))

    const handleFilterCourses = datas => setFilterCoursesPage(datas)

    const filteredCoursesHandler = filterType => {
        setFilterCourseTypes(filterType)
    }

    return (
        <section className='page category-page'>

            {allCourses.length
                ?
                <>
                    <h2 className='category-h2'>تمامی دوره ها</h2>
                    <p className='text-light me-3 mb-2'>{categories.length ? categories.length : allCourses.length} عنوان آموزشی</p>

                    <div className='category-filters'>

                        <aside className='category-aside'>

                            <section className='category-research'>
                                <input type="text" className='category-research__input' placeholder='در بین دوره ها جستجو کنید' />
                                <RiSearchLine className='category-research__icon' />
                            </section>

                            <div className='d-flex align-items-center justify-content-between'>
                                <OffCanvasBottom displayCanvas={'d-flex d-sm-none'} iconBtn={<ImSortAmountDesc />} titleHeader={'مرتب سازی بر اساس'} namesLi={['همه دوره ها', 'ارزان ترین', 'گران ترین', 'پرمخاطب ترین']} />
                                <OffCanvasRight displayCanvas={'d-flex d-sm-none'} iconBtn={<HiMiniAdjustmentsHorizontal />} children={<FilterCategory categorySwitch={true} titleCategory={'دسته بندی دوره ها'} category={categoryMenusCourses} onAddCategory={showCategoriesCoursesHandler} onRemoveCategory={removeCategoryHandler} onFilteredOverCourses={filteredCoursesHandler} />} />
                            </div>

                            <div className='d-none d-sm-block'>
                                {
                                    categoryMenusCourses.length &&
                                    <FilterCategory categorySwitch={true} titleCategory={'دسته بندی دوره ها'} category={categoryMenusCourses} onAddCategory={showCategoriesCoursesHandler} onRemoveCategory={removeCategoryHandler} onFilteredOverCourses={filteredCoursesHandler} />
                                }
                            </div>

                        </aside>

                        <div className='category-courses-and-sort-parent'>

                            <CategorySort namesList={['همه دور ها', 'ارزان ترین', 'گران ترین', 'پرمخاطب ترین']} onSelectedItem={filteredCoursesHandler}/>

                            <section className='category-courses'>
                                <div className="row row-cols-sm-2 row-cols-md-2 row-cols-xl-3" id="courses-container">

                                    {
                                        filterCoursesPage.map((courseInfo, index) => (
                                            <Course key={index} {...courseInfo} />
                                        ))
                                    }

                                </div>
                            </section>

                        </div>

                    </div>
                    <Pagination
                        bgColorActive='rgb(43, 203, 86)'
                        colorActive='white'
                        arrDatas={categories.length ? categories : allCourses}
                        countDataPerPage={6}
                        pathName={'/all-courses/page/'}
                        onFilterDatas={handleFilterCourses}
                    />
                </>
                :
                <div style={{ height: '40vh', textAlign: 'center', marginTop: '15rem' }}>
                    <h2 className='category-h2 mb-0'>هنوز هیچ دوره ای روی وبسایت قرار نگرفته است</h2>
                    <h3 className='text-success display-1'>⌡☻⌠</h3>
                </div>
            }
        </section>
    )
}