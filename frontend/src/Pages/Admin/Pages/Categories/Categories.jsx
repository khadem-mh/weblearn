import React, { useEffect, useState } from "react";
import DeleteModal from '../../Components/Modals/DeleteModal/DeleteModal'
import InputEditModal from "../../Components/InputEditModal/InputEditModal";
import EditMoal from '../../Components/Modals/EditMoal/EditMoal'
import ErrorBoxEmpty from '../../Components/ErrorBoxEmpty/ErrorBoxEmpty'
import swal from "sweetalert";

export default function AdminPanelCategories() {

    const [editCategoryName, setEditCategoryName] = useState('')
    const [editCategoryTitle, setEditCategoryTitle] = useState('')
    const [isShowAlert, setIsShowAlert] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [categoryID, setCategoryID] = useState(false)
    const [allCategories, setAllCategories] = useState([])

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
            .then(datas => {
                console.log(datas);
                setAllCategories(datas)
            })
    }

    const updateModalSubmitAction = event => {
        event.preventDefault()
        const categoryUpdateInfos = {
            title: editCategoryTitle,
            name: editCategoryName,
        }

        fetch(`http://localhost:4000/v1/category/${categoryID}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                'Content-Type': `application/json`
            },
            body: JSON.stringify(categoryUpdateInfos)
        })
            .then(res => res.json())
            .then(() => {
                setIsShowEditModal(false)
                getAllCategories()
                swal({
                    title: 'دسته بندی مدنظر با موفقیت بروزرسانی شد',
                    icon: 'success',
                    buttons: 'باشه'
                })
            })
    }

    const deleteModalSubmitAction = () => {

        fetch(`http://localhost:4000/v1/category/${categoryID}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        })
            .then(res => res.json())
            .then(datas => {
                getAllCategories()
                swal({
                    title: 'دسته بندی مدنظر با موفقیت حذف شد',
                    icon: 'success',
                    buttons: 'باشه'
                })
                setIsShowAlert(false)
                setAllCategories(datas)
                setIsShowDeleteModal(false)
            })
    }

    return (
        <>

            <section>
                <div>
                    {allCategories.length ? <h1 className='products-title title-pr'>دسته بندی ها</h1> : ''}
                    <div className='parent-table'>
                        {
                            allCategories.length ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">شناسه</th>
                                            <th scope="col">عنوان</th>
                                            <th scope="col">مسیر</th>
                                            <th scope="col">ویرایش</th>
                                            <th scope="col">حذف</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            allCategories && allCategories.map((category, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{category.title}</td>
                                                    <td>{category.name}</td>
                                                    <td>
                                                        <button className='products-table-btn' onClick={() => {
                                                            setIsShowEditModal(true)
                                                            setEditCategoryName(category.name)
                                                            setEditCategoryTitle(category.title)
                                                            setCategoryID(category._id)
                                                        }}>ویرایش</button>
                                                    </td>
                                                    <td>
                                                        <button className='products-table-btn' onClick={() => {
                                                            setIsShowAlert(true)
                                                            setCategoryID(category._id)
                                                        }}>حذف</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            ) : <ErrorBoxEmpty msg={'هیچ دسته بندی ای یافت نشد'} />
                        }
                    </div>
                </div>
            </section>

            {isShowAlert && (
                <DeleteModal cancleAction={() => setIsShowAlert(false)} submitAction={deleteModalSubmitAction} title={'آیا از حذف کردن دسته بندی اطمینان دارید'} />
            )}

            {isShowEditModal &&
                <EditMoal onClose={() => setIsShowEditModal(false)} onSubmit={e => updateModalSubmitAction(e)} title={'اطلاعات جدید را وارد نمایید'}>
                    <InputEditModal setValInp={setEditCategoryTitle} valInp={editCategoryTitle} placeHolderInp={'عنوان جدید'} />
                    <InputEditModal setValInp={setEditCategoryName} valInp={editCategoryName} placeHolderInp={'نام جدید'} />
                </EditMoal>
            }

        </>
    )
}