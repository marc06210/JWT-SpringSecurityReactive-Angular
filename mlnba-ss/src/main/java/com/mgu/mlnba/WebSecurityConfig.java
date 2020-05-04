package com.mgu.mlnba;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import org.springframework.security.web.server.authentication.ServerAuthenticationFailureHandler;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;
import org.springframework.security.web.server.context.WebSessionServerSecurityContextRepository;
import org.springframework.security.web.server.util.matcher.NegatedServerWebExchangeMatcher;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers;

import com.mgu.mlnba.security.AuthorizationModifierFilter;
import com.mgu.mlnba.security.JWTReactiveAuthenticationManager;
import com.mgu.mlnba.security.ServerTokenAuthenticationConverter;
import com.mgu.mlnba.security.TokenProvider;

import reactor.core.publisher.Mono;

@EnableReactiveMethodSecurity
@EnableWebFluxSecurity
public class WebSecurityConfig {
    
    private final Logger LOGGER = LoggerFactory.getLogger(WebSecurityConfig.class);
    
    @Autowired
    TokenProvider tokenProvider;
    
    @Autowired
    ReactiveUserDetailsService reactiveUserDetailsService;
    private static String[] permittedUrl = new String[]{ "/", "/api/login", "/logout", "/api/team", "/api/match" };
    
    // TODO: logout sur stateless, TokenRepository ?
    
    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {

        
        http
            .authorizeExchange()
                .pathMatchers(HttpMethod.POST, "/api/login").permitAll()
                .pathMatchers(HttpMethod.DELETE).authenticated()
                .pathMatchers(HttpMethod.POST).authenticated()
                .pathMatchers(HttpMethod.PUT).authenticated()
                .pathMatchers(permittedUrl).permitAll()
                .anyExchange().authenticated()
            .and()
                .addFilterAt(webFilter(), SecurityWebFiltersOrder.AUTHORIZATION)
                .addFilterAt(new AuthorizationModifierFilter(),SecurityWebFiltersOrder.AUTHENTICATION) // this to avoid the popup
                .securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
            ;
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

    public AuthenticationWebFilter webFilter() {
        AuthenticationWebFilter authenticationWebFilter = new AuthenticationWebFilter(repositoryReactiveAuthenticationManager());
        authenticationWebFilter.setServerAuthenticationConverter(new ServerTokenAuthenticationConverter(tokenProvider));
        NegatedServerWebExchangeMatcher negateWhiteList = new NegatedServerWebExchangeMatcher(ServerWebExchangeMatchers.pathMatchers(permittedUrl));
//        OrServerWebExchangeMatcher orMatcher = new OrServerWebExchangeMatcher(Arrays.asList(negateWhiteList, new JWTHeadersExchangeMatcher()));
        authenticationWebFilter.setRequiresAuthenticationMatcher(negateWhiteList);
        authenticationWebFilter.setAuthenticationFailureHandler(authenticationFailureHandler());
        authenticationWebFilter.setSecurityContextRepository(new WebSessionServerSecurityContextRepository());
        return authenticationWebFilter;
    }
    
    public ServerAuthenticationFailureHandler authenticationFailureHandler() {
        ServerAuthenticationFailureHandler failureHandler = new ServerAuthenticationFailureHandler() {
            
            @Override
            public Mono<Void> onAuthenticationFailure(WebFilterExchange exchange, AuthenticationException exception) {
                LOGGER.debug("onAuthenticationFailure(): {}", exception.getMessage()); 
                return Mono.fromRunnable(() -> {
                    exchange.getExchange().getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
              });
            }
        };
        return failureHandler;
    }
    @Bean
    public JWTReactiveAuthenticationManager repositoryReactiveAuthenticationManager() {
        JWTReactiveAuthenticationManager repositoryReactiveAuthenticationManager = new JWTReactiveAuthenticationManager(reactiveUserDetailsService, encoder());
        return repositoryReactiveAuthenticationManager;
    }

}