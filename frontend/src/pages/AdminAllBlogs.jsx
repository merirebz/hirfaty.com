import React from 'react'
import AllBlogs from '../components/Admin/Blogs/AllBlogs'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'

const AdminAllBlogs = () => {
  return (
    <div>
      <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={6} />
        </div>
        <AllBlogs />
      </div>
    </div>
    </div>
  )
}

export default AdminAllBlogs
