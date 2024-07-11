import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import './Lesson.css'
import './media.css'
//package
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//components
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import ReapondComment from '../../Components/Comment/RespondComment/ReapondComment';
import AccordionListVideo from '../../Components/AccordionListVideo/AccordionListVideo';
import StatusBox from '../../Components/StatusBox/StatusBox';
//icons
import { FaRegCommentDots, FaRegFileLines } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { RiTimeLine } from "react-icons/ri";
import { IoVideocamOutline } from "react-icons/io5";

export default function Lesson() {

    const location = useLocation()
    const params = useParams()
    //
    const [allSessions, setAllSessions] = useState([])
    const [session, setSession] = useState({})
    const [sessionID, setSessionID] = useState(1)
    const [durationTimeMinuteCourses, setDurationTimeMinuteCourses] = useState(null)
    const [durationTimeHoursCourses, setDurationTimeHoursCourses] = useState(null)
    const [userInfos, setUserInfos] = useState(null)

    useEffect(() => {

        let userToken = JSON.parse(localStorage.getItem('user')).token

        fetch(`http://localhost:4000/v1/auth/me`, {
            referrerPolicy: 'strict-origin-when-cross-origin',
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then(res => res.json())
            .then(datas => setUserInfos(datas))

        fetch(`http://localhost:4000/v1/courses/${params.courseNmae}/${params.idSession}`, {
            method: 'GET',
            referrerPolicy: 'strict-origin-when-cross-origin',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            }
        })
            .then(res => res.json())
            .then(datas => {
                console.log(datas);
                if (datas?.message) {
                    window.document.body.style.filter = 'blur(100px)'
                    window.document.body.style.backgroundColor = 'black'
                    window.location.pathname = '/'
                } else {
                    setSession(datas.session)
                    setAllSessions(datas.sessions)
                }
            })
    }, [])

    useEffect(() => {
        console.log(session);
        console.log(allSessions);
        if (session && allSessions.length) setSessionID([...allSessions].findIndex(item => item._id === session._id) + 1)
        if (allSessions) {
            let sessionMinuteTime = 0
            allSessions.map(session => sessionMinuteTime += +session.time.split(':')[0])
            sessionMinuteTime >= 60 ? setDurationTimeHoursCourses(Math.floor(sessionMinuteTime / 60)) : setDurationTimeMinuteCourses(sessionMinuteTime)
        }
    }, [session, allSessions])

    const playerStyle = {
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
    };

    return (
        <section className='page-lesson page'>

            <BreadCrumb
                links={
                    [
                        { to: 'all-courses/page/1', title: 'دوره های آموزشی' },
                        { to: `course-info/${params.courseNmae}`, title: params.courseNmae },
                        { title: "جلسات دوره" },
                    ]
                }
            />

            <div className='container-plyr'>
                <Plyr
                    source={{
                        type: 'video',
                        poster: 'Images/Courses/BL-852x479-1.png',
                        ratio: '16:9',
                        sources: [
                            {
                                src: session.video ? session.video : '',
                                type: 'video/mp4',
                            },
                        ],
                    }}
                    options={{
                        controls: [
                            'play-large',
                            'play',
                            'progress',
                            'current-time',
                            'mute',
                            'volume',
                            'captions',
                            'settings',
                            'pip',
                            'airplay',
                            'fullscreen'
                        ],
                        autoplay: false,
                        volume: 0.5,
                    }}
                    style={playerStyle}
                />
            </div>

            <section className='container-details-lesson'>

                <section className='details-lesson__right'>
                    <div className='details-lesson__right-header'>

                        <div className='details-lesson__right-header-parent'>
                            <h2 className='details-lesson__right-header-title title-main'>
                                دوره آموزشی {params.courseNmae}
                            </h2>
                            <div className='details-lesson__right-header-name'>
                                <span className='details-lesson__right-header-number'>{sessionID}</span>
                                <span className='details-lesson__right-header-name-video'>{session.title}</span>
                            </div>
                        </div>

                        <hr />

                        <div className='details-lesson__right-bottom-parent'>
                            <button className='details-lesson__right-header-btn-ques'>سوال دارم!</button>
                            <div>
                                <button className='details-lesson__right-header-btn-file'>دانلود پیوست</button>
                                <button className='details-lesson__right-header-btn-downlod'>دانلود ویدیو</button>
                            </div>
                        </div>

                    </div>

                    <div className='details-lesson__right-comment'>

                        <div className='details-lesson__right-comment-header'>
                            <FaRegCommentDots className='details-lesson__right-comment-header-icon' />
                            <p>پرسش و پاسخ</p>
                        </div>

                        <section className='details-lesson__right-comment-body'>
                            <div className='details-lesson__right-comment-body__header'>
                                <IoPersonCircleOutline className='details-lesson__right-comment-body__icon' />
                                <div>
                                    <p>خادم المهدی</p>
                                    <p className='details-lesson__right-comment-body__sub-p'>پرسش جدید</p>
                                </div>
                            </div>
                            <div>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={"سوال خود را بپرسید..."}

                                    config={{
                                        language: {
                                            ui: 'fa',
                                            content: 'fa'
                                        },
                                        toolbar: [
                                            '|',
                                            'bold',
                                            'link',
                                            '|',
                                            'bulletedList',
                                            'numberedList',
                                            '|',
                                            'undo',
                                            'redo'
                                        ],
                                        direction: 'rtl'
                                    }}
                                /*
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                }} */
                                />
                            </div>
                        </section>

                        <div className='details-lesson__right-comment-footer'>
                            <div className='mb-0'>
                                <MdOutlineFileUpload className='details-lesson__right-comment-footer-icon' />
                                <p>اگر فایل ضمیمه ای دارید لطفا آپلود کنید</p>
                            </div>
                            <button className='details-lesson__right-comment-footer-btnsend'>ارسال</button>
                        </div>

                        <ReapondComment
                            bgAnswer={'var(--blue-lighter-color)'}
                            bgComment={'var(--blue-lighter-hight-color)'}
                            bgParent={'transparent'}
                            showCommentHeader={false}
                            textNoQues={"هنوز برای این جلسه سوالی نپرسیده‌اید!"}
                        />

                    </div>

                </section>

                <section className='details-lesson__left'>

                    <div className='details-lesson__left-container-listvideo'>
                        <div className='details-lesson__left-header'>
                            <FaRegFileLines />
                            <p>سرفصل های دوره</p>
                        </div>
                        <AccordionListVideo sessionsList={allSessions} shortNameCourse={params.courseNmae}/>
                    </div>

                    <div className='parent-box-status-details'>
                        <StatusBox fzTitle='1.5rem' fzSubTitle='1.3rem' classBox={'box-tiny-status mt-2'} title={'وضعیت دوره'} subTitle={'در حال ضبط'} icon={<HiOutlineInformationCircle />} />
                        <StatusBox fzTitle='1.5rem' fzSubTitle='1.3rem' classBox={'box-tiny-status mt-2'} title={'زمان دوره'} subTitle={allSessions.length ? `${durationTimeHoursCourses ? `${durationTimeHoursCourses} ساعت` : `${durationTimeMinuteCourses} دقیقه`}` : 'نامشخص'} icon={<RiTimeLine />} />
                        <StatusBox fzTitle='1.5rem' fzSubTitle='1.3rem' classBox={'box-tiny-status mt-2'} title={'جلسات دوره'} subTitle={allSessions.length} icon={<IoVideocamOutline />} />
                    </div>

                </section>

            </section>

        </section>
    )
}
