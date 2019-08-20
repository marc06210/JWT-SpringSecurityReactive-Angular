package com.mgu.mlnba.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.mgu.mlnba.model.Role;

public interface RoleRepository extends ReactiveMongoRepository<Role, String> {

}
