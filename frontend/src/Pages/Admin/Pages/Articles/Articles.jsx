import React, { useEffect, useState } from "react";
import EditMoal from "../../Components/Modals/EditMoal/EditMoal";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import ErrorBoxEmpty from "../../Components/ErrorBoxEmpty/ErrorBoxEmpty";
import swal from "sweetalert";
import './Articles.css'

export default function AdminPanelArticles() {

    const [articles, setArticles] = useState([])
    const [isShowModalDel, setIsShowModalDel] = useState(false)
    const [choosIDForRemove, setChoosIDForRemove] = useState("")


    useEffect(() => {
        getArticles()
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

    return (
        <>
            <div className='parent-table'>
                {
                    articles.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">شناسه</th>
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
                                            <td>{product.title}</td>
                                            <td style={{fontSize: '1.3rem', color: 'gray'}}>{product.shortName}</td>
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