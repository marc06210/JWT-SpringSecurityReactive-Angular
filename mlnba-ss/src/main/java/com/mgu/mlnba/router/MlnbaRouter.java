package com.mgu.mlnba.router;

import static org.springframework.web.reactive.function.server.RequestPredicates.DELETE;
import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
import static org.springframework.web.reactive.function.server.RequestPredicates.PUT;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.mgu.mlnba.handler.GreetingHandler;
import com.mgu.mlnba.handler.MemberHandler;
import com.mgu.mlnba.handler.TeamHandler;
import com.mgu.mlnba.handler.UtilsHandler;

@Configuration
public class MlnbaRouter {
    
    @Autowired
    private TeamHandler teamHandler;
    
    @Autowired
    private MemberHandler personHandler;
    
    @Autowired
    private UtilsHandler utilsHandler;

    @Bean
    public RouterFunction<ServerResponse> routes(GreetingHandler greetingHandler) {
        return RouterFunctions.nest(RequestPredicates.path("/api"), routeMembers())
                .andNest(RequestPredicates.path("/api"), routeHello(greetingHandler))
                .andNest(RequestPredicates.path("/api"), routeTeams())
                .andNest(RequestPredicates.path("/api"), routeUtils());
    }
    
//    @Bean
    public RouterFunction<ServerResponse> routeHello(GreetingHandler greetingHandler) {
        return RouterFunctions
            .route(GET("/hello")
                    .and(RequestPredicates.accept(MediaType.TEXT_PLAIN)), greetingHandler::hello);
    }
    
//    @Bean
    public RouterFunction<ServerResponse> routeMembers() {
        return RouterFunctions
            .route(GET("/me"), personHandler::me)
            .andRoute(GET("/member")
                .and(RequestPredicates.accept(MediaType.TEXT_EVENT_STREAM)), personHandler::listPerson)
            .andRoute(GET("/member/{id}"), personHandler::getPersonById)
            .andRoute(DELETE("/member/{id}"), personHandler::deletePersonById)
            .andRoute(PUT("/member"), personHandler::updatePersonById)
            .andRoute(POST("/member").and(RequestPredicates.accept(MediaType.APPLICATION_JSON)), personHandler::createPerson)
            .andRoute(PUT("/member/{id}/pwd").and(RequestPredicates.accept(MediaType.APPLICATION_JSON)), personHandler::updatePassword);
    }
    
//    @Bean
    public RouterFunction<ServerResponse> routeTeams() {
        return RouterFunctions
            .route(GET("/team")
                    .and(RequestPredicates.accept(MediaType.TEXT_EVENT_STREAM)), teamHandler::list)
            .andRoute(GET("/team/{id}"), teamHandler::getById)
            .andRoute(DELETE("/team/{id}"), teamHandler::deleteById)
            .andRoute(PUT("/team/{id}"), teamHandler::updateTeamById)
            .andRoute(POST("/team").and(RequestPredicates.accept(MediaType.APPLICATION_JSON)), teamHandler::createTeam);
    }
    
//    @Bean
    public RouterFunction<ServerResponse> routeUtils() {
        return RouterFunctions
            .route(GET("/role"), utilsHandler::listRoles);
    }
}
