package com.mgu.mlnba.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.mgu.mlnba.model.News;

public interface NewsRepository extends ReactiveMongoRepository<News, String> {
}
