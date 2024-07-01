import React, { useState } from 'react'
import './ProductsTable.css'
import './media.css'
import DeleteModal from '../Modals/DeleteModal/DeleteModal'
import EditMoal from '../Modals/EditMoal/EditMoal'
import ErrorBoxEmpty from '../ErrorBoxEmpty/ErrorBoxEmpty'
import InputEditModal from '../InputEditModal/InputEditModal'

export default function ProductsTable({ allProducts, getAllProducts }) {

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)

    const [productID, setProductID] = useState(null)

    const deleteModalCancleAction = () => setIsShowDeleteModal(false)

    const deleteModalSubmitAction = () => {

        fetch(`http://localhost:4000/v1/courses/${productID}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    getAllProducts()
                    setIsShowDeleteModal(false)
                }
            })
    }

    const updateProductInfos = event => {
        event.preventDefault()

        /* fetch(`http://localhost:4000/v1/courses/${productID}`, {
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
        <div>
            {allProducts.length && <h1 className='products-title title-pr'>دوره ها</h1>}
            <div className='parent-table'>
                {
                    allProducts.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">شناسه</th>
                                    <th scope="col">تصویر</th>
                                    <th scope="col">عنوان</th>
                                    <th scope="col">مبلغ</th>
                                    <th scope="col">مدرس</th>
                                    <th scope="col">وضعیت</th>
                                    <th scope="col">لینک</th>
                                    <th scope="col">دسته</th>
                                    <th scope="col">ویرایش</th>
                                    <th scope="col">حذف</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    allProducts && allProducts.map((product, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img src={`/Images/Courses/${product.cover}`} alt="course" className='products-table-img' />
                                            </td>
                                            <td>{product.name}</td>
                                            <td>{product.price === 0 ? 'رایگان' : `${product.price.toLocaleString()} تومان`}</td>
                                            <td>{product.creator}</td>
                                            <td>{product.status}</td>
                                            <td>{product.shortName}</td>
                                            <td>{product.categoryID.name}</td>
                                            <td>

                                                <button className='products-table-btn'>ویرایش</button>
                                            </td>
                                            <td>
                                                <button className='products-table-btn' onClick={() => {
                                                    setIsShowDeleteModal(true)
                                                    setProductID(product.id)
                                                }}>حذف</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : <ErrorBoxEmpty msg={'هیچ دوره ای یافت نشد'} />
                }
                {isShowDeleteModal && <DeleteModal submitAction={deleteModalSubmitAction} cancleAction={deleteModalCancleAction} title='آیا از حذف محصول اطمینان دارید' />}
                {isShowEditModal &&
                    <EditMoal onClose={() => setIsShowEditModal(false)} onSubmit={updateProductInfos} title={'اطلاعات جدید را وارد نمایید'}>
                        {/*                         <InputEditModal setValInp={setProductTitle} valInp={productTitle} cildren={<MdOutlineTitle />} placeHolderInp={"عنوان "} />
 */}                    </EditMoal>
                }
            </div>
        </div>
    )
}
