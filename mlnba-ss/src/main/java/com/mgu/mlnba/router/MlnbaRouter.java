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

import com.mgu.mlnba.handler.EventHandler;
import com.mgu.mlnba.handler.GreetingHandler;
import com.mgu.mlnba.handler.MatchHandler;
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
    
    @Autowired
    private EventHandler eventHandler;

    @Autowired
    private MatchHandler matchHandler;
    
    @Bean
    public RouterFunction<ServerResponse> routes(GreetingHandler greetingHandler) {
        return RouterFunctions.nest(RequestPredicates.path("/api"), routeMembers())
                .andNest(RequestPredicates.path("/api"), routeHello(greetingHandler))
                .andNest(RequestPredicates.path("/api"), routeTeams())
                .andNest(RequestPredicates.path("/api"), routeUtils())
                .andNest(RequestPredicates.path("/api"), routeMatches())
                ;
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
            .andRoute(POST("/login").and(RequestPredicates.accept(MediaType.APPLICATION_JSON)), personHandler::login)
            .andRoute(GET("/member")
                .and(RequestPredicates.accept(MediaType.TEXT_EVENT_STREAM)), personHandler::listPerson)
            .andRoute(GET("/member/{id}"), personHandler::getPersonById)
            .andRoute(DELETE("/member/{id}"), personHandler::deletePersonById)
            .andRoute(PUT("/member/{id}"), personHandler::updatePersonById)
            .andRoute(POST("/member").and(RequestPredicates.accept(MediaType.APPLICATION_JSON)), personHandler::createPerson)
            .andRoute(PUT("/member/{id}/pwd").and(RequestPredicates.accept(MediaType.APPLICATION_JSON)), personHandler::updatePassword);
    }
    
//    @Bean
    public RouterFunction<ServerResponse> routeTeams() {
        return RouterFunctions
            .route(GET("/team-category")
                  .and(RequestPredicates.accept(MediaType.TEXT_EVENT_STREAM)), teamHandler::listTeamCategories)
            .andRoute(GET("/team-category/{id}"), teamHandler::getTeamCategoryById)
            .andRoute(POST("/team-category").and(RequestPredicates.accept(MediaType.APPLICATION_JSON)), teamHandler::createTeamCategory)
            .andRoute(DELETE("/team-category/{id}"), teamHandler::deleteCategoryById)
            .andRoute(PUT("/team-category/{id}"), teamHandler::updateTeamCategoryById)
            .andRoute(GET("/team")
                    .and(RequestPredicates.accept(MediaType.TEXT_EVENT_STREAM)), teamHandler::listTeams)
              
//            .andRoute(POST("/team").and(RequestPredicates.accept(MediaType.APPLICATION_JSON)), teamHandler::createTeam)
//            .andRoute(POST("/team/{id}/training").and(RequestPredicates.accept(MediaType.APPLICATION_JSON)), teamHandler::setTrainings)
            ;
    }
    
    public RouterFunction<ServerResponse> routeMatches() {
        return RouterFunctions
            .route(GET("/match")
                    .and(RequestPredicates.accept(MediaType.TEXT_EVENT_STREAM)), matchHandler::listAll)
            .andRoute(POST("/match")
                    .and(RequestPredicates.accept(MediaType.APPLICATION_JSON)), matchHandler::createMatch)
            .andRoute(DELETE("/match/{id}"), matchHandler::deleteMatchById)
            .andRoute(GET("/match/{id}"), matchHandler::getMatchById)
            ;
    }
    
//    @Bean
    public RouterFunction<ServerResponse> routeUtils() {
        return RouterFunctions
            .route(GET("/admin/role"), utilsHandler::listRoles);
    }
}
