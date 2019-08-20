package com.mgu.mlnba.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.mgu.mlnba.model.Team;

public interface TeamRepository extends ReactiveMongoRepository<Team, String> {

}
