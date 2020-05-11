package com.mgu.mlnba.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.mgu.mlnba.model.Match;

public interface MatchRepository extends ReactiveMongoRepository<Match, String> {
}
