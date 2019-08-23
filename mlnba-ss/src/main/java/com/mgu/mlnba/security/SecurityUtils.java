package com.mgu.mlnba.security;

import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;

import reactor.core.publisher.Mono;

public class SecurityUtils {
    private static final Logger logger = LoggerFactory.getLogger(SecurityUtils.class);
    
    private SecurityUtils() {
    }

    public static String getTokenFromRequest(ServerWebExchange serverWebExchange) {
        logger.debug("getTokenFromRequest(ServerWebExchange)");
        String token = serverWebExchange.getRequest()
                .getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION);
        return StringUtils.isEmpty(token) ? Strings.EMPTY : token;
    }

    public static Mono<String> getUserFromRequest(ServerWebExchange serverWebExchange) {
        return serverWebExchange.getPrincipal()
                .cast(UsernamePasswordAuthenticationToken.class)
                .map(UsernamePasswordAuthenticationToken::getPrincipal)
                .cast(User.class)
                .map(User::getUsername);
    }
}
