package com.mgu.mlnba;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.mgu.mlnba.model.Member;
import com.mgu.mlnba.model.Role;
import com.mgu.mlnba.repository.MemberRepository;
import com.mgu.mlnba.repository.RoleRepository;

import reactor.core.publisher.Flux;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@SpringBootApplication
public class MlnbaApplication {

    public static void main(String[] args) {
        SpringApplication.run(MlnbaApplication.class, args);
//        GreetingWebClient gwc = new GreetingWebClient();
//        System.out.println(gwc.getResult());
    }
    
//    @Bean
    public CommandLineRunner loadData(MemberRepository repository, RoleRepository roleRepo, PasswordEncoder encoder) {
        return args -> {
            repository.deleteAll().subscribe();
            
            Member p = new Member();
            p.setUsername("marc");
            p.setLastname("marc-lastname");
            p.setFirstname("marc-firstname");
            p.setPassword(encoder.encode("password"));
            Role role = new Role("joueur");
            
            roleRepo.save(role).subscribe();
            p.setRoles(Arrays.asList(role));
            // save a couple of customers
            repository.saveAll(Flux.just(p)).subscribe();
            
            // fetch all members
//            repository.findByUsername("marc").log().subscribe(System.out::println);
        };
    }
    
//    @Bean
    public CommandLineRunner loadRoles(RoleRepository roleRepo) {
        return args -> {
            List<String> roles = Arrays.asList("webmaster", "joueur", "otm", "arbitre", "dirigeant", "president", "secretaire", "tresorier");
            roleRepo.deleteAll().subscribe();
            roleRepo.saveAll(Flux.fromStream(roles.stream().map(Role::new))).subscribe();
            
            roleRepo.count().subscribe( nb -> System.out.println("Number of roles: " + nb));
        };
    }
    
//    @Bean
//    CorsWebFilter corsFilter() {
//        
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowCredentials(true);
//        config.addAllowedOrigin("http://localhost:4200/home");
//        config.addAllowedHeader("*");
//        config.addAllowedHeader("Access-Control-Allow-Origin");
//        config.addAllowedMethod("OPTIONS");
//        config.addAllowedMethod("GET");
//        config.addAllowedMethod("POST");
//        config.addAllowedMethod("PUT");
//        config.addAllowedMethod("DELETE");
//        source.registerCorsConfiguration("/person", config);
//        return new CorsWebFilter(source);
//
//    }
}
