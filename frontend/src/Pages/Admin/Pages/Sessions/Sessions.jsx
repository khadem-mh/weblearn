import React, { useState, useEffect, useRef } from "react";
import swal from "sweetalert";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import InputEditModal from "../../Components/InputEditModal/InputEditModal";
import ErrorBoxEmpty from "../../Components/ErrorBoxEmpty/ErrorBoxEmpty";
//icons
import { SiNamecheap } from "react-icons/si";
import { IoMdTime } from "react-icons/io";


export default function AdminPanelSessions() {

    const videoRef = useRef()
    //
    const [isShowModalDel, setIsShowModalDel] = useState(false)
    const [sessionID, setSessionID] = useState(null)
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const [courseID, setCourseID] = useState('')
    const [isFree, setIsFree] = useState(0)
    const [video, setVideo] = useState(null)
    ///
    const [allCourses, setAllCourses] = useState([])
    const [allSessions, setAllSessions] = useState([])
    const [courseCover, setCourseCover] = useState([])

    useEffect(() => {
        getAllCourses()
        getAllSessions()
        setAllSessions(courseCover)
    }, [])

    useEffect(() => {
        helper()
    }, [allCourses, allSessions])


    const getAllCourses = () => {
        fetch('http://localhost:4000/v1/courses', {
            method: 'GET',
            referrerPolicy: 'strict-origin-when-cross-origin'
        })
            .then(res => res.json())
            .then(datas => {
                setAllCourses(datas)
            })
    }

    const getAllSessions = () => {
        fetch('http://localhost:4000/v1/courses/sessions', {
            method: 'GET',
            referrerPolicy: 'strict-origin-when-cross-origin'
        })
            .then(res => res.json())
            .then(datas => {
                setCourseCover([])
                setAllSessions(datas)
            })
    }

    const selectCourse = value => value !== -1 && setCourseID(value)

    const selectStatusSession = value => value !== -1 && setIsFree(value)

    const helper = () => {
        allCourses.map(course => {
            allSessions.map(session => {
                if (session.course._id === course._id) {
                    session.course = {
                        ...session.course,
                        cover: course.cover
                    }
                    setCourseCover(prev => [...prev, session])
                }
            })
        })
    }

    const addNewCourse = e => {
        e.preventDefault()

        if (title.length && time.length && courseID.length && video) {

            let infosCourse = new FormData()

            infosCourse.append('video', video)
            infosCourse.append('title', title)
            infosCourse.append('time', time)
            infosCourse.append('free', isFree)

            fetch(`http://localhost:4000/v1/courses/${courseID}/sessions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                },
                body: infosCourse
            })
                .then(res => res.json())
                .then(datas => {
                    getAllSessions()
                    videoRef.current.value = ""
                    setTitle("")
                    setTime("")
                    setIsFree(0)
                    setVideo(null)
                    {
                        swal({
                            title: 'جلسه با موفقیت به دوره اضافه شد',
                            icon: 'success',
                            buttons: 'باشه'
                        })
                    }
                })
        }

    }

    const deleteSessionHandler = e => {
        e.preventDefault()

        fetch(`http://localhost:4000/v1/courses/sessions/${sessionID}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
        })
            .then(res => res.json())
            .then(datas => {
                getAllSessions()
                setSessionID(null)
                setIsShowModalDel(false)
                {
                    swal({
                        title: 'ویدئو با موفقیت حذف شد',
                        icon: 'success',
                        buttons: 'باشه'
                    })
                }
            })
    }

    return (
        <section>

            <div className='com-main'>
                <h1 className='com-title'>افزودن جلسه به دوره</h1>

                <form className='add-com-form'>
                    <div className='add-com-form-wrap'>
                        <InputEditModal valInp={title} setValInp={setTitle} cildren={<SiNamecheap />} placeHolderInp='عنوان جلسه' />
                        <InputEditModal valInp={time} setValInp={setTime} cildren={<IoMdTime />} placeHolderInp='مدت رمان جلسه' />
                        <select className="form-select border" onChange={event => selectCourse(event.target.value)}>
                            <option value="-1">دوره مدنظر را انتخاب کنید</option>
                            {
                                allCourses.length && allCourses.map((course, index) => (
                                    <option key={index} value={course._id}>{course.name}</option>
                                ))
                            }
                        </select>
                        <select className="form-select border" onChange={event => selectStatusSession(event.target.value)}>
                            <option value="-1">وضعیت جلسه</option>
                            <option value="1">رایگان</option>
                            <option value="0">پولی</option>
                        </select>
                        <div className='mt-2'>
                            <label htmlFor="video" className='text-secondary mb-2 me-2'>ویدئوی جلسه</label>
                            <input type="file" className="form-control" id='video' onChange={event => setVideo(event.target.files[0])} ref={videoRef} />
                        </div>
                    </div>
                    <button className='add-com-submit' onClick={event => addNewCourse(event)}>ثبت دوره</button>
                </form>
            </div>


            {
                allSessions.length ?
                    <div className='parent-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">شناسه</th>
                                    <th scope="col">عنوان</th>
                                    <th scope="col">مدت زمان</th>
                                    <th scope="col">کاور</th>
                                    <th scope="col">دوره</th>
                                    <th scope="col">حذف</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allSessions.map((product, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{product.title}</td>
                                            <td>{product.time}</td>
                                            <td>
                                                {
                                                    <img src={`/Images/Courses/${product.course.cover}`} alt="corseImg" width={130} className="rounded-3"/>
                                                }
                                            </td>
                                            <td>{product.course?.name}</td>
                                            <td>
                                                <button className='products-table-btn' onClick={() => {
                                                    setIsShowModalDel(true)
                                                    setSessionID(product._id)
                                                }}>حذف</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    : <ErrorBoxEmpty msg={'هیچ دوره‌ای یافت نشد'} />
            }

            {
                isShowModalDel &&
                <DeleteModal cancleAction={() => setIsShowModalDel(false)} title={'آیا از حذف جلسه اطمینان دارید'} submitAction={e => deleteSessionHandler(e)} />
            }

        </section>
    )
}