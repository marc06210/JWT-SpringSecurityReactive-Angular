package com.mgu.mlnba.handler;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.mgu.mlnba.model.News;
import com.mgu.mlnba.repository.NewsRepository;

import reactor.core.publisher.Mono;

@Component
public class NewsHandler {

    private final NewsRepository newsRepo;

    public NewsHandler(NewsRepository newsRepo) {
        this.newsRepo = newsRepo;
    }

     public Mono<ServerResponse> listAll(ServerRequest request) {
         return ServerResponse.ok()/*.contentType(MediaType.TEXT_EVENT_STREAM)*/
                 .body(newsRepo.findAll(), 
                         News.class);
     }

/*
    public Mono<ServerResponse> updateTeamCategoryById(ServerRequest request) {
        Mono<TeamGroup> a = request.bodyToMono(TeamGroup.class)
            .map(c -> {
                Mono<TeamGroup> c1 = Mono.just(c);
                Flux<Team> teams  = Flux.fromIterable(c.getTeams());
                
                Mono<TeamGroup> re = Mono.zip(c1, teams.flatMap(x -> {
                    if(x.getId()==null) {
                        String teamName = c.getName() + c.getGender() + x.getName();
                        x.setName(teamName);
                        return teamRepo.insert(x);
                    } else
                        return teamRepo.save(x);
                    })
                .collectList(), (tg, ts) -> {
                    tg.setTeams(ts);
                    return tg;}).map(t -> t);
              return re;
            })
            .flatMap(t -> t)
            .map(t -> teamGroupRepo.save(t))
            .flatMap(t -> t);
        return ServerResponse.ok().body(a, TeamGroup.class);
    }
*/
    public Mono<ServerResponse> create(ServerRequest request) {
        return ServerResponse.ok().body(request.bodyToMono(News.class)
                .flatMap(newsRepo::insert)
                , News.class)
        .onErrorResume(e -> Mono.error(new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR)));
    }
}
