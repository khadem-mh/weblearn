import React, { useEffect, useState } from "react";
import ErrorBoxEmpty from "../../Components/ErrorBoxEmpty/ErrorBoxEmpty";
import DetailsModal from "../../Components/Modals/DetailsModal/DetailsModal";
import EditMoal from "../../Components/Modals/EditMoal/EditMoal";
import swal from "sweetalert";

export default function AdminPanelTickets() {

    const [tickets, setTickets] = useState([])
    const [replyTicketID, setReplyTicketID] = useState({
        ticketID: null,
        reply: ""
    })
    const [isShowticket, setIsShowticket] = useState({
        isShow: false,
        body: ''
    })

    useEffect(() => {
        getAllTickets()
    }, [])

    const getAllTickets = () => {
        fetch(`https://weblearning.liara.run/v1/tickets`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            }
        })
            .then(res => res.json())
            .then(datas => {
                console.log(datas);
                setTickets(datas)
            })
    }

    const submitReplyToTicket = event => {
        event.preventDefault()

        fetch(`https://weblearning.liara.run/v1/tickets/answer`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body: replyTicketID.reply,
                ticketID: replyTicketID.ticketID
            })
        })
            .then(res => res.json())
            .then(res => {
                getAllTickets()
                setReplyTicketID({ ticketID: null, reply: "" })
                {
                    swal({
                        title: 'با موفقیت پاسخ داده شد',
                        icon: 'success',
                        buttons: 'باشه'
                    })
                }
            })

    }

    return (
        <>
            <section>
                {tickets.length && <h1 className='products-title title-pr'>تیکت ها</h1>}
                <div className='parent-table'>
                    {
                        tickets.length ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">شناسه</th>
                                        <th scope="col">کاربر</th>
                                        <th scope="col">موضوع</th>
                                        <th scope="col">متن تیکت</th>
                                        <th scope="col">ارتباط با</th>
                                        <th scope="col">دوره</th>
                                        <th scope="col">پاسخ</th>
                                        <th scope="col">حذف</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        tickets && tickets.map((ticket, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{ticket.user}</td>
                                                <td>{ticket.title}</td>
                                                <td>
                                                    <button className='products-table-btn'
                                                        onClick={() => setIsShowticket({ isShow: true, body: ticket.body })}
                                                    >مشاهده تیکت</button>
                                                </td>
                                                <td className="text-secondary">{ticket.departmentSubID}</td>
                                                <td>{ticket.course ? ticket.course : '___'}</td>
                                                <td>
                                                    {
                                                        ticket.answer === 1
                                                            ?
                                                            <button className='products-table-btn' disabled>پاسخ داده شده</button>
                                                            :
                                                            <button className='products-table-btn'
                                                                onClick={() => setReplyTicketID({ ticketID: ticket._id })}
                                                            >ثبت پاسخ</button>
                                                    }

                                                </td>
                                                <td>
                                                    <button className='products-table-btn'>حذف</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ) : <ErrorBoxEmpty msg={'هیچ تیکتی یافت نشد'} />
                    }
                </div>
            </section>

            {
                isShowticket.isShow &&
                <DetailsModal onHide={() => setIsShowticket({ isShow: false, body: "" })} tdIntoTbody={[isShowticket.body]} />
            }

            {
                replyTicketID.ticketID &&
                <EditMoal onClose={() => setReplyTicketID({ ticketID: null, reply: "" })} onSubmit={event => submitReplyToTicket(event)} title={'پاسخ خود را وارد نمایید'}>
                    <textarea value={replyTicketID.reply} onChange={e => setReplyTicketID(prev => {
                        return {
                            ...prev,
                            reply: e.target.value
                        }
                    })}>پاسخ: </textarea>
                </EditMoal>
            }

        </>
    )
}