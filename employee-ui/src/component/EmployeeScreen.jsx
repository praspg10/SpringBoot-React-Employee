import React, {useEffect, useState} from 'react'
import { createNewEmployeeToBackend } from '../services/EmployeeServices'
import { getEmployeeFromBackend } from '../services/EmployeeServices'
import { updateEmployeeToBackend } from '../services/EmployeeServices'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeScreen = () => {

const [firstname, setFirstname] = useState('')
const [lastname, setLastname] = useState('')
const [emailid, setEmailid] = useState('')

const {id} =useParams();

const [errors,setErrors]=useState({
    firstname:'',
    lastname:'',
    emailid:''
})

const navigator = useNavigate();

useEffect(()=>{

                if(id)
                {
                    getEmployeeFromBackend(id).then((response)=>{
                        console.log(response.data);
                        setFirstname(response.data.firstname);
                        setLastname(response.data.lastname);
                        setEmailid(response.data.emailid);
                    }).catch(error =>{
                        console.error(error);
                    })
                }
            },[id])

function saveorUpdateEmployee(e)
{
    e.preventDefault();

    if(validateForm())
    {
        const employee = { firstname,lastname,emailid}
        console.log('saveNewEmployee ='+employee);
        if(id)
        {
            updateEmployeeToBackend(id,employee).then((response)=>{
                console.log(response.data);
                navigator('/employees')
            }).catch(error =>{
                        console.error(error);
            });
        }else{
            createNewEmployeeToBackend(employee).then((response)=>{
                console.log(response.data);
                navigator('/employees')
            });
        }
    }

}

function validateForm()
{
    let valid=true;
    const errorsCopy ={... errors};

    if(firstname.trim()){
        errorsCopy.firstname='';
    }else{
        errorsCopy.firstname='Firstname is Required';
        valid=false;

    }

     if(lastname.trim()){
        errorsCopy.lastname='';
    }else{
        errorsCopy.lastname='Lastname is Required';
        valid=false;

    }

     if(emailid.trim()){
        errorsCopy.emailid='';
    }else{
        errorsCopy.emailid='emailid is Required';
        valid=false;

    }

    setErrors(errorsCopy);
    return valid;

}



function pageTitle()
{
    if(id)
    {
        return <h2 className="text-center">Update Employee</h2>
    }else{
        return <h2 className="text-center">Add New Employee</h2>
    }

}

  return (
    <div>
        <div className="container">
            <br></br>
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                            <label className="form-label">Employee First Name</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.firstname ? 'is-invalid':''}`}
                                name="firstname"
                                value={firstname}
                                onChange={(e)=>setFirstname(e.target.value)}
                                placeholder='Type Employee First Name' 
                            ></input>
                            { errors.firstname && <div className='invalid-feedback'>{errors.firstname}</div>}
                            </div>

                            <div className="form-group mb-2">
                            <label className="form-label">Employee Last Name</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.lastname ? 'is-invalid':''}`}
                                name="lastname"
                                value={lastname}
                                onChange={(e)=>setLastname(e.target.value)}
                                placeholder='Type Employene Last Name' 
                            ></input>
                             { errors.lastname && <div className='invalid-feedback'>{errors.lastname}</div>}
                            </div>

                            <div className="form-group mb-2">
                            <label className="form-label">Employee EmailId</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.emailid ? 'is-invalid':''}`}
                                name="emailid"
                                value={emailid}
                                onChange={(e)=>setEmailid(e.target.value)}
                                placeholder='Type Employee EmailId' 
                            ></input>
                             { errors.emailid && <div className='invalid-feedback'>{errors.emailid}</div>}
                            </div>

                            <button type="button" className="btn btn-success" onClick={saveorUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>



    </div>
  )
}

export default EmployeeScreen
