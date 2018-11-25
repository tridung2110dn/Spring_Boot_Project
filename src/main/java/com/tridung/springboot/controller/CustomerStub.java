package com.tridung.springboot.controller;

import com.tridung.springboot.model.Customer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CustomerStub {
    private static Map<Long, Customer> customers = new HashMap<Long, Customer>();
    private static Long idIndex = 3L;

    //populate initial customers
    static {
        Customer a = new Customer(1, "Tri", "Dung");
        customers.put(1L, a);
        Customer b = new Customer(2, "Nguyen", "Hoang");
        customers.put(2L, b);
        Customer c = new Customer(3, "Hoang", "Tri");
        customers.put(3L, c);
    }

    public static List<Customer> list() {
        return new ArrayList<Customer>(customers.values());
    }

    public static Customer create(Customer customer) {
        idIndex += 1;
        customer.setId(idIndex.intValue());
        customers.put(idIndex, customer);
        return customer;
    }

    public static Customer get(Long id) {
        return customers.get(id);
    }

    public static Customer update(Long id, Customer customer) {
        customer.setId(id.intValue());
        customers.put(id, customer);
        return customer;
    }

    public static Customer delete(Long id) {
        return customers.remove(id);
    }

}
