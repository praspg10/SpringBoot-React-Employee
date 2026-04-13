package com.sample.employee.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sample.employee.dto.EmployeeDto;
import com.sample.employee.entity.Employee;
import com.sample.employee.exception.ResourceNotFoundException;
import com.sample.employee.mapper.EmpTransferMapper;
import com.sample.employee.repository.EmployeeRepository;

@Service

public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepository employeeRepository;

    @SuppressWarnings("null")
    @Override
    public EmployeeDto addEmployee(EmployeeDto addEmployeeDto) {
        
        Employee    addEmployee = EmpTransferMapper.convertToEmployee(addEmployeeDto);
        Employee createdEmployee = employeeRepository.save(addEmployee);

        return  EmpTransferMapper.convertToEmployeeDto(createdEmployee);
       
    }

    @Override
    public List<EmployeeDto> getAllEmployeeList() {
        List<Employee>  employeeList = employeeRepository.findAll();
      List<EmployeeDto>  employeeDtoList = employeeList
                                                .stream()
                                                .map(
                                                    employee ->EmpTransferMapper
                                                                    .convertToEmployeeDto(employee))
                                                                    .collect(Collectors.toList());
        return employeeDtoList;
    }

    @SuppressWarnings("null")
    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        
        Employee employee = employeeRepository.findById(employeeId)
                                .orElseThrow(()-> new ResourceNotFoundException("Employee not found id:"+employeeId));
        return EmpTransferMapper.convertToEmployeeDto(employee);
    }

    @SuppressWarnings("null")
    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee) {
        Employee existEmployee = employeeRepository.findById(employeeId)
                                .orElseThrow(()-> new ResourceNotFoundException("Employee not found id:"+employeeId));
        existEmployee.setFirstname(updateEmployee.getFirstname());
        existEmployee.setLastname(updateEmployee.getLastname());
        existEmployee.setEmailid(updateEmployee.getEmailid());

        Employee finalEmployee = employeeRepository.save(existEmployee);

        return EmpTransferMapper.convertToEmployeeDto(finalEmployee);
    }

    @SuppressWarnings("null")
    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                                .orElseThrow(()-> new ResourceNotFoundException("Employee not found id:"+employeeId));
        employeeRepository.delete(employee);
        
    }


    

}
