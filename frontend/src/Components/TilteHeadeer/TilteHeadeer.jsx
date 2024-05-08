import React from 'react'
import './TilteHeadeer.css'

export default function TilteHeadeer({title, yourStyle}) {
    return <p className={`introduction__title title-main ${yourStyle}`}>{title}</p>
}
