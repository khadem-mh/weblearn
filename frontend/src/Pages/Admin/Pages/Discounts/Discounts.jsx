import React, { useEffect, useState } from "react";
import InputEditModal from "../../Components/InputEditModal/InputEditModal";
import { MdOutlinePercent } from "react-icons/md";
import swal from "sweetalert";

export default function AdminPanelDiscount() {

    const [offPercent, setOffPercent] = useState('')

    const startCampainOffs = e => {
        e.preventDefault()

        fetch(`http://localhost:4000/v1/offs/all`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ discount: offPercent })
        })
            .then(res => res.json())
            .then(datas => {
                console.log(datas);
                setOffPercent('')
                swal({
                    title: 'با موفقیت کمپین آغاز شد',
                    icon: 'success',
                    buttons: 'باشه'
                })
            })

    }

    return (
        <>
            <div className='com-main'>
                <h1 className='com-title'>برگزاری کمپین جدید</h1>

                <form className='add-com-form'>
                    <div className='add-com-form-wrap'>
                        <InputEditModal valInp={offPercent} setValInp={setOffPercent} cildren={<MdOutlinePercent />} placeHolderInp='درصد تخفیف' />
                    </div>
                    <button className='add-com-submit' onClick={(event) => startCampainOffs(event)}>برگزاری کمپین</button>
                </form>
            </div>

        </>
    )
}