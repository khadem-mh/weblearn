import React, { useState, useEffect } from "react";
import ErrorBoxEmpty from "../../Components/ErrorBoxEmpty/ErrorBoxEmpty";
import './Menus.css'

export default function AdminPanelMenus() {

    const [menus, setMenus] = useState()

    useEffect(() => {
        getAllMenus()
    }, [])

    useEffect(() => {
        console.log(menus);
    }, [menus])

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
                                                <button className='products-table-btn'>حذف</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : <ErrorBoxEmpty msg={'هیچ منویی یافت نشد'} />
                }
            </div>
        </div>
    )
}