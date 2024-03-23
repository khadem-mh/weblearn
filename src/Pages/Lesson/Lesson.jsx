import React from 'react'
import './Lesson.css'
//package
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//components
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
//icons
import { FaRegCommentDots } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";

export default function Lesson() {

    const playerStyle = {
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
    };

    return (
        <section className='page'>

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
                            <button className='details-lesson__right-header-btn-downlod'>دانلود ویدیو</button>
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
                            <MdOutlineFileUpload className='details-lesson__right-comment-footer-icon' />
                            <p>اگر فایل ضمیمه ای دارید لطفا آپلود کنید</p>
                        </div>


                    </div>

                </section>

                <section className='details-lesson__left'>

                </section>

            </section>

        </section>
    )
}
