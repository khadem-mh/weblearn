import React, { useEffect, useState } from "react";
import InputEditModal from "../../Components/InputEditModal/InputEditModal"
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import ErrorBoxEmpty from "../../Components/ErrorBoxEmpty/ErrorBoxEmpty";
import swal from "sweetalert";
import './Articles.css'
import TextEditor from "../../Components/TextEditor/TextEditor";
//icons
import { SiNamecheap } from "react-icons/si";
import { GoRelFilePath } from "react-icons/go";

export default function AdminPanelArticles() {

    const [articles, setArticles] = useState([])
    const [isShowModalDel, setIsShowModalDel] = useState(false)
    const [choosIDForRemove, setChoosIDForRemove] = useState("")
    //
    const [title, setTitle] = useState("")
    const [shortName, setShortName] = useState("")
    const [descriptionBrief, setDescriptionBrief] = useState("")
    const [cover, setCover] = useState(null)
    const [categoryID, setCategoryID] = useState("")
    const [categories, setCategories] = useState([])
    ///

    useEffect(() => {
        getArticles()
        getAllCategories()
    }, [])

    const getArticles = () => {
        fetch(`http://localhost:4000/v1/articles`)
            .then(res => res.json())
            .then(datas => {
                console.log(datas);
                setArticles(datas)
            })
    }

    const removeArticlesHandler = event => {
        event.preventDefault()
        if (choosIDForRemove) {
            fetch(`http://localhost:4000/v1/articles/${choosIDForRemove}`, {
                method: 'DELETE',
                referrerPolicy: 'strict-origin-when-cross-origin',
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                }
            })
                .then(res => res.json())
                .then(() => {
                    getArticles()
                    setChoosIDForRemove(false)
                    setIsShowModalDel(false)
                    {
                        swal({
                            title: 'مقاله مورد نظر با موفقیت حذف شد',
                            icon: 'success',
                            buttons: 'باشه'
                        })
                    }
                })
        }
    }

    //!

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

    const getSrcCoverHandler = event => setCover(event.target.files[0])

    const addNewArticle = e => {
        e.preventDefault()

        let infosArticles = {
            categoryID,
        }


        fetch(`http://localhost:4000/v1/articles`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infosArticles)
        })
            .then(res => res.json())
            .then(datas => {
                if (!datas.message) {
                    getArticles()
                    setCover(null)
                    setShortName("")
                    setCategoryID("")
                    setDescriptionBrief("")
                    {
                        swal({
                            title: 'با موفقیت مقاله اضافه شد',
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
        <>

            <div className='com-main'>
                <h1 className='com-title'>افزودن مقاله جدید</h1>

                <form className='add-com-form'>
                    <div className='add-com-form-wrap'>
                        <InputEditModal valInp={title} setValInp={setTitle} cildren={<SiNamecheap />} placeHolderInp='عنوان مقاله' />
                        <InputEditModal valInp={shortName} setValInp={setShortName} cildren={<GoRelFilePath />} placeHolderInp='URL مقاله' />
                        <div className="mt-2 mb-0 mb-md-5">
                            <label htmlFor="brief" className='text-secondary mb-2 me-2'>چکیده مقاله</label>
                            <textarea id="brief" className="w-100 h-100 rounded-4 px-3 pt-2" defaultValue={descriptionBrief} onChange={e => setDescriptionBrief(e.target.value)}></textarea>
                        </div>
                        <div>
                            <div className='mt-0 mt-md-2 mb-5 mb-md-0'>
                                <label htmlFor="article" className='text-secondary mb-2 me-2'>عکس مقاله</label>
                                <input type="file" className="form-control" id='article' onChange={event => getSrcCoverHandler(event)} />
                            </div>
                            <select className="form-select border mt-md-5" onChange={event => selectCategory(event.target.value)}>
                                <option value="-1">دسته بندی مقاله</option>
                                {
                                    categories.length && categories.map((category, index) => (
                                        <option key={index} value={category._id}>{category.title}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div style={{ width: '100%', marginTop: '2rem' }}>

                        <TextEditor />
                    </div>
                    <button className='add-com-submit' onClick={event => addNewArticle(event)}>ثبت مقاله</button>
                </form>
            </div>

            <div className='parent-table'>
                {
                    articles.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">شناسه</th>
                                    <th scope="col">عکس</th>
                                    <th scope="col">عنوان</th>
                                    <th scope="col">لینک</th>
                                    <th scope="col">نویسنده</th>
                                    <th scope="col">ویرایش</th>
                                    <th scope="col">حذف</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    articles.map((product, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img src={product.cover} alt="article" className='products-table-img hgf' />
                                            </td>
                                            <td>{product.title}</td>
                                            <td style={{ fontSize: '1.3rem', color: 'gray' }}>{product.shortName}</td>
                                            <td>{product.creator.name}</td>
                                            <td>
                                                <button className='products-table-btn'>ویرایش</button>
                                            </td>
                                            <td>
                                                <button className='products-table-btn' onClick={() => {
                                                    setChoosIDForRemove(product._id)
                                                    setIsShowModalDel(true)
                                                }}>حذف</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : <ErrorBoxEmpty msg={'هیچ مقاله ای یافت نشد'} />
                }
            </div>

            {
                isShowModalDel &&
                <DeleteModal cancleAction={() => setIsShowModalDel(false)} submitAction={e => removeArticlesHandler(e)} title={'آیا از حذف مقاله اطمینان دارید'}></DeleteModal>
            }

        </>
    )
}