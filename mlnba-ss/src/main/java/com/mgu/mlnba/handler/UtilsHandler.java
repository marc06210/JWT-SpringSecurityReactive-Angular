package com.mgu.mlnba.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.mgu.mlnba.model.Role;
import com.mgu.mlnba.repository.RoleRepository;

import reactor.core.publisher.Mono;

@Component
public class UtilsHandler {
    
    private RoleRepository roleRepository;
    
    public UtilsHandler(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }
    
    public Mono<ServerResponse> listRoles(ServerRequest request) {
        return ServerResponse.ok()/*.contentType(MediaType.TEXT_EVENT_STREAM)*/
            .body(roleRepository.findAll(), Role.class);
    }

}
