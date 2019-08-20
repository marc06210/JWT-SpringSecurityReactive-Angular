package com.mgu.mlnba.handler;

import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.mgu.mlnba.model.LoginUser;
import com.mgu.mlnba.model.Member;
import com.mgu.mlnba.model.PasswordUpdate;
import com.mgu.mlnba.repository.MemberRepository;

import reactor.core.Disposable;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

@Component
public class MemberHandler {

//    @Autowired
    private final MemberRepository personRepo;
    
    //@Autowired
    private final PasswordEncoder encoder;
    
    
    public MemberHandler(MemberRepository memberRepo) {
        this.personRepo = memberRepo;
        this.encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
    
    
    public Mono<ServerResponse> me(ServerRequest request) {
        Mono<Member> res = request.principal()
        .ofType(Authentication.class)
        .map(Authentication.class::cast)
        .map(Authentication::getPrincipal)
        .map(Member.class::cast)
        .map(Member::getCopyNoPassword);
        
        //Member m = res.block();

        return ServerResponse.ok().body(res, Member.class);
    }

    public Mono<ServerResponse> listPerson(ServerRequest request) {
        
        //Flux<Person> persons = personRepo.findAll().map(person -> {person.setPassword(null); return person;});
        
        return ServerResponse.ok()/*.contentType(MediaType.TEXT_EVENT_STREAM)*/
            .body(personRepo.findAll().map(LoginUser::new), LoginUser.class);
    }
    
    public Mono<ServerResponse> getPersonById(ServerRequest request) {
        
//        return this.repository.findById(1L)
//                .map(ResponseEntity::ok)
//                .switchIfEmpty(Mono.just(ResponseEntity.notFound().build()));
        
        
        return ServerResponse.ok()
                  .contentType(MediaType.APPLICATION_JSON)
                  .body(personRepo.findById(request.pathVariable("id")).map(LoginUser::new)
                          .switchIfEmpty(Mono.error(new Exception("No user account"))), LoginUser.class);
    }
    
    
    public Mono<ServerResponse> createPerson(ServerRequest request) {
        Mono<Member> person = request.bodyToMono(LoginUser.class).map(p -> {
            Member m = new Member();
            m.setUsername(p.getUsername());
            m.setLastname(p.getLastname());
            m.setFirstname(p.getFirstname());
            m.setPassword(encoder.encode("password"));
            return m;
        });
        return ServerResponse.ok().body(personRepo.insert(person).map(LoginUser::new), LoginUser.class);
    }
    
    public Mono<ServerResponse> updatePassword(ServerRequest request) {
        Mono<Member> result = personRepo.findById(request.pathVariable("id"))
                .zipWith(request.bodyToMono(PasswordUpdate.class))
                .filter(tuple -> encoder.matches(tuple.getT2().getOldPassword(), tuple.getT1().getPassword()))
                .map(p -> {
                        p.getT1().setPassword(encoder.encode(p.getT2().getNewPassword()));
                        return p.getT1();
                });
        return ServerResponse.ok()
                .body(personRepo.saveAll(result)
                        .map(LoginUser::new)
                        .switchIfEmpty(Mono.error(new Exception("Error updating the password"))), 
                        LoginUser.class);
    }
    
    
    public Mono<ServerResponse> updatePersonById(ServerRequest request) {
        
        Mono<Member> newVersionOfMember = request.bodyToMono(Member.class)
        .zipWhen( m -> 
            personRepo.findById(m.getId())
//                    .map(oldMember -> {
//                        m.setPassword(oldMember.getPassword());
//                        return m;
//                    })
//                    .map( newMember -> {
//                        System.err.println(newMember);
//                        return newMember;
//                    })
            )
        .map(tuple -> {
            tuple.getT1().setPassword(tuple.getT2().getPassword());
            return tuple.getT1();
        })
        .map(Member.class::cast);



        return ServerResponse.ok()
                .body(personRepo.saveAll(newVersionOfMember)
                        .map(LoginUser::new)
                        .switchIfEmpty(Mono.error(new Exception("Error updating the member"))), 
                        LoginUser.class);
    }
    
    public Mono<ServerResponse> deletePersonById(ServerRequest request) {
        Mono<Void> response = personRepo.deleteById(request.pathVariable("id"));
        return ServerResponse.accepted().build(response);
    }
}
