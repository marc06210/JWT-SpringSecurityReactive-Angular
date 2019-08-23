package com.mgu.mlnba;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import org.springframework.security.web.server.context.WebSessionServerSecurityContextRepository;

import com.mgu.mlnba.security.AuthorizationModifierFilter;
import com.mgu.mlnba.security.JWTHeadersExchangeMatcher;
import com.mgu.mlnba.security.JWTReactiveAuthenticationManager;
import com.mgu.mlnba.security.ServerTokenAuthenticationConverter;
import com.mgu.mlnba.security.TokenProvider;

@EnableReactiveMethodSecurity
@EnableWebFluxSecurity
public class WebSecurityConfig  {
    
    @Autowired
    TokenProvider tokenProvider;
    
    @Autowired
    ReactiveUserDetailsService reactiveUserDetailsService;
    
    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        /*
        return http
                .authorizeExchange()
                .pathMatchers(HttpMethod.OPTIONS)
                .permitAll()
            
//        .csrf()
//            .disable()
//            .headers()
//            .frameOptions().disable()
//            .cache().disable()
        .and()
            .authorizeExchange()
            .pathMatchers(HttpMethod.GET, "/api/team").permitAll()
            .pathMatchers("/process_login", "/login", "/logout").permitAll()
        .and()
            .addFilterAt(webFilter(), SecurityWebFiltersOrder.AUTHENTICATION)
            //.addFilterAt(new AuthorizationModifierFilter(),SecurityWebFiltersOrder.AUTHENTICATION)
            .httpBasic().disable()
            .formLogin().disable()
            .logout().disable()
            .csrf().disable()
            .build();
        
        */
        http
            .authorizeExchange()
                .pathMatchers(HttpMethod.OPTIONS)
                .permitAll()
            .and()
                .addFilterAt(webFilter(), SecurityWebFiltersOrder.AUTHORIZATION)
                .addFilterAt(new AuthorizationModifierFilter(),SecurityWebFiltersOrder.AUTHENTICATION)
                .authorizeExchange()
                .pathMatchers(HttpMethod.GET, "/api/team").permitAll()
                .pathMatchers("/process_login", "/login", "/logout").permitAll()
                .anyExchange().authenticated();
        
        http.httpBasic().disable()
            .formLogin().disable()
            .csrf().disable()
            .logout().disable();

        return http.build();
        
    }
    /*
    private ServerCsrfTokenRepository csrfTokenRepository() {
        WebSessionServerCsrfTokenRepository repository = new WebSessionServerCsrfTokenRepository();
        repository.setHeaderName("XSRF-TOKEN");
        return repository;
    }
    */
    @Bean
    public PasswordEncoder encoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
    
    @Bean
    public AuthenticationWebFilter webFilter() {
        AuthenticationWebFilter authenticationWebFilter = new AuthenticationWebFilter(repositoryReactiveAuthenticationManager());
        authenticationWebFilter.setServerAuthenticationConverter(new ServerTokenAuthenticationConverter(tokenProvider));
        authenticationWebFilter.setRequiresAuthenticationMatcher(new JWTHeadersExchangeMatcher());
        authenticationWebFilter.setSecurityContextRepository(new WebSessionServerSecurityContextRepository());
        return authenticationWebFilter;
    }
    
    
    @Bean
    public JWTReactiveAuthenticationManager repositoryReactiveAuthenticationManager() {
        JWTReactiveAuthenticationManager repositoryReactiveAuthenticationManager = new JWTReactiveAuthenticationManager(reactiveUserDetailsService, encoder());
        return repositoryReactiveAuthenticationManager;
    }

}