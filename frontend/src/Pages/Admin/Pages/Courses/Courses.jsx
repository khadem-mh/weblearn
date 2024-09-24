import React, { useState, useEffect } from 'react'
import './Courses.css'
import AddNewProduct from '../../Components/AddNewProduct/AddNewProduct'
import ProductsTable from '../../Components/ProductsTable/ProductsTable'

export default function AdminPanelCourses() {

  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    getAllProducts()
  }, [])

  const getAllProducts = () => {
    fetch("http://localhost:4000/v1/courses", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
      .then(res => res.json())
      .then(courses => {
        console.log(courses);
        setAllProducts(courses)
      })
  }

  return (
    <section>
      <AddNewProduct getAllProducts={getAllProducts} />
      <ProductsTable allProducts={allProducts} getAllProducts={getAllProducts} />
    </section>
  )
}
