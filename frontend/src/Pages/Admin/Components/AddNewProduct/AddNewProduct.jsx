import React, { useState } from 'react'
import InputEditModal from '../InputEditModal/InputEditModal';
import { swal } from "sweetalert";

export default function AddNewProduct({ getAllProducts }) {

    const [objAddNewCourseInfos, setObjAddNewCourseInfos] = useState({
        name: '',
        description: '',
        cover: null,
        shortName: '',
        price: '',
        status: '',
        categoryID: ''
    })

    const addNewCourse = e => {
        e.preventDefault()

        fetch(`http://localhost:4000/v1/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            body: JSON.stringify(objAddNewCourseInfos)
        })
            .then(res => res.ok ? res.json() : res.text().then(err => { return new Error(`Text Error: `, err) }))
            .then(() => {
                getAllProducts('')
                setObjAddNewCourseInfos({ name: '', description: '', cover: null, shortName: '', price: '', status: '', categoryID: '' })
                {
                    swal({
                        title: 'با موفقیت دوره اضافه شد',
                        icon: 'success',
                        buttons: 'باشه'
                    })
                }
            })
            .catch(err => {
                console.error(err)
                {
                    swal({
                        title: 'خطایی پیش آمده لطفا کنسول مرورگر را چک کنید',
                        icon: 'error',
                        buttons: 'باشه'
                    })
                }
            })

    }

    return (
        <div className='com-main'>
            <h1 className='com-title'>افزودن دوره جدید</h1>

            <form className='add-com-form'>
                <div className='add-com-form-wrap'>
                    <InputEditModal multiInp='name' valInp={objAddNewCourseInfos.name} setValInp={setObjAddNewCourseInfos} placeHolderInp='نام دوره' />
                    <InputEditModal multiInp='price' valInp={objAddNewCourseInfos.price} setValInp={setObjAddNewCourseInfos} cildren='$$' placeHolderInp='قیمت دوره' />
                    <div className='mt-2'>
                        <label htmlFor="cover" className='text-secondary mb-2 me-2'>عکس دوره</label>
                        <input type="file" className="form-control" id='cover' />
                    </div>
                    <select className="form-select border mt-md-5">
                        <option selected valu="-1">دسته بندی دوره</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <button className='add-com-submit' onClick={event => addNewCourse(event)}>ثبت دوره</button>
            </form>
        </div>
    )
}
