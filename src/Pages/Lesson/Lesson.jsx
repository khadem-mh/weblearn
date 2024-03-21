import React from 'react'
import './Lesson.css'
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
//components
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
//icons

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

        </section>
    )
}
