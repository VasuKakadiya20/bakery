import React from 'react'
import ProductTable from '../product/productlist'
import SingleCategoryPage from '../Categories/Categorieslist'
import { useEffect } from 'react'
import { mycontext } from '../../App'
import { useContext } from 'react'

function Deshbord() {

  const context = useContext(mycontext)

  useEffect(()=>{
    context.setislogin(true);
  })
  return (
   <>
    <div>
      <ProductTable/>
    </div>
    <div className='mt-5 mb-5'>
      <SingleCategoryPage/>
      </div>
   </>
  )
}

export default Deshbord