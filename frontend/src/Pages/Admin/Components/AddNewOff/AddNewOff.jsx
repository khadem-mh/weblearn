import React, { useState, useEffect } from 'react'
import InputEditModal from '../InputEditModal/InputEditModal';
import { SiNamecheap } from "react-icons/si";
import { MdOutlinePercent } from "react-icons/md";
import { FaMaxcdn } from "react-icons/fa";
import swal from 'sweetalert';

export default function AddNewOff({ getAllOffs }) {

    const [offCode, setOffCode] = useState('')
    const [offPercent, setOffPercent] = useState('')
    const [offUses, setOffUses] = useState(null)
    const [productID, setProductID] = useState(null)
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        getAllProducts()
    }, [])

    const getAllProducts = () => {
        fetch("https://kind-tips-jam.loca.lt/v1/courses")
            .then(res => res.json())
            .then(products => {
                console.log(products);
                setAllProducts(products)
            })
    }

    const postInfosOff = event => {
        event.preventDefault()

        if (offCode.length && offPercent.length && productID && offUses.length) {
            let setNewOff = {
                code: offCode,
                percent: offPercent,
                course: productID,
                max: offUses,
            }

            fetch("https://kind-tips-jam.loca.lt/v1/offs", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                },
                body: JSON.stringify(setNewOff)
            })
                .then(res => res.json())
                .then(off => {
                    getAllOffs()
                    setOffCode('')
                    setOffPercent('')
                    swal({
                        title: 'با موفقیت کد تخفیف اضافه شد',
                        icon: 'success',
                        buttons: 'باشه'
                    })
                })

        } else {
            swal({
                title: 'لطفا مقادیر خواسته شده را وارد نمایید',
                icon: 'error',
                buttons: 'باشه'
            })
        }
    }

    return (
        <div className='com-main'>
            <h1 className='com-title'>افزودن تخفیف جدید</h1>

            <form className='add-com-form'>
                <div className='add-com-form-wrap'>
                    <InputEditModal valInp={offCode} setValInp={setOffCode} cildren={<SiNamecheap />} placeHolderInp='کد تخفیف' />
                    <InputEditModal valInp={offPercent} setValInp={setOffPercent} cildren={<MdOutlinePercent />} placeHolderInp='درصد تخفیف' />
                    <InputEditModal valInp={offUses} setValInp={setOffUses} cildren={<FaMaxcdn />} placeHolderInp='حداگثر استفاده' />

                    <select className="form-select mt-4" onChange={e => {
                        setProductID(e.target.value)
                    }}>
                        <option value="-1">دوره مدنظر را انتخاب کنید</option>
                        {
                            allProducts.map((course, index) => (
                                <option key={index} value={course._id}>{course.name}</option>
                            ))
                        }
                    </select>
                </div>
                <button className='add-com-submit' onClick={(event) => postInfosOff(event)}>ثبت تخفیف</button>
            </form>
        </div>
    )
}
