import React, { useState, useEffect, useContext } from "react";
//Css
import './Css/custom.css'
import './Css/style.css'
import './Css/medias.css'
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
//import context
import { BtnClickContext } from "./Contexts/BtnClickContext";
import { getOrdersTotalPrice, getProductNotExist, getProductsMaxBuy } from "./Contexts/InfosHomePage";
//Asset
import { Col } from 'react-bootstrap'
//Components
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Side-bar/Sidebar";
//?Icons
import { SiNamecheap } from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";
//Modals
import EditMoal from './Components/Modals/EditMoal/EditMoal'
import DetailsModal from './Components/Modals/DetailsModal/DetailsModal'
import InputEditModal from './Components/InputEditModal/InputEditModal'
//Funcs Folder
import getAllOrders from "./Functions/getAllOrders";
import { AuthContext } from "../../Contexts/AuthContext";

export default function AdminPanel() {
    const [productsMaxBuyProduct, setProductsMaxBuyProduct] = useState()

    const [allProducts, setAllProducts] = useState([])
    const [productsNotExist, setProductsNotExist] = useState([])

    const [getOrders, setGetOrders] = useState([])
    const [ordersTotalPrice, setOrdersTotalPrice] = useState(null)
    //
    const [btnEditAdmin, setBtnEditAdmin] = useState(false)
    const location = useLocation()
    const [isLightMode, setIsLightMode] = useState(false);
    const [isManager, setIsManagar] = useState(true);
    const [isShowDetailsError, setIsShowDetailsError] = useState(false)
    const [managerInfos, setManagerInfos] = useState([]);
    const [adminToken, setAdminToken] = useState('');
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPhone, setAdminPhone] = useState('');

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('admin-infos')) {
            localStorage.removeItem('admin-infos')
        }
    }, [location]);

    useEffect(() => {
        if (localStorage.getItem('user')) setAdminToken(JSON.parse(localStorage.getItem('user')).token)

        if (JSON.parse(localStorage.getItem('light-mode')) === null) {
            localStorage.setItem('light-mode', JSON.stringify('false'))
        }

        else {
            if (JSON.parse(localStorage.getItem('light-mode')) === "true") {
                setIsLightMode(true)
                document.documentElement.classList.add('light-mode')
            } else {
                setIsLightMode(false)
                document.documentElement.classList.remove('light-mode')
            }
        }

        getAllOrders(setGetOrders, setOrdersTotalPrice)
        getAllProducts()
    }, [])

    useEffect(() => {
        if (location.pathname.includes('p-admin/admin')) {
            if (btnEditAdmin) {
                let adminInfos = JSON.parse(localStorage.getItem('admin-infos'))
                setManagerInfos(adminInfos)
            }
        }
    })

    const getAllAdmins = event => {
        event && event.preventDefault()
        let mainAdmin = JSON.parse(localStorage.getItem('user')).token

        if (authContext.userInfos.email === adminEmail && authContext.userInfos.phone === adminPhone && mainAdmin) {
            fetch(`http://localhost:4000/v1/auth/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${mainAdmin}`
                }
            })
                .then(res => res.json())
                .then(adminInfos => {
                    if (adminInfos) {
                        console.log(adminInfos);
                        setManagerInfos(adminInfos)
                        setIsManagar(false)
                        localStorage.setItem('admin-infos', JSON.stringify({ ...adminInfos }))
                    }
                    else setIsShowDetailsError(true)
                })
        } else setIsShowDetailsError(true)

    }

    const getAllProducts = () => {
        fetch("http://localhost:8000/api/products")
            .then(res => res.json())
            .then(products => {
                setAllProducts(products)
                let notExist = []
                let buy = []
                let buyes = products.map(product => {
                    product.count === 0 && notExist.push(product)
                    return { [product.id]: product.sale }
                })
                let productsFind = buyes.filter(productBuy => buy.push(productBuy[Object.keys(productBuy)]))
                let productIDMaxBuyFind = productsFind.find(product => {
                    if (product[Object.keys(product)] === Math.max(...buy)) return product
                    return false
                })
                let findIndexProduct = Object.keys(productIDMaxBuyFind)[0];
                let findProductArray = []
                products.map(product => product.id === +findIndexProduct && findProductArray.push(product))
                setProductsMaxBuyProduct(findProductArray[0])
                setProductsNotExist(notExist)
            })
    }

    return (
        <>

            {
                isManager === false &&
                (
                    <>
                        <Sidebar />
                        <Header isLightMode={isLightMode} setIsLightMode={setIsLightMode}>
                            <Col className="admin-profile">
                                <Link to={'p-admin/admin'} ><img src={managerInfos.img} alt="Admin Profile" /></Link>
                                <div>
                                    <Link to={'p-admin/admin'} ><h1>{managerInfos.firstname} {managerInfos.lastname}</h1></Link>
                                    <h3>{managerInfos.task}</h3>
                                </div>
                            </Col>
                        </Header>
                        <section className="App">
                            <div className="content-middle-cms">
                                <BtnClickContext.Provider value={[btnEditAdmin, setBtnEditAdmin]}>
                                    <getOrdersTotalPrice.Provider value={[ordersTotalPrice, setOrdersTotalPrice]}>
                                        <getProductNotExist.Provider value={[productsNotExist, setProductsNotExist]}>
                                            <getProductsMaxBuy.Provider value={[productsMaxBuyProduct, setProductsMaxBuyProduct]}>
                                                <Outlet />
                                            </getProductsMaxBuy.Provider>
                                        </getProductNotExist.Provider>
                                    </getOrdersTotalPrice.Provider>
                                </BtnClickContext.Provider>

                            </div>
                        </section>
                    </>
                )
            }

            {
                isManager && (
                    <EditMoal title={'ایمیل و رمزعبور خود را وارد نمایید'} onSubmit={getAllAdmins} onClose={() => false} >
                        <InputEditModal setValInp={setAdminEmail} valInp={adminEmail} cildren={<SiNamecheap />} placeHolderInp={"ایمیل خود"} />
                        <InputEditModal setValInp={setAdminPhone} valInp={adminPhone} cildren={<RiLockPasswordLine />} placeHolderInp={"شماره تلفن خود"} />
                    </EditMoal>
                )
            }

            {
                isShowDetailsError && (
                    <DetailsModal onHide={() => setIsShowDetailsError(false)} tdIntoTbody={['خطا : اطلاعات وارد شده صحیح نمی باشد یا اطلاعات فضای محلی اشتباه است']} />
                )
            }

        </>
    );
}