import React, { useEffect, useState } from 'react'
import { SiNamecheap } from "react-icons/si";
import { TbFileDescription } from "react-icons/tb";
import { GoRelFilePath } from "react-icons/go";
import { MdOutlineContactSupport } from "react-icons/md";
import InputEditModal from '../InputEditModal/InputEditModal';
import swal from "sweetalert";

export default function AddNewProduct({ getAllProducts }) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [cover, setCover] = useState(null)
    const [shortName, setShortName] = useState('')
    const [price, setPrice] = useState(null)
    const [status, setStatus] = useState('')
    const [support, setSupport] = useState('')
    const [categoryID, setCategoryID] = useState('')
    ///
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories()
    }, [])

    const getAllCategories = () => {
        fetch(`https://kind-tips-jam.loca.lt/v1/category`, {
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

    const getSrcCoverHandler = event => setCover(event.target.files[0])

    const addNewCourse = e => {
        e.preventDefault()

        let infosCourse = new FormData()

        infosCourse.append('name', name)
        infosCourse.append('description', description)
        infosCourse.append('cover', cover)
        infosCourse.append('shortName', shortName)
        infosCourse.append('price', price)
        infosCourse.append('status', status)
        infosCourse.append('support', support)
        infosCourse.append('categoryID', categoryID)

        fetch(`https://kind-tips-jam.loca.lt/v1/courses`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            body: infosCourse
        })
            .then(res => res.json())
            .then(datas => {
                if (!datas.message) {
                    getAllProducts()
                    setName("")
                    setDescription("")
                    setCover(null)
                    setShortName("")
                    setPrice("")
                    setStatus("")
                    setCategoryID("")
                    setSupport("")
                    {
                        swal({
                            title: 'با موفقیت دوره اضافه شد',
                            icon: 'success',
                            buttons: 'باشه'
                        })
                    }
                } else {
                    console.error('▐▬◙╕');
                    console.log(datas);
                    {
                        swal({
                            title: 'خطایی پیش آمده لطفا کنسول مرورگر را چک کنید',
                            icon: 'error',
                            buttons: 'باشه'
                        })
                    }
                }
            })

    }

    return (
        <div className='com-main'>
            <h1 className='com-title'>افزودن دوره جدید</h1>

            <form className='add-com-form'>
                <div className='add-com-form-wrap'>
                    <InputEditModal valInp={name} setValInp={setName} cildren={<SiNamecheap />} placeHolderInp='نام دوره' />
                    <InputEditModal valInp={description} setValInp={setDescription} cildren={<TbFileDescription />} placeHolderInp='توضیحات دوره' />
                    <InputEditModal valInp={price} setValInp={setPrice} cildren='$$' placeHolderInp='قیمت دوره' />
                    <InputEditModal valInp={shortName} setValInp={setShortName} cildren={<GoRelFilePath />} placeHolderInp='URL دوره' />
                    <InputEditModal valInp={support} setValInp={setSupport} cildren={<MdOutlineContactSupport />} placeHolderInp='نحوه پشتیبانی دوره' />
                    <br />
                    <div className='mt-2'>
                        <label htmlFor="cover" className='text-secondary mb-2 me-2'>عکس دوره</label>
                        <input type="file" className="form-control" id='cover' onChange={event => getSrcCoverHandler(event)} />
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
