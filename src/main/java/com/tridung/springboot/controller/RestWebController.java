package com.tridung.springboot.controller;

import com.tridung.springboot.model.Customer;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class RestWebController {

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ResponseBody
    public List<Customer> listCustomer(Model model) {
        model.addAttribute("customers", CustomerStub.list());
        return CustomerStub.list();
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public Customer createCustomer(@RequestBody Customer customer) {
        System.out.println("Add new a customer");
        CustomerStub.create(customer);
        return customer;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteCustomer(@PathVariable long id) {
        System.out.println("Delete a customer with id = " + id);
        CustomerStub.delete(id);
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public void updateCustomer(@PathVariable long id, @RequestBody Customer customer) {
        System.out.println("Update a customer with id = " + id);
        CustomerStub.update(id, customer);
    }
}
