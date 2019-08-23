package com.mgu.mlnba.security;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;

public class AuthorizationModifierFilter implements WebFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        return chain.filter(exchange).doAfterTerminate(() -> {

            if (exchange.getResponse().getStatusCode().equals(HttpStatus.UNAUTHORIZED)) {
                exchange.getResponse().setStatusCode(HttpStatus.MOVED_PERMANENTLY);
                exchange.getResponse().getHeaders().add("location", "/login");
            }
        });
    }

}
