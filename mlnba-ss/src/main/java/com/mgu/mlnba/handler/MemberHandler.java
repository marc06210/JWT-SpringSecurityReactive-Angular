package com.mgu.mlnba.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.server.ResponseStatusException;

import com.mgu.mlnba.model.LoginUser;
import com.mgu.mlnba.model.Member;
import com.mgu.mlnba.model.PasswordUpdate;
import com.mgu.mlnba.repository.MemberRepository;
import com.mgu.mlnba.security.AuthRequest;
import com.mgu.mlnba.security.JWTReactiveAuthenticationManager;
import com.mgu.mlnba.security.JWTToken;
import com.mgu.mlnba.security.TokenProvider;

import reactor.core.publisher.Mono;


@Component
public class MemberHandler {

    private final MemberRepository personRepo;
    private final PasswordEncoder encoder;
    private final TokenProvider jwtUtils;

  private JWTReactiveAuthenticationManager authenticationManager;    
    
    public MemberHandler(MemberRepository memberRepo, TokenProvider jwtUtils, JWTReactiveAuthenticationManager authenticationManager) {
        this.personRepo = memberRepo;
        this.encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        
    }

    public Mono<ServerResponse> login(ServerRequest request) {
        // @formatter:off
        Mono<JWTToken> token = request.bodyToMono(AuthRequest.class)
                .map(ar -> new UsernamePasswordAuthenticationToken(ar.getUsername(), ar.getPassword()))
                .flatMap(this.authenticationManager::authenticate)
                .map(jwtUtils::createToken)
                .map(JWTToken::new);

        return ServerResponse.ok()
                .body(token.onErrorMap(e -> new ResponseStatusException( HttpStatus.UNAUTHORIZED, "Credentials error")), JWTToken.class);
        // @formatter:on
    }
    
    
    public Mono<ServerResponse> me(ServerRequest request) {
        Mono<User> res = request.principal()
        .ofType(Authentication.class)
        .map(Authentication.class::cast)
        .map(Authentication::getPrincipal)
        .map(User.class::cast)
        ;
//        Object a = res.block();
        //subscribe(System.out::println);
//        .map(Member.class::cast)
//        .map(Member::getCopyNoPassword);
        return ServerResponse.ok().body(res, User.class);
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
