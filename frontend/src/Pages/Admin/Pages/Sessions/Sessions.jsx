import React, { useState, useEffect, useRef } from "react";
import swal from "sweetalert";

export default function AdminPanelSessions() {

    const videoRef = useRef()
    //
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const [courseID, setCourseID] = useState('')
    const [isFree, setIsFree] = useState(0)
    const [video, setVideo] = useState(null)
    ///
    const [allCourses, setAllCourses] = useState([])

    useEffect(() => {
        getAllCourses()
    })

    const getAllCourses = () => {
        fetch('http://localhost:4000/v1/courses', {
            method: 'GET',
            referrerPolicy: 'strict-origin-when-cross-origin'
        })
            .then(res => res.json())
            .then(datas => setAllCourses(datas))
    }

    const selectCourse = value => value !== -1 && setCourseID(value)

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

    return (
        <>

            <section>
                hi
            </section>

        </>
    )
}