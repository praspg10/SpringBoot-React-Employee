package com.sample.employee.service;

import java.util.List;
// import java.util.Optional;

import com.sample.employee.dto.EmployeeDto;

public interface EmployeeService {

    public EmployeeDto addEmployee(EmployeeDto addEmployee);
    public List<EmployeeDto> getAllEmployeeList();
    public EmployeeDto getEmployeeById(Long employeeId);
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee);
    public void deleteEmployee(Long employeeId);
}
