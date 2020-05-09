package com.mgu.mlnba.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.mgu.mlnba.model.TeamGroup;

public interface TeamGroupRepository extends ReactiveMongoRepository<TeamGroup, String> {

}
