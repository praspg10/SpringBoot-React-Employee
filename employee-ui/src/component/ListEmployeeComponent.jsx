import React,{useEffect, useState} from 'react'
import { employeeServiceGetList } from '../services/EmployeeServices'
import { deleteEmployeeToBackend } from '../services/EmployeeServices'

import { useNavigate } from 'react-router-dom'


const ListEmployeeComponent = () => {

const [employeesListFromRestApi, setEmployeesListFromRestApi] = useState([])

const navigate = useNavigate();

useEffect (()=> {
                    getAllEmployees();
                },[])

function getAllEmployees()
{
    employeeServiceGetList()
                    .then((response)=>{  setEmployeesListFromRestApi(response.data); })
                    .catch((error)=>{  console.error(error);  })
}
function callAddNewEmployeeScreen()
{
    navigate('/add-new-employee-screen');
}


function getEmployeeInfo(id)
{
    console.log('id='+id);
    navigate(`/update-employee-screen/${id}`);
}

function deleteEmployeeInfo(id)
{
    console.log('id='+id);
    const confOption = confirm("Do you confirm to Delete Employee Id:",id);
    if(confOption)
    {
    deleteEmployeeToBackend(id).then((response)=>{
                    console.log(response.data);
                    getAllEmployees();
                });
    }else
    {
        return false;
    }
}
  return (
    <div className="container">
        <h2>All Employees List</h2>
        <button type='button' className='btn btn-primary mb-2' onClick={callAddNewEmployeeScreen}>Add New Employee</button>
    {
        (employeesListFromRestApi.length>0) && 
        (
        
        <table className="table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>EmailId</th>
                    <th>DELETE</th>
                </tr>
            </thead>
            <tbody>
                {
                   employeesListFromRestApi.map(employee =>
                         <tr key={employee.id}>
                            <td> <button type='button' className='btn btn-link' onClick={() => getEmployeeInfo(employee.id)}>{employee.id}</button> </td>
                            <td>{employee.firstname}</td>
                            <td>{employee.lastname}</td>
                            <td>{employee.emailid}</td>
                            <td><button type='button' className="btn-close" aria-label="Close" onClick={() => deleteEmployeeInfo(employee.id)}></button> </td>
                        </tr>

                    )


                }
               
            </tbody>
        </table>
        )
    }
    </div>
  )
}

export default ListEmployeeComponent