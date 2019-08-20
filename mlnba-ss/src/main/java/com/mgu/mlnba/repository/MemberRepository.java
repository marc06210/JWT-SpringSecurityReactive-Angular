package com.mgu.mlnba.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.mgu.mlnba.model.Member;

import reactor.core.publisher.Mono;

public interface MemberRepository extends ReactiveMongoRepository<Member, String> {

    public Mono<Member> findByUsername(String firstname);

}
