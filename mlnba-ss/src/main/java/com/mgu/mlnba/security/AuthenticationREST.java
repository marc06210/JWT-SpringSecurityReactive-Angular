package com.mgu.mlnba.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Mono;

@RestController
public class AuthenticationREST {
    private final Logger logger = LoggerFactory.getLogger(JWTReactiveAuthenticationManager.class);
    
    @Autowired
    private TokenProvider jwtUtils;
    
    @Autowired
    private JWTReactiveAuthenticationManager authenticationManager;
    
    
    @RequestMapping(value = "/process_login", method = RequestMethod.POST)
    public Mono<JWTToken> auth(final @RequestBody AuthRequest ar) {
        logger.debug("auth(AuthRequest)");
        Authentication authenticationToken =
                new UsernamePasswordAuthenticationToken(ar.getUsername(), ar.getPassword());

        Mono<Authentication> authentication = this.authenticationManager.authenticate(authenticationToken);
        authentication.doOnError(throwable -> {
            throw new BadCredentialsException("Bad crendentials");
        });
        ReactiveSecurityContextHolder.withAuthentication(authenticationToken);

        return authentication.map(auth -> {
            String jwt = jwtUtils.createToken(auth);
            return new JWTToken(jwt);
        });
        //return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        /*
        return userRepository.findByUsername(ar.getUsername()).map((userDetails) -> {
            if (passwordEncoder.encode(ar.getPassword()).equals(userDetails.getPassword())) {
                return ResponseEntity.ok(new AuthResponse(jwtUtil.generateToken(userDetails)));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }).defaultIfEmpty(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());*/
    }
}
