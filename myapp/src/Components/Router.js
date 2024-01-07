import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Addcase from '../Screens/Cases/Addcase'
import Home from '../Screens/Home'
import DataTable from '../Screens/Cases/Viewcases'
import History from '../Screens/Cases/History'
import Factsheet from '../Screens/Cases/Factsheet'
import Factsheetview from '../Screens/Cases/Factsheetview'
import Viewtodaycase from '../Screens/Cases/Viewtodaycase'
import Factsheetedit from '../Screens/Cases/Factsheetedit'
import Errorpage from '../Screens/Error/Errorpage'
import TodayHearings from '../Screens/Cases/Todayhearing'
import ViewcaseModal from './ViewcaseModal'
import Editcase from '../Screens/Editpages/Editcase'
import Editrequest from '../Screens/Editpages/Editrequest'
// import Usersview from '../Screens/Userscreens/Usersview'
import Getusers from '../Screens/Users/Getusers'
import Adduser from '../Screens/Users/Adduser'
import Newcaseget from '../Screens/Cases/Newcaseget'
import RolebaseCases from '../Screens/Client/RolebaseCases'
import ProtectedRoute from './ProtectedRoutes'
import Addroles from '../Screens/Settings/Admin/Addroles'
import Usersedit from '../Screens/Users/Usersedit'
import TwoFactorAuthSetup from '../Screens/Twofactor.js/GenerateQr'





const Router = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute component={Home} allowedRoles={["1"]} />} />
        <Route path='/addcase' element={<ProtectedRoute component={Addcase} allowedRoles={["1" , "Subadmin"]} />} />
        {/* <Route path='/viewcases' element={<DataTable />} />/ */}

        <Route path='/viewcases' element={<ProtectedRoute component={Newcaseget} allowedRoles={["1" , "Subadmin"]} />} />
        <Route path='/viewdetails/:caseId/:title' element={<ProtectedRoute component={History} allowedRoles={["1"]} />} />
        <Route path='/Factsheet/:caseId/:title' element={<ProtectedRoute component={Factsheet} allowedRoles={["1"]} />} />
        <Route path='/factsheetview/:caseId' element={<ProtectedRoute component={Factsheetview} allowedRoles={["1"]} />} />
        <Route path='/todaycase' element={<ProtectedRoute component={Viewtodaycase} allowedRoles={["1"]} />} />
        <Route path='/factsheetedit/:id' element={<ProtectedRoute component={Factsheetedit} allowedRoles={["1"]} />} />
        <Route path='/todayhearings' element={<ProtectedRoute component={TodayHearings} allowedRoles={["1"]} />} />
        <Route path='/*' element={<Errorpage />} />
        <Route path='/vmodal' element={<ProtectedRoute component={ViewcaseModal} allowedRoles={["1"]} />} />
        <Route path='/Editcase/:id' element={<ProtectedRoute component={Editcase} allowedRoles={["1" , "Subadmin"]} />} />
        <Route path='/editreq' element={<ProtectedRoute component={Editrequest} allowedRoles={["1"]} />} />
        {/* <Route path='/user' element={<ProtectedRoute component={Usersview} allowedRoles={["1"]} />} /> */}
        <Route path='/allusers' element={<ProtectedRoute component={Getusers} allowedRoles={["1"]} />} />
        <Route path='/addusers' element={<ProtectedRoute component={Adduser} allowedRoles={["1"]} />} />
        <Route path='/addrole' element={<ProtectedRoute component={Addroles} allowedRoles={["1"]} />} />
        <Route path='/useredit/:id' element={<ProtectedRoute component={Usersedit} allowedRoles={["1"]} />} />


        <Route path='/generateqrcode' element={<TwoFactorAuthSetup />} />
        <Route path='/role' element={<RolebaseCases />} />





      </Routes>
    </>
  )
}

export default Router