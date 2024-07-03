import React, { useEffect, useState } from 'react'
import { SiNamecheap } from "react-icons/si";
import { FaLess } from "react-icons/fa6";
import InputEditModal from '../InputEditModal/InputEditModal';
import { swal } from "sweetalert";

export default function AddNewProduct({ getAllProducts }) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [cover, setCover] = useState(null)
    const [shortName, setShortName] = useState('')
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState('')
    const [categoryID, setCategoryID] = useState('')
    ///
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories()
    }, [])

    const getAllCategories = () => {
        fetch(`http://localhost:4000/v1/category`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        })
            .then(res => res.json())
            .then(datas => setCategories(datas))
    }

    const selectCategory = value => value !== -1 && setCategoryID(value)

    const selectStatusCourse = value => value !== -1 && setStatus(value)

    const addNewCourse = e => {
        e.preventDefault()

        fetch(`http://localhost:4000/v1/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            body: JSON.stringify({
                name,
                description,
                cover,
                shortName,
                price,
                status,
                categoryID,
            })
        })
            .then(res => res.ok ? res.json() : res.text().then(err => { return new Error(`Text Error: `, err) }))
            .then(() => {
                getAllProducts('')
                setName("")
                setDescription("")
                setCover(null)
                setShortName("")
                setPrice("")
                setStatus("")
                setCategoryID("")
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
                    <InputEditModal multiInp='name' valInp={name} setValInp={setName} cildren={<SiNamecheap />} placeHolderInp='نام دوره' />
                    <InputEditModal multiInp='price' valInp={price} setValInp={setPrice} cildren='$$' placeHolderInp='قیمت دوره' />
                    <InputEditModal multiInp='shortName' valInp={shortName} setValInp={setShortName} cildren={<FaLess />} placeHolderInp='شورت نیم' />
                    <div className='mt-2'>
                        <label htmlFor="cover" className='text-secondary mb-2 me-2'>عکس دوره</label>
                        <input type="file" className="form-control" id='cover' />
                    </div>
                    <select className="form-select border mt-md-5" onChange={event => selectCategory(event.target.value)}>
                        <option value="-1">دسته بندی دوره</option>
                        {
                            categories.length && categories.map((category, index) => (
                                <option key={index} value={category._id}>{category.title}</option>
                            ))
                        }
                    </select>
                    <select className="form-select border mt-md-5" onChange={event => selectStatusCourse(event.target.value)}>
                        <option value="-1">وضعیت دوره</option>
                        <option value="presell">پیش فروش</option>
                        <option value="start">درحال برگزاری</option>
                    </select>
                </div>
                <button className='add-com-submit' onClick={event => addNewCourse(event)}>ثبت دوره</button>
            </form>
        </div>
    )
}
