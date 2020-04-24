package com.mgu.mlnba.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;

public class AuthorizationModifierFilter implements WebFilter {
    private final Logger LOGGER = LoggerFactory.getLogger(AuthorizationModifierFilter.class);
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        return chain.filter(exchange).doAfterTerminate(() -> {
            if (exchange.getResponse().getStatusCode().equals(HttpStatus.UNAUTHORIZED)
                    && exchange.getResponse().getHeaders().containsKey("www-authenticate")) {
                try {
                    exchange.getResponse().getHeaders().remove("www-authenticate");
                } catch(UnsupportedOperationException uoe) {
                    LOGGER.error("Error removing 'www-authenticate' header", uoe);
                }
            }
        });
    }

}
