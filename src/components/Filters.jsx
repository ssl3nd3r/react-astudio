import React , { useContext , useState , useEffect} from 'react'
import { FiltersContext } from './Layout'
import axios from 'axios'

export default function Filters({filters}) {
  const [query , setQuery , searchQuery, setSearchQuery , entries, setEntries] = useContext(FiltersContext)
  const [search, setSearch] = useState(false)

  const changeQuery = e => {
    if (e.target.value === 'all') {
      setQuery('');
    }
    else {
      if (e.target.getAttribute('data-key') === 'category') {
        setQuery(`/category/${e.target.value}`);
      }
      else {
        setQuery(`/filter?key=${e.target.getAttribute('data-key')}&value=${e.target.value}`)
      }
    }
  }

  return (
      <div className='flex items-center divide-x-4 divide-as-gray'>
        <div className='px-3 first:pl-0 last:pr-0 flex items-center gap-1'>
          <select onChange={e => setEntries(parseInt(e.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <span>Entries</span>
        </div>
        <div onClick={()=>setSearch(true)} className='px-3 first:pl-0 last:pr-0 flex gap-2 items-center'>
          <img src="/assets/search.png" alt="search" className='h-4' />
          <input onChange={(e)=>setSearchQuery(e.target.value)} type="text" className='border-b outline-none border-as-black transition-all duration-500' style={{width : search ? '150px' : '0px'}}/>
        </div>
        <div className='px-3 first:pl-0 last:pr-0 flex gap-3.5 items-center'>
          {Object.keys(filters).map(filter => (
            <div key={`filter-${filter}`} className='flex items-center gap-1'>
              <span>{filter}</span>
              <select data-key={Object.keys(filters[filter])[0]} onChange={changeQuery}>
                <option value="all">All</option>
                {filters[filter][Object.keys(filters[filter])[0]].map(f => (
                  <option key={`cat-${f}`} value={f}>{f}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        
      </div>
  )
}
