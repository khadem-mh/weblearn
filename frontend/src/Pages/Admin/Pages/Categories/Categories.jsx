import React, { useEffect, useState } from "react";
import DeleteModal from '../../Components/Modals/DeleteModal/DeleteModal'
import InputEditModal from "../../Components/InputEditModal/InputEditModal";
import EditMoal from '../../Components/Modals/EditMoal/EditMoal'
import ErrorBoxEmpty from '../../Components/ErrorBoxEmpty/ErrorBoxEmpty'
import Input from '../../../../Components/Input/Input';
import swal from "sweetalert";
//types
import {
    inputFullName, inputUserName
} from "../../../../Validators/RulesInput.js"

export default function AdminPanelCategories() {

    const [editCategoryName, setEditCategoryName] = useState('')
    const [editCategoryTitle, setEditCategoryTitle] = useState('')
    const [isShowAlert, setIsShowAlert] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [categoryID, setCategoryID] = useState(false)
    const [allCategories, setAllCategories] = useState([])
    ///
    const [inpClean, setInpClean] = useState(null)
    const [inpValid, setInpValid] = useState([])
    const [isAllInpValid, setIsAllInpValid] = useState(false)
    const [btnIsActive, setBtnIsActive] = useState(false)

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

        fetch(`https://kind-tips-jam.loca.lt/v1/category/${categoryID}`, {
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

        fetch(`https://kind-tips-jam.loca.lt/v1/category/${categoryID}`, {
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

    useEffect(() => {
        if (inpValid.length === 2) {

            let isInpValid = inpValid.every(inp => !inp.valid ? false : true)

            if (!isInpValid) {
                setBtnIsActive(false)
                setIsAllInpValid(false)
            } else {
                setBtnIsActive(true)
                setIsAllInpValid(true)
            }
        }
    }, [inpValid])

    useEffect(() => {
        if (inpValid?.valid && inpValid.valid) {
            setBtnIsActive(false)
        } else {
            setInpClean(null)
            setBtnIsActive(true)
        }
    }, [inpValid])

    const addCategory = e => {
        e.preventDefault()

        if (isAllInpValid && inpValid.length) {

            setBtnIsActive(true)

            const newUserInfos = {
                title: null,
                name: null,
            }

            inpValid.map(item => {
                item.type === inputFullName && (newUserInfos.title = item.value)
                item.type === inputUserName && (newUserInfos.name = item.value)
                return true
            })

            fetch(`https://kind-tips-jam.loca.lt/v1/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                },
                body: JSON.stringify(newUserInfos)
            })
                .then(res => res.json())
                .then(() => {
                    getAllCategories()
                    setInpClean("")
                    setInpValid([])
                    {
                        swal({
                            title: 'دسته بندی جدید با موفقیت اضافه شد',
                            icon: 'success',
                            buttons: 'باشه'
                        })
                    }
                })
                .catch(err => {
                    {
                        swal({
                            title: 'خطایی در سمت سرور پیش امده',
                            icon: 'error',
                            buttons: 'باشه'
                        })
                    }
                })

        }

    }

    const validRul = valid => {
        setInpValid(state => {
            if (state.length === 0) return [valid]
            else {
                let isRepeat = state.filter(inp => inp.type !== valid.type && inp)
                if (isRepeat) return [...isRepeat, valid]
            }
        })
    }



    return (
        <>

            <section>
                <div className='com-main'>
                    <h1 className='com-title'>افزودن دسته بندی جدید</h1>

                    <form className='add-com-form'>
                        <div className='add-com-form-wrap'>
                            <Input customStyle='edit-products-form-group m-0' customStyleInp='edit-products-input' cleanInput={inpClean} onValid={validRul} type={inputFullName} inpPlaceholder={'عنوان'} />
                            <Input customStyle='edit-products-form-group m-0' customStyleInp='edit-products-input' cleanInput={inpClean} onValid={validRul} type={inputUserName} inpPlaceholder={'مسیر عنوان'} />
                        </div>
                        <button className='add-com-submit' onClick={(e) => addCategory(e)} disabled={btnIsActive ? false : true}>افزودن</button>
                    </form>
                </div>
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