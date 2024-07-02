import React, { useEffect, useState } from "react";
import DeleteModal from '../../Components/Modals/DeleteModal/DeleteModal'
import EditMoal from '../../Components/Modals/EditMoal/EditMoal'
import ErrorBoxEmpty from '../../Components/ErrorBoxEmpty/ErrorBoxEmpty'

export default function AdminPanelCategories() {

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [allCategories, setAllCategories] = useState([])

    useEffect(() => {
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
    }, [])

    const deleteModalCancleAction = () => setIsShowDeleteModal(false)

    const deleteModalSubmitAction = ID => {

        fetch(`http://localhost:4000/v1/category/${ID}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        })
            .then(res => res.json())
            .then(datas => {
                console.log(datas);
                setAllCategories(datas)
                setIsShowDeleteModal(false)
            })
    }

    const updateProductInfos = event => {
        event.preventDefault()

        /* fetch(`http://localhost:4000/v1/courses/${categoryID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productsUpdateInfos)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                getAllProducts()
            })
        setIsShowEditModal(false) */
    }

    return (
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
                                                    <button className='products-table-btn'>ویرایش</button>
                                                </td>
                                                <td>
                                                    <button className='products-table-btn' onClick={() => deleteModalSubmitAction(category._id)}>حذف</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ) : <ErrorBoxEmpty msg={'هیچ دسته بندی ای یافت نشد'} />
                    }
                    {isShowDeleteModal && <DeleteModal submitAction={deleteModalSubmitAction} cancleAction={deleteModalCancleAction} title='آیا از حذف محصول اطمینان دارید' />}
                    {isShowEditModal &&
                        <EditMoal onClose={() => setIsShowEditModal(false)} onSubmit={updateProductInfos} title={'اطلاعات جدید را وارد نمایید'}>
                            {/*                         <InputEditModal setValInp={setProductTitle} valInp={productTitle} cildren={<MdOutlineTitle />} placeHolderInp={"عنوان "} />
 */}                    </EditMoal>
                    }
                </div>
            </div>
        </section>
    )
}