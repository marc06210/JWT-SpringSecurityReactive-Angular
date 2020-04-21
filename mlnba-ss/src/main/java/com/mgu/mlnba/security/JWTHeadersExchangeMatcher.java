package com.mgu.mlnba.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatcher;
import org.springframework.web.server.ServerWebExchange;

import reactor.core.publisher.Mono;

public class JWTHeadersExchangeMatcher implements ServerWebExchangeMatcher {
    private final Logger logger = LoggerFactory.getLogger(JWTHeadersExchangeMatcher.class);
    
    @Override
    public Mono<MatchResult> matches(final ServerWebExchange exchange) {
        logger.debug("matches({} - {})", exchange.getRequest().getMethod(), exchange.getRequest().getPath());
        Mono<ServerHttpRequest> request = Mono.just(exchange).map(ServerWebExchange::getRequest);

        /* Check for header "Authorization" */
        return request.map(ServerHttpRequest::getHeaders)
                .filter(h -> h.containsKey(HttpHeaders.AUTHORIZATION))
                .flatMap($ -> { 
                    logger.debug("match");
                    return MatchResult.match();
                    })
                .switchIfEmpty(MatchResult.notMatch());
    }
}
