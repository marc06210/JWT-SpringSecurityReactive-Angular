package com.mgu.mlnba;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import com.mgu.mlnba.model.Event;
import com.mgu.mlnba.model.Member;
import com.mgu.mlnba.model.Role;
import com.mgu.mlnba.repository.EventRepository;
import com.mgu.mlnba.repository.MemberRepository;
import com.mgu.mlnba.repository.RoleRepository;
import com.mgu.mlnba.repository.TeamGroupRepository;

import reactor.core.publisher.Flux;

@SpringBootApplication
public class MlnbaApplication {

    @Autowired
    MemberRepository memberRepo;

    @Autowired
    RoleRepository roleRepo;
    @Autowired
    TeamGroupRepository teamGroupRepo;
    @Autowired
    EventRepository eventRepo;

    public static void main(String[] args) {
        SpringApplication.run(MlnbaApplication.class, args);
    }

    // @Bean
    CorsWebFilter corsFilter2() {
        return new CorsWebFilter(exchange -> new CorsConfiguration().applyPermitDefaultValues());
    }

    // @Bean
    CorsWebFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:4200");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/team", config);
        source.registerCorsConfiguration("/api/member", config);

        return new CorsWebFilter(source);
    }

    //@EventListener(ApplicationReadyEvent.class)
    public void list() {
        System.out.println(">>> list()");
        teamGroupRepo.findAll().subscribe(t -> System.out.println("team: " + t.getId()));

        roleRepo.findAll().subscribe(t -> System.out.println("role: " + t.getAuthority()));

        memberRepo.findAll().subscribe(t -> System.out.println("user: " + t.getUsername() + '-' + t.getPassword()));
        System.out.println(">>>" + PasswordEncoderFactories.createDelegatingPasswordEncoder().encode("password"));
    }
    
    @EventListener(ApplicationReadyEvent.class)
    public void createUser() {
        
        roleRepo.deleteAll().block();
        String[] roles = { "cto", "coach", "player_female", "player_male", "otm", "referee" };
        Flux.fromArray(roles).map(r -> new Role("role_" + r)).flatMap(roleRepo::save).then().block();
        
        System.out.println("createUser");
        memberRepo.deleteAll().block();
        
        Member m = new Member();
        m.setUsername("marc");
        m.setLastname("guerrini");
        m.setFirstname("marc");
        m.setPassword(PasswordEncoderFactories.createDelegatingPasswordEncoder().encode("password"));

        roleRepo.findById("role_cto").subscribe(r -> {
            System.out.println(">>> creating user");
            m.setRoles(Arrays.asList(r));
            memberRepo.save(m).subscribe(r2 -> {
                    System.out.println("done");
                    }
            );
        });
    }

    // @EventListener(ApplicationReadyEvent.class)
    public void createMarc() {

        // Team t = new Team();
        // t.setId("5eb12d86503fee17c9f2ed5a");
        //
        // TeamGroup tg = new TeamGroup();
        // tg.setGender(Gender.FEMALE);
        // tg.setName("U11");
        // tg.setDescription("Filles nées en 2009 et 2010");
        // tg.getTeams().add(t);
        // teamGroupRepo.save(tg).subscribe();
        //
        // Member m2 = memberRepo.findByUsername("marc").block();
        // if(m2==null) {
        // memberRepo.deleteAll().block();
        // roleRepo.deleteAll().block();

        createRoles();

        Member m = new Member();
        m.setUsername("marc");
        m.setLastname("guerrini");
        m.setFirstname("marc");
        m.setPassword(PasswordEncoderFactories.createDelegatingPasswordEncoder().encode("password"));

        roleRepo.findById("role_cto").subscribe(r -> {
            m.setRoles(Arrays.asList(r));
            memberRepo.save(m).block();
        });
        // }
        // System.out.println("Application Ready Event is successfully Started");
        // memberRepo.findAll().subscribe(System.out::println);
    }

    public void createRoles() {
        // Flux.f
        roleRepo.deleteAll().block();
        String[] roles = { "cto", "coach", "player_female", "player_male", "otm", "referee" };
        Flux.fromArray(roles).map(r -> new Role("role_" + r)).flatMap(roleRepo::save).then().block();
    }

    // @EventListener(ApplicationReadyEvent.class)
    public void createMatch() {
        eventRepo.deleteAll().block();

        Flux.range(0, 10).map(i -> {
            Event e = new Event();
            e.setTitle("Match " + i);
            e.setDescription("match " + i);
            e.setOpponent("opponent " + i);
            return e;
        }).flatMap(eventRepo::save).subscribe();
    }
    

}
