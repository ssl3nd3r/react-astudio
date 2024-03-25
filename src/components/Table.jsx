import React , {useState , useEffect , useContext} from 'react'
import axios from 'axios';
import { FiltersContext } from './Layout';
import _ from 'lodash';

export default function Table({columns , rows , api, target}) {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(true)
  const [query , setQuery, searchQuery, setSearchQuery ,entries, setEntries] = useContext(FiltersContext);

  function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
  
  function getData() {
    setIsLoading(true);
    setData([]);
    setFilteredData([]);
    axios.get(api+query)
    .then(res => {
      setData(res?.data[target]);
      setFilteredData(res?.data[target]);
      setIsLoading(false);
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getData();
  }, [query])

  useEffect(() => {
   let searchData;
   let bool;
   if(searchQuery !== '') {
    searchData = data.filter(rec => {
        bool = false;
        Object.values(rec).forEach(e => {
          if (String(e).toLowerCase().includes(searchQuery.toLowerCase())) bool = true;
        });
        return bool;
      }
    );
   }
   else {
    searchData = data;
   }
   setFilteredData(searchData);
  }, [searchQuery])

  useEffect(() => {
    setActive(1);
  }, [entries])

  useEffect(() => {
    document.querySelectorAll('.data-table tbody')?.forEach(e => e.classList.add('hidden'));
    document.querySelectorAll('.data-table tbody')[active-1]?.classList.remove('hidden');
  }, [active])
  

  
  return (
      filteredData && filteredData.length > 0 
      ?
      <>
        <table className='mt-6 data-table'>
          <thead>
            <tr className='text-left bg-as-blue'>
              {columns.map((col , index) => <th key={`col-${index+1}`} className='border border-as-gray p-2.5'>{col}</th>)}
            </tr>
          </thead>
          {chunkArray(filteredData, entries).map((arr, index) => (
            <tbody key={`tbody-${index+1}`} className={index === 0 ? '' : 'hidden'}>
              {arr.map(rec => (
                <tr key={`rec-${rec.id}`} className="hover:bg-as-gray/80 transition-colors duration-500">
                  {rows.map(row => <td key={`rec-${rec.id}-${rec[row]}`} className='border border-as-gray p-2.5'>{rec[row]}</td>)}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
        
        {chunkArray(filteredData, entries).length > 1 &&
        <div className='flex gap-2 mt-6 mx-auto'>
          {chunkArray(filteredData, entries).map((arr, index) => <a key={`paginate-${index+1}`} onClick={()=>setActive(index+1)} className={(active === index+1 ? 'font-bold -translate-y-1' : 'font-normal') + ' transition-all duration-300'} href="#">{index+1}</a>)}
        </div>
        }
        <span className='text-center'>Total: {filteredData.length}</span>
      </>
      :
      isLoading
      ?
      <p className='mx-auto mt-20 italic font-semibold'>Loading...</p>
      :
      <p className='mx-auto mt-20 italic font-semibold'>No data found</p>
  )
}
