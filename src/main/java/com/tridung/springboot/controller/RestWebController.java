package com.tridung.springboot.controller;

import com.tridung.springboot.model.Customer;
import com.tridung.springboot.model.Response;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class RestWebController {

    private List<Customer> customerList = new ArrayList<>();

    @GetMapping(value = "/all")
    public Response getResponse() {
        return new Response("Done", customerList);
    }

    @PostMapping(value = "/save")
    public Response postCustomer(@RequestBody Customer customer) {
        customerList.add(customer);

        Response response = new Response("Done", customer);
        return response;
    }
}
