import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EditMusicRecord from './EditMusicRecord'
import Login from './Login'
import MusicRecords from './MusicRecords'
import SingleMusicRecords from './SingleMusicRecords'
import ReqAuth from '../component/ReqAuth'

function MainRouters() {
  return ( 
    <Routes>
        <Route path='/' element={<MusicRecords />}></Route>
        <Route path='/music/:id' element={<SingleMusicRecords />}></Route>
        <Route path='/music/:id/edit' element={<ReqAuth><EditMusicRecord /></ReqAuth>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<h3>Page Not Found</h3>}></Route>
    </Routes>
  )
}

export default MainRouters