package com.mgu.mlnba.handler;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.mgu.mlnba.model.TeamGroup;
import com.mgu.mlnba.repository.TeamGroupRepository;

import reactor.core.publisher.Mono;

@Component
public class TeamHandler {

    // @Autowired
    // private final TeamRepository teamRepo;
    private final TeamGroupRepository teamGroupRepo;

    // @Autowired
    // private final PasswordEncoder encoder;

    public TeamHandler(/*TeamRepository teamRepo,*/ TeamGroupRepository teamGroupRepo) {
        // this.teamRepo = teamRepo;
        this.teamGroupRepo = teamGroupRepo;
        // this.encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // public Mono<ServerResponse> list(ServerRequest request) {
    //
    // //Flux<Person> persons = personRepo.findAll().map(person -> {person.setPassword(null); return person;});
    // return ServerResponse.ok()/*.contentType(MediaType.TEXT_EVENT_STREAM)*/
    // .body(teamRepo.findAll(new Sort(Sort.Direction.DESC, "id")), Team.class);
    // }

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

    public Mono<ServerResponse> createTeamCategory(ServerRequest request) {
        /*
         *  ask question to stackoverflow
        Mono<TeamGroup> tg = request.bodyToMono(TeamGroup.class);
        
        Mono<TeamGroup> tgWithMongoTeams = tg.map(cat -> {
            return Flux.fromIterable(cat.getTeams())
                .flatMap(t -> teamRepo.save(t))
                .collectList()
                .map(l -> {
                    cat.setTeams(l);
                    return (TeamGroup)cat;
                });
            })
            .map(TeamGroup.class::cast)
            ;
        
        return ServerResponse.ok().body(teamGroupRepo.insert(tgWithMongoTeams), TeamGroup.class);
        */
        return ServerResponse.ok().body(teamGroupRepo.insert(request.bodyToMono(TeamGroup.class)).next(), TeamGroup.class);
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
