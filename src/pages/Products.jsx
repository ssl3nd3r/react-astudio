import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Filters from '../components/Filters'
import Table from '../components/Table'


export default function Products() {
  const columns = ['TITLE','DESCRIPTION', 'CATEGORY', 'BRAND' , 'PRICE', 'DISCOUNT %', 'RATING', 'STOCK'];
  const rows = ["title","description","category","brand","price","discountPercentage","rating","stock"];
  const filters = {
    'Category' : {
     'category' : ['smartphones' , 'laptops']
    }
  }
  
  return (
    <div className='p-3 flex flex-col gap-3'>
      <Breadcrumb active='Products'/>
      <Filters filters={filters}/>
      <Table columns={columns} rows={rows} api='https://dummyjson.com/products' target='products' />
    </div>
  )
}
