package com.sample.employee.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sample.employee.dto.EmployeeDto;
import com.sample.employee.service.EmployeeService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody  EmployeeDto newEmployeeDto)
    {
        log.info("Inside createEmployee "+newEmployeeDto.toString());
        log.info("Inside FNAme "+newEmployeeDto.getFirstname());
        log.info("Inside LName "+newEmployeeDto.getLastname());
        EmployeeDto  createdEmployeeDto = employeeService.addEmployee(newEmployeeDto);
        return new ResponseEntity<>(createdEmployeeDto,HttpStatus.CREATED);
    }
    
    @GetMapping
    public  ResponseEntity<List<EmployeeDto>> getAllEmployee()
    {
        List<EmployeeDto> employeeDtoList = employeeService.getAllEmployeeList();
        return new ResponseEntity<>(employeeDtoList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeDetails(@PathVariable("id") Long employeeId) {
        
        EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);

        return new ResponseEntity<>(employeeDto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId, @RequestBody  EmployeeDto updateEmployeeDto)
    {
        EmployeeDto  updatedEmployeeDto = employeeService.updateEmployee(employeeId,  updateEmployeeDto);
        return new ResponseEntity<>(updatedEmployeeDto,HttpStatus.OK);
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId) {
        
        employeeService.deleteEmployee(employeeId);

        return  ResponseEntity.ok("Employee Deleted");
    }
}
