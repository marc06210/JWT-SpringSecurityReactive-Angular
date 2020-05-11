package com.mgu.mlnba.handler;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.mgu.mlnba.model.Team;
import com.mgu.mlnba.model.TeamGroup;
import com.mgu.mlnba.repository.TeamGroupRepository;
import com.mgu.mlnba.repository.TeamRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class TeamHandler {

    // @Autowired
    private final TeamRepository teamRepo;
    private final TeamGroupRepository teamGroupRepo;

    // @Autowired
    // private final PasswordEncoder encoder;

    public TeamHandler(TeamRepository teamRepo, TeamGroupRepository teamGroupRepo) {
        this.teamRepo = teamRepo;
        this.teamGroupRepo = teamGroupRepo;
        // this.encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

     public Mono<ServerResponse> listTeams(ServerRequest request) {
    
     //Flux<Person> persons = personRepo.findAll().map(person -> {person.setPassword(null); return person;});
     return ServerResponse.ok()/*.contentType(MediaType.TEXT_EVENT_STREAM)*/
             .body(teamRepo.findAll(), Team.class);
     }

    public Mono<ServerResponse> listTeamCategories(ServerRequest request) {
        // Flux<Person> persons = personRepo.findAll().map(person -> {person.setPassword(null); return person;});
        return ServerResponse.ok()/*.contentType(MediaType.TEXT_EVENT_STREAM)*/
                .body(teamGroupRepo.findAll(), TeamGroup.class);
    }

    public Mono<ServerResponse> getTeamCategoryById(ServerRequest request) {
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(teamGroupRepo.findById(request.pathVariable("id")).switchIfEmpty(Mono.error(new Exception("No category found"))), TeamGroup.class);
    }

    public Mono<ServerResponse> updateTeamCategoryById(ServerRequest request) {
        Mono<TeamGroup> team = request.bodyToMono(TeamGroup.class);
        return ServerResponse.ok().body(teamGroupRepo.saveAll(team), TeamGroup.class);
    }

    
//    Mono<Match> match = request.bodyToMono(Match.class)
//            .flatMap(m -> {
//                Mono<Match> a = teamRepo.findById(m.getLocalTeam().getId()).map(
//                        t -> {
//                            m.setLocalTeam(t);
//                            return m;
//                        });
//                
//                return a;
//            })
//            ;
//    return ServerResponse
//            .ok()
//            .body(matchRepo.insert(match).next(), Match.class);
    public Mono<ServerResponse> createTeamCategory(ServerRequest request) {
        /*
         Mono<Object> zz = request.bodyToMono(TeamGroup.class).map( cat -> {
            
            return teamRepo.insert(cat.getTeams())
                .collectList()
                .map(teams -> { 
                    cat.setTeams(teams); 
                    return cat;
                })
                .subscribe();
         });
         return ServerResponse.ok().body(zz, Object.class);
        */
        Mono<Object> z = request.bodyToMono(TeamGroup.class).map( cat -> {
                    return Flux.fromIterable(cat.getTeams())
                            .flatMap(teamRepo::insert)
                            .collectList()
                            .map(l -> {
                                cat.setTeams(l);
                                return teamGroupRepo.insert(cat).subscribe();
                            })
                            .subscribe()
                            ;
                });
        return ServerResponse.ok().body(z.map(t -> "ok"), String.class);
    }

    public Mono<ServerResponse> deleteCategoryById(ServerRequest request) {
        Mono<Void> response = teamGroupRepo.deleteById(request.pathVariable("id"));
        return ServerResponse.accepted().build(response);
    }

    // public Mono<ServerResponse> createTeam(ServerRequest request) {
    // Mono<Team> team = request.bodyToMono(Team.class);
    //
    // return ServerResponse.ok().body(teamRepo.insert(team).next(), Team.class);
    // }
    //
    // public Mono<ServerResponse> updateTeamById(ServerRequest request) {
    // Mono<Team> team = request.bodyToMono(Team.class);
    // return ServerResponse.ok().body(teamRepo.saveAll(team), Team.class);
    // }
    //
    // public Mono<ServerResponse> deleteById(ServerRequest request) {
    // Mono<Void> response = teamRepo.deleteById(request.pathVariable("id"));
    // return ServerResponse.accepted().build(response);
    // }
    //
    // public Mono<ServerResponse> setTrainings(ServerRequest request) {
    // Mono<Team> result = teamRepo.findById(request.pathVariable("id"))
    // .zipWith(request.bodyToMono(Training.class))
    // .map(p -> {
    // p.getT1().getTrainings().add(p.getT2());
    // return p.getT1();
    // });
    // return ServerResponse.ok()
    // .body(teamRepo.saveAll(result)
    // .switchIfEmpty(Mono.error(new Exception("Error updating the team"))),
    // Team.class);
    // }
}
