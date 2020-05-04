package com.mgu.mlnba.security;

import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;

import reactor.core.publisher.Mono;

public class ServerTokenAuthenticationConverter implements ServerAuthenticationConverter {
    private static final Logger logger = LoggerFactory.getLogger(ServerTokenAuthenticationConverter.class);
    
    private final TokenProvider tokenProvider;

    public ServerTokenAuthenticationConverter(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }
    @Override
    public Mono<Authentication> convert(ServerWebExchange serverWebExchange) {
        logger.debug("convert({} - {})", serverWebExchange.getRequest().getMethod(), serverWebExchange.getRequest().getPath());
        return Mono.justOrEmpty(serverWebExchange)
                .map(SecurityUtils::getTokenFromRequest)
                .filter(Objects::nonNull)
                .filter(token -> !StringUtils.isEmpty(token))
                .map(tokenProvider::getAuthentication)
                .onErrorResume(e -> Mono.fromRunnable(() -> serverWebExchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED)))
                ;
    }
    


}
