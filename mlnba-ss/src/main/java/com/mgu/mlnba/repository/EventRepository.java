package com.mgu.mlnba.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.mgu.mlnba.model.Event;

public interface EventRepository extends ReactiveMongoRepository<Event, String> {

}
