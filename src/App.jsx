import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Layout from './components/Layout'
import Products from './pages/Products'
import Users from './pages/Users'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Products />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  )
}
