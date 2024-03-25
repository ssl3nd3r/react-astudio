import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Filters from '../components/Filters'
import Table from '../components/Table'

export default function Users() {

  const columns = ['FIRST NAME','LAST NAME', 'MAIDEN NAME', 'AGE', 'GENDER', 'EMAIL', 'USERNAME', 'BLOOD GROUP', 'EYE COLOR'];
  const rows = [ 'firstName', 'lastName', 'maidenName', 'age', 'gender', 'email', 'username', 'bloodGroup', 'eyeColor'];
  const filters = {
    'Gender' : {
     'gender' : ['male' , 'female']
    },
    'Blood Group' : {
     'bloodGroup' : ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    }
  }
  
  return (
    <div className='p-3 flex flex-col gap-3'>
      <Breadcrumb active='Users'/>
      <Filters filters={filters}/>
      <Table columns={columns} rows={rows} api='https://dummyjson.com/users' target='users' />
    </div>
  )
}
