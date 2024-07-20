import React, {useEffect, useState} from "react";
import ErrorBoxEmpty from "../../Components/ErrorBoxEmpty/ErrorBoxEmpty";

export default function AdminPanelTickets() {

    const [tickets, setTickets] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/v1/tickets`, {
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
    }, [])

    return(
        <div>
           <div>
            {tickets.length && <h1 className='products-title title-pr'>تیکت ها</h1>}
            <div className='parent-table'>
                {
                    tickets.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">شناسه</th>
                                    <th scope="col">حذف</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    tickets && tickets.map((ticket, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
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
        </div>
        </div>
    )
}