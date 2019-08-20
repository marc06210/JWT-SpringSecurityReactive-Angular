package com.mgu.mlnba;

import java.net.URI;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.server.DefaultServerRedirectStrategy;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.ServerRedirectStrategy;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.RedirectServerAuthenticationSuccessHandler;
import org.springframework.security.web.server.authentication.ServerAuthenticationFailureHandler;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import org.springframework.security.web.server.authentication.logout.ServerLogoutSuccessHandler;
import org.springframework.security.web.server.csrf.ServerCsrfTokenRepository;
import org.springframework.security.web.server.csrf.WebSessionServerCsrfTokenRepository;
import org.springframework.util.Assert;
import org.springframework.web.server.ServerWebExchange;

import reactor.core.publisher.Mono;

@EnableWebFluxSecurity
public class WebSecurityConfig /*extends WebSecurityConfigurerAdapter*/ {
    /*@Bean
    public MapReactiveUserDetailsService userDetailsService() {
        UserDetails admin = User.withDefaultPasswordEncoder()
                .username("admin")
                .password("password")
                .roles("ADMIN")
                .build();

        return new MapReactiveUserDetailsService(admin);
    }*/
    
    
    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        
        http.logout()
            .logoutUrl("/logout");
//            .logoutHandler(new SecurityContextServerLogoutHandler())
//            .logoutSuccessHandler(new RedirectServerLogoutSuccessHandler());

/*
        ServerAuthenticationSuccessHandler authenticationSuccessHandler = new ServerAuthenticationSuccessHandler() {
            
            @Override
            public Mono<Void> onAuthenticationSuccess(WebFilterExchange webFilterExchange, Authentication authentication) {
                // TODO Auto-generated method stub
                ServerWebExchange exchange = webFilterExchange.getExchange();
                
                exchange.getResponse().setStatusCode(HttpStatus.OK);
                exchange.getResponse().setComplete();
                return webFilterExchange.getChain().filter(exchange);
                
            }
        };*/
        
        RedirectServerAuthenticationSuccessHandler succHandler = new RedirectServerAuthenticationSuccessHandler("/home");
        
        ServerAuthenticationFailureHandler authenticationFailureHandler = new ServerAuthenticationFailureHandler() {
            
            @Override
            public Mono<Void> onAuthenticationFailure(WebFilterExchange webFilterExchange, AuthenticationException exception) {
                ServerWebExchange exchange = webFilterExchange.getExchange();
                
                exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
                exchange.getResponse().setComplete();
                return webFilterExchange.getChain().filter(exchange);
            }
        };
        http
            .authorizeExchange()
                .pathMatchers(HttpMethod.GET, "/api/team").permitAll()
                .pathMatchers("/login", "/logout").permitAll()
                .anyExchange().authenticated()
            .and()
                .httpBasic()
//            .and()
//                .formLogin()
                //.authenticationFailureHandler(authenticationFailureHandler )
//                .authenticationSuccessHandler(succHandler)
            .and()
                .csrf().disable();
//                .csrfTokenRepository(csrfTokenRepository());
        /*
            .and()
                .httpBasic()
                .and()
                .exceptionHandling()
                .accessDeniedHandler(new HttpStatusServerAccessDeniedHandler(HttpStatus.BAD_REQUEST))
               .and()
                .csrf().disable();*/
                
        // TODO: check csrf

        return http.build();
    }
/*
    @Resource(name = "userService")
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Autowired
    public void globalUserDetails(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(encoder());
    }

    @Bean
    public JwtAuthenticationFilter authenticationTokenFilterBean() {
        return new JwtAuthenticationFilter();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().
                authorizeRequests()
                .antMatchers("/token/*", "/signup").permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http
                .addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
    }
*/
    
    private ServerCsrfTokenRepository csrfTokenRepository() {
        WebSessionServerCsrfTokenRepository repository = new WebSessionServerCsrfTokenRepository();
        repository.setHeaderName("XSRF-TOKEN");
        return repository;
    }
    @Bean
    public PasswordEncoder encoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
    
    class RedirectServerLogoutSuccessHandler implements ServerLogoutSuccessHandler {
        public static final String DEFAULT_LOGOUT_SUCCESS_URL = "/";

        private URI logoutSuccessUrl = URI.create(DEFAULT_LOGOUT_SUCCESS_URL);

        private ServerRedirectStrategy redirectStrategy = new DefaultServerRedirectStrategy();

        @Override
        public Mono<Void> onLogoutSuccess(WebFilterExchange exchange, Authentication authentication) {
            return this.redirectStrategy
                .sendRedirect(exchange.getExchange(), this.logoutSuccessUrl);
        }

        /**
         * The URL to redirect to after successfully logging out.
         * @param logoutSuccessUrl the url to redirect to. Default is "/login?logout".
         */
        public void setLogoutSuccessUrl(URI logoutSuccessUrl) {
            Assert.notNull(logoutSuccessUrl, "logoutSuccessUrl cannot be null");
            this.logoutSuccessUrl = logoutSuccessUrl;
        }
    }

}