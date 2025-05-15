import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import CreatePromoProduct from '../components/Admin/PromoProducts/CreatePromoProduct';

const AdminCreatePromoProducts = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={7} />
        </div>
        <div className="w-full justify-center flex">

        <CreatePromoProduct />
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminCreatePromoProducts