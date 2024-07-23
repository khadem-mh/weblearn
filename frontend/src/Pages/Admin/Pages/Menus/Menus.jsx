import React, { useState, useEffect, useRef } from "react";
import ErrorBoxEmpty from "../../Components/ErrorBoxEmpty/ErrorBoxEmpty";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import InputEditModal from "../../Components/InputEditModal/InputEditModal";
import swal from "sweetalert";
import { SiNamecheap } from "react-icons/si";
import { GoRelFilePath } from "react-icons/go";

export default function AdminPanelMenus() {

    const categoryMenuRef = useRef()
    const [menus, setMenus] = useState([])
    const [menuID, setMenuID] = useState(null)
    const [isShowModalRemove, setIsShowModalRemove] = useState(false)
    //
    const [title, setTitle] = useState("")
    const [shortName, setShortName] = useState("")
    const [parentMenu, setParentMenu] = useState(-1)

    useEffect(() => {
        getAllMenus()
    }, [])

    useEffect(() => {
        console.log(menus);
    }, [menus])

    const createMenuHandler = e => {
        e.preventDefault()

        if (title.length && shortName.length) {

            let newMenuInfos = {
                title,
                href: shortName,
                parent: parentMenu == -1 ? undefined : parentMenu
            }
            console.log(newMenuInfos);
            fetch(`http://localhost:4000/v1/menus`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMenuInfos)
            })
                .then(res => res.json())
                .then(datas => {
                    console.log(datas);
                    getAllMenus()
                    setTitle("")
                    setShortName("")
                    setParentMenu(-1)
                    categoryMenuRef.current.value = '-1'
                    swal({
                        title: "با موفقیت منو اضافه شد",
                        icon: 'success',
                        buttons: 'باشه'
                    })
                })

        } else {
            swal({
                title: 'لطفا مقادیر خواسته شده را تکمیل کنید',
                icon: 'warning',
                buttons: 'باشه',
                timer: 2000
            })
        }


    }

    const handleRemoveMenu = e => {
        e.preventDefault()
        fetch(`http://localhost:4000/v1/menus/${menuID}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        })
            .then(res => res.json())
            .then(() => {
                getAllMenus()
                setIsShowModalRemove(false)
                swal({
                    title: "با موفقیت منو پاک شد",
                    icon: 'success',
                    buttons: 'باشه'
                })
            })

    }

    const getAllMenus = () => {
        fetch(`http://localhost:4000/v1/menus/all`)
            .then(res => res.json())
            .then(datas => {
                setMenus(datas)
            })
    }

    return (
        <div>

            <div className='com-main'>
                <h1 className='com-title'>افزودن منو جدید</h1>

                <form className='add-com-form'>
                    <div className='add-com-form-wrap'>
                        <InputEditModal valInp={title} setValInp={setTitle} cildren={<SiNamecheap />} placeHolderInp='عنوان منو' />
                        <InputEditModal valInp={shortName} setValInp={setShortName} cildren={<GoRelFilePath />} placeHolderInp='URL منو' />
                        <select className="form-select border mt-md-5" onChange={event => setParentMenu(event.target.value)} ref={categoryMenuRef}>
                            <option value="-1">دسته بندی منو</option>
                            {
                                menus && menus.filter(menu => !menu?.parent).map((menu, index) => (
                                    <option key={index} value={menu._id}>{menu.title}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button className='add-com-submit' onClick={(e) => createMenuHandler(e)}>اضافه کردن منو</button>
                </form>
            </div>

            {menus && <h1 className='products-title title-pr'>لیست منو ها</h1>}
            <div className='parent-table'>
                {
                    menus ? (
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">شناسه</th>
                                    <th scope="col">عنوان</th>
                                    <th scope="col">URL منو</th>
                                    <th scope="col">دسته بندی</th>
                                    <th scope="col">حذف</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    menus.map((menu, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{menu.title}</td>
                                            <td>{menu.href}</td>
                                            <td>{!menu?.parent ? "#" : menu.parent.title}</td>
                                            <td>
                                                <button className='products-table-btn' onClick={() => {
                                                    setMenuID(menu._id)
                                                    setIsShowModalRemove(true)
                                                }}>حذف</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : <ErrorBoxEmpty msg={'هیچ منویی یافت نشد'} />
                }
            </div>

            {
                isShowModalRemove &&
                <DeleteModal cancleAction={() => setIsShowModalRemove(false)} submitAction={e => handleRemoveMenu(e)} title={'آیا از حذف منو اطمینان دارید؟'} />
            }

        </div>
    )
}