package com.sample.employee.mapper;

import com.sample.employee.dto.EmployeeDto;
import com.sample.employee.entity.Employee;

public class EmpTransferMapper {
    
    public static Employee convertToEmployee(EmployeeDto employeeDto)
    {
        return new Employee(
                        employeeDto.getId(),
                        employeeDto.getFirstname(),
                        employeeDto.getLastname(),
                        employeeDto.getEmailid());
    }

    public static  EmployeeDto convertToEmployeeDto(Employee employee)
    {
        return new EmployeeDto(
                        employee.getId(),
                        employee.getFirstname(),
                        employee.getLastname(),
                        employee.getEmailid());
    }
}
