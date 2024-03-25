import React , {createContext , useState} from 'react'
import { Outlet , Link , useLocation } from 'react-router-dom'

export const FiltersContext = createContext();

export default function Layout() {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('')
  const [entries, setEntries] = useState(5)
  return (
    <FiltersContext.Provider value={[query , setQuery , searchQuery, setSearchQuery , entries, setEntries]}>
      <main>
        <div className='p-3 w-full flex justify-between'>
          <img className='h-8' src="/assets/logo.svg" alt="ASTUDIO" />
          <div className='flex gap-2 items-center'>
            <Link className={location.pathname == '/' ? 'font-bold' : 'font-normal'} to="/">Products</Link>
            <Link className={location.pathname == '/users' ? 'font-bold' : 'font-normal'} to="/users">Users</Link>
          </div>
        </div>
        <Outlet/>
      </main>
    </FiltersContext.Provider>
  )
}
