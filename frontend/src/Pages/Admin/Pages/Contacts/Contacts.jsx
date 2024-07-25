import React, { useEffect, useState } from "react";
import EditMoal from "../../Components/Modals/EditMoal/EditMoal";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import ErrorBoxEmpty from "../../Components/ErrorBoxEmpty/ErrorBoxEmpty";
import swal from "sweetalert";

export default function AdminPanelContacts() {

    const [contact, setContact] = useState([])
    const [isShowModalBody, setIsShowModalBody] = useState(false)
    const [isShowModalRes, setIsShowModalRes] = useState(false)
    const [bodyTextReq, setBodyTextReq] = useState("")
    const [resEmail, setResEmail] = useState("")
    const [isShowModalDel, setIsShowModalDel] = useState(false)
    const [choosIDForRemove, setChoosIDForRemove] = useState("")
    const [textInputRes, setTextInputRes] = useState("")


    useEffect(() => {
        getCotacts()
    }, [])

    const getCotacts = () => {
        fetch(`https://weblearning.liara.run/v1/contact`)
            .then(res => res.json())
            .then(datas => {
                console.log(datas);
                setContact(datas)
            })
    }

    const sendResponse = event => {
        event.preventDefault()
        if (textInputRes.length) {

            const nweAnswerToUser = {
                email: resEmail,
                answer: textInputRes
            }

            fetch(`https://weblearning.liara.run/v1/contact/answer`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nweAnswerToUser)
            })
                .then(res => res.json())
                .then(() => {
                    getCotacts()
                    setResEmail("")
                    setTextInputRes("")
                    {
                        swal({
                            title: 'پیغام شما با موفقیت ارسال شد',
                            icon: 'success',
                            buttons: 'باشه'
                        })
                    }
                })
            setIsShowModalRes(false)
        }
    }

    const removeContactHandler = event => {
        event.preventDefault()
        if (choosIDForRemove) {
            fetch(`https://weblearning.liara.run/v1/contact/${choosIDForRemove}`, {
                method: 'DELETE',
                referrerPolicy: 'strict-origin-when-cross-origin',
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                }
            })
                .then(res => res.json())
                .then(() => {
                    getCotacts()
                    setChoosIDForRemove(false)
                    setIsShowModalDel(false)
                    {
                        swal({
                            title: 'پیغام مورد نظر با موفقیت حذف شد',
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
                    contact.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">شناسه</th>
                                    <th scope="col">نام</th>
                                    <th scope="col">شماره تماس</th>
                                    <th scope="col">ایمیل</th>
                                    <th scope="col">پیغام</th>
                                    <th scope="col">پاسخ</th>
                                    <th scope="col">حذف</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    contact.map((product, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{product.name}</td>
                                            <td>{product.phone}</td>
                                            <td>{product.email}</td>
                                            <td>
                                                <button className='products-table-btn' onClick={() => {
                                                    setBodyTextReq(product.body)
                                                    setIsShowModalBody(true)
                                                }}>دیدن پیغام</button>
                                            </td>
                                            <td>
                                                {
                                                    product.answer === 1
                                                        ?
                                                        <button className='products-table-btn' disabled>پاسخ داده شده</button>
                                                        :
                                                        <button className='products-table-btn' onClick={() => {
                                                            setResEmail(product.email)
                                                            setIsShowModalRes(true)
                                                        }}>پاسخ</button>
                                                }
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
                    ) : <ErrorBoxEmpty msg={'هیچ پیغامی یافت نشد'} />
                }
            </div>

            {
                isShowModalRes &&
                <EditMoal onClose={() => setIsShowModalRes(false)} onSubmit={event => sendResponse(event)} title={'پاسخ خود را وارد نمایید'}>
                    <textarea value={textInputRes} onChange={e => setTextInputRes(e.target.value)}>پیغام: </textarea>
                </EditMoal>
            }

            {
                isShowModalBody &&
                <EditMoal onClose={() => setIsShowModalBody(false)} btnIsActive={false}>
                    <textarea readOnly defaultValue={bodyTextReq}></textarea>
                </EditMoal>
            }

            {
                isShowModalDel &&
                <DeleteModal cancleAction={() => setIsShowModalDel(false)} submitAction={e => removeContactHandler(e)} title={'آیا از حذف پیغام اطمینان دارید'}></DeleteModal>
            }

        </>
    )
}