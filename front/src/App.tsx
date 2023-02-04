import './App.scss'
import { Routes } from "react-router-dom"
import { Navigate, Route, useLocation } from "react-router"
import { Home } from "./pages/Home/Home"
import { Login } from './pages/Login/Login'
import { useCustomDispatch } from './redux/store'
import { mainActions } from './redux/mainSlice'
import { DetailedPost } from './pages/DetailedPost/DetailedPost'


export const App = () => {
	const profile = localStorage.getItem('profile')
	const dispatch = useCustomDispatch()

	dispatch(
    mainActions.setSearchParams(new URLSearchParams(useLocation().search))
  );

	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path={'/post/:id'} element={<DetailedPost />}/>
				<Route path='/login' element={profile ? <Navigate to={'/'} /> : <Login />}/>
			</Routes>
		</div>
	)
}
