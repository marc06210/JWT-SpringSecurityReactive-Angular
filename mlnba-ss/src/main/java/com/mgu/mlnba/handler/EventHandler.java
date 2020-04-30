package com.mgu.mlnba.handler;

import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.mgu.mlnba.model.Event;
import com.mgu.mlnba.repository.EventRepository;

import reactor.core.publisher.Mono;

@Component
public class EventHandler {

//    @Autowired
    private final EventRepository eventRepo;
    
    //@Autowired
    //private final PasswordEncoder encoder;
    
    public EventHandler(EventRepository eventRepo) {
        this.eventRepo = eventRepo;
        //this.encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    public Mono<ServerResponse> list(ServerRequest request) {
        
        //Flux<Person> persons = personRepo.findAll().map(person -> {person.setPassword(null); return person;});
        
        return ServerResponse.ok()/*.contentType(MediaType.TEXT_EVENT_STREAM)*/
            .body(eventRepo.findAll(Sort.by("title")), Event.class);
    }
    
    public Mono<ServerResponse> getById(ServerRequest request) {
        return ServerResponse.ok()
                  .contentType(MediaType.APPLICATION_JSON)
                  .body(eventRepo.findById(request.pathVariable("id"))
                          .switchIfEmpty(Mono.error(new Exception("No event found"))), Event.class);
    }
    
//    
//    public Mono<ServerResponse> createTeam(ServerRequest request) {
//        Mono<Team> team = request.bodyToMono(Team.class);
//        
//        return ServerResponse.ok().body(eventRepo.insert(team), Team.class);
//    }
//    
//    public Mono<ServerResponse> updateTeamById(ServerRequest request) {
//        Mono<Team> team = request.bodyToMono(Team.class);
//        return ServerResponse.ok().body(eventRepo.saveAll(team), Team.class);
//    }
//    
//    public Mono<ServerResponse> deleteById(ServerRequest request) {
//        Mono<Void> response = eventRepo.deleteById(request.pathVariable("id"));
//        return ServerResponse.accepted().build(response);
//    }
}
