import React from 'react'
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
import faNumber from '../../Functions/FaNumber/FaNumber';
import DetailsTeacher from '../../Components/DetailsTeacher/DetailsTeacher';
//icons
import { FaRegCommentDots, FaRegFileLines } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { RiTimeLine } from "react-icons/ri";
import { IoVideocamOutline } from "react-icons/io5";

export default function Lesson() {

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
                        { to: 'category-articles', title: 'وبلاگ', },
                        { title: 'بهترین وبسایت های فریلنسری خارجی', },
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
                                src: 'Images/video-1.mp4',
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
                                آموزش ری اکت ( ReactJS ) در دنیای واقعی | از 0 تا استخدام [منتورشیپ]
                            </h2>
                            <div className='details-lesson__right-header-name'>
                                <span className='details-lesson__right-header-number'>1</span>
                                <span className='details-lesson__right-header-name-video'>ویدیوی معرفی</span>
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
                                    onReady={(editor) => {
                                        console.log('این CKEditor آماده‌ی استفاده است!', editor);
                                    }}/* 
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
                        <AccordionListVideo
                            obj={{
                                'carousel - 1': [
                                    { textBody: "اوزش js", isFree: false, time: '05:56', to: 'js' },
                                    { textBody: "اوزش react", isFree: false, time: '15:06', to: 'react' },
                                    { textBody: "اوزش css", isFree: true, time: '08:10', to: 'css' },
                                ],
                                'carousel - 2': [
                                    { textBody: "اوزش nextJS", isFree: false, time: '02:36', to: 'next' },
                                ],
                                'carousel - 3': [
                                    { textBody: "اوزش js", isFree: false, time: '05:56', to: 'js' },
                                    { textBody: "اوزش react", isFree: false, time: '15:06', to: 'react' },
                                ],
                                'carousel-feature': []
                            }}
                        />
                    </div>

                    <div className='parent-box-status-details'>
                        <StatusBox fzTitle='1.5rem' fzSubTitle='1.3rem' classBox={'box-tiny-status mt-2'} title={'وضعیت دوره'} subTitle={'تکمیل شده'} icon={<HiOutlineInformationCircle />} />
                        <StatusBox fzTitle='1.5rem' fzSubTitle='1.3rem' classBox={'box-tiny-status mt-2'} title={'زمان دوره'} subTitle={'تکمیل شده'} icon={<RiTimeLine />} />
                        <StatusBox fzTitle='1.5rem' fzSubTitle='1.3rem' classBox={'box-tiny-status mt-2'} title={'جلسات دوره'} subTitle={faNumber(45)} icon={<IoVideocamOutline />} />
                    </div>

                    <DetailsTeacher
                        nameTeacher={'محمدحسین'}
                        imgTeacher={"images/info/teacher.png"}
                        to={'/'}
                    />

                </section>

            </section>

        </section>
    )
}
