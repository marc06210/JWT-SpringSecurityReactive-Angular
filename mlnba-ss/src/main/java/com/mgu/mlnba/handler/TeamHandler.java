package com.mgu.mlnba.handler;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.mgu.mlnba.model.Team;
import com.mgu.mlnba.model.Training;
import com.mgu.mlnba.repository.TeamRepository;

import reactor.core.publisher.Mono;

@Component
public class TeamHandler {

//    @Autowired
    private final TeamRepository teamRepo;
    
    //@Autowired
    //private final PasswordEncoder encoder;
    
    public TeamHandler(TeamRepository teamRepo) {
        this.teamRepo = teamRepo;
        //this.encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    public Mono<ServerResponse> list(ServerRequest request) {
        
        //Flux<Person> persons = personRepo.findAll().map(person -> {person.setPassword(null); return person;});
        
        return ServerResponse.ok()/*.contentType(MediaType.TEXT_EVENT_STREAM)*/
            .body(teamRepo.findAll(), Team.class);
    }
    
    public Mono<ServerResponse> getById(ServerRequest request) {
        return ServerResponse.ok()
                  .contentType(MediaType.APPLICATION_JSON)
                  .body(teamRepo.findById(request.pathVariable("id"))
                          .switchIfEmpty(Mono.error(new Exception("No user account"))), Team.class);
    }
    
    
    public Mono<ServerResponse> createTeam(ServerRequest request) {
        Mono<Team> team = request.bodyToMono(Team.class);
        
        return ServerResponse.ok().body(teamRepo.insert(team), Team.class);
    }
    
    public Mono<ServerResponse> updateTeamById(ServerRequest request) {
        Mono<Team> team = request.bodyToMono(Team.class);
        return ServerResponse.ok().body(teamRepo.saveAll(team), Team.class);
    }
    
    public Mono<ServerResponse> deleteById(ServerRequest request) {
        Mono<Void> response = teamRepo.deleteById(request.pathVariable("id"));
        return ServerResponse.accepted().build(response);
    }
    
    public Mono<ServerResponse> setTrainings(ServerRequest request) {
        Mono<Team> result = teamRepo.findById(request.pathVariable("id"))
                .zipWith(request.bodyToMono(Training.class))
                .map(p -> {
                        p.getT1().getTrainings().add(p.getT2());
                        return p.getT1();
                });
        return ServerResponse.ok()
                .body(teamRepo.saveAll(result)
                        .switchIfEmpty(Mono.error(new Exception("Error updating the team"))), 
                        Team.class);
    }
}
