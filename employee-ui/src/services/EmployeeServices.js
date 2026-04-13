import axios from "axios";

const REST_BASE_URL="http://localhost:8080/api/employees";

export const employeeServiceGetList =()=>axios.get(REST_BASE_URL);

export const createNewEmployeeToBackend =(employee)=>axios.post(REST_BASE_URL,employee);

export const getEmployeeFromBackend =(id)=>axios.get(REST_BASE_URL+'/'+id);

export const updateEmployeeToBackend =(id,employee)=>axios.put(REST_BASE_URL+'/'+id,employee);

export const deleteEmployeeToBackend =(id)=>axios.delete(REST_BASE_URL+'/'+id);
 
