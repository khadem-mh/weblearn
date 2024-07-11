import React, { useState, useEffect } from "react";
import ErrorBoxEmpty from "../../Components/ErrorBoxEmpty/ErrorBoxEmpty";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import './Menus.css'
import swal from "sweetalert";

export default function AdminPanelMenus() {

    const [menus, setMenus] = useState([])
    const [menuID, setMenuID] = useState(null)
    const [isShowModalRemove, setIsShowModalRemove] = useState(false)

    useEffect(() => {
        getAllMenus()
    }, [])

    useEffect(() => {
        console.log(menus);
    }, [menus])

    const handleRemoveMenu = e => {
        e.preventDefault()
        fetch(`http://localhost:4000/v1/menus/${menuID}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
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
                                    <th scope="col">ویرایش</th>
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
                                            <td>{!menu?.parent ? "#" : "_"}</td>
                                            <td>
                                                <button className='products-table-btn'>ویرایش</button>
                                            </td>
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
                <DeleteModal cancleAction={() => setIsShowModalRemove(false)} submitAction={e => handleRemoveMenu(e)} title={'آیا از حذف منو اطمینان دارید؟'}/>
            }

        </div>
    )
}