package com.mgu.mlnba.handler;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.mgu.mlnba.model.Match;
import com.mgu.mlnba.model.Member;
import com.mgu.mlnba.repository.MatchRepository;
import com.mgu.mlnba.repository.TeamGroupRepository;

import reactor.core.publisher.Mono;

@Component
public class MatchHandler {

    private final MatchRepository matchRepo;
    private final TeamGroupRepository teamRepo;

    public MatchHandler(MatchRepository matchRepo, TeamGroupRepository teamRepo) {
        this.matchRepo = matchRepo;
        this.teamRepo = teamRepo;
    }

    public Mono<ServerResponse> listAll(ServerRequest request) {
        return ServerResponse
                .ok()
                .body(matchRepo.findAll(), Match.class);
    }

    public Mono<ServerResponse> getMatchById(ServerRequest request) {
        return ServerResponse
                .ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(matchRepo.findById(request.pathVariable("id"))
                        .switchIfEmpty(Mono.error(new Exception("Match not found"))), Match.class);
    }

    public Mono<ServerResponse> createMatch(ServerRequest request) {
        Mono<Match> match = request.bodyToMono(Match.class)
                .flatMap(m -> {
                    Mono<Match> a = teamRepo.findById(m.getLocalTeam().getId()).map(
                            t -> {
                                m.setLocalTeam(t);
                                return m;
                            });
                    
                    return a;
                })
                ;
        return ServerResponse
                .ok()
                .body(matchRepo.insert(match).next(), Match.class);
    }

    public Mono<ServerResponse> deleteMatchById(ServerRequest request) {
        return ServerResponse.accepted().build(matchRepo.deleteById(request.pathVariable("id")));
    }
}
