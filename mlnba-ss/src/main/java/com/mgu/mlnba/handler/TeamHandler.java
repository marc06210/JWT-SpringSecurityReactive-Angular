package com.mgu.mlnba.handler;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.mgu.mlnba.model.Team;
import com.mgu.mlnba.model.TeamGroup;
import com.mgu.mlnba.repository.TeamGroupRepository;
import com.mgu.mlnba.repository.TeamRepository;
import com.mgu.mlnba.utils.Gender;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class TeamHandler {

    // @Autowired
    private final TeamRepository teamRepo;
    private final TeamGroupRepository teamGroupRepo;

    public TeamHandler(TeamRepository teamRepo, TeamGroupRepository teamGroupRepo) {
        this.teamRepo = teamRepo;
        this.teamGroupRepo = teamGroupRepo;
    }

     public Mono<ServerResponse> listTeams(ServerRequest request) {
    
     return ServerResponse.ok()/*.contentType(MediaType.TEXT_EVENT_STREAM)*/
             .body(teamRepo.findAll()
                     .sort((t1,t2) -> t1.getName().compareTo(t2.getName())), 
                     Team.class);
     }

    public Mono<ServerResponse> listTeamCategories(ServerRequest request) {
        return ServerResponse.ok()/*.contentType(MediaType.TEXT_EVENT_STREAM)*/
                .body(teamGroupRepo
                        .findAll()
                        .sort((t1,t2) -> t1.getName().compareTo(t2.getName())),
                        TeamGroup.class);
    }

    public Mono<ServerResponse> getTeamCategoryById(ServerRequest request) {
        return ServerResponse
                .ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(teamGroupRepo.findById(request.pathVariable("id"))
                        .switchIfEmpty(Mono.error(new Exception("No category found"))),
                        TeamGroup.class);
    }

    public Mono<ServerResponse> updateTeamCategoryById(ServerRequest request) {
        Mono<TeamGroup> a = request.bodyToMono(TeamGroup.class)
            .map(c -> {
                Mono<TeamGroup> c1 = Mono.just(c);
                Flux<Team> teams  = Flux.fromIterable(c.getTeams());
                
                Mono<TeamGroup> re = Mono.zip(c1, teams.flatMap(x -> {
                    if(x.getId()==null) {
                        String teamName = c.getName() + c.getGender() + x.getName();
                        x.setName(teamName);
                        return teamRepo.insert(x);
                    } else
                        return teamRepo.save(x);
                    })
                .collectList(), (tg, ts) -> {
                    tg.setTeams(ts);
                    return tg;}).map(t -> t);
              return re;
            })
            .flatMap(t -> t)
            .map(t -> teamGroupRepo.save(t))
            .flatMap(t -> t);
        return ServerResponse.ok().body(a, TeamGroup.class);
    }

    public Mono<ServerResponse> createTeamCategory(ServerRequest request) {
        Mono<TeamGroup> insertedTeamGroup = request.bodyToMono(TeamGroup.class)
                .map(teamGroup -> {
                    Mono<TeamGroup> teamGroup1 = Mono.just(teamGroup);
                    Flux<Team> teams  = Flux.fromIterable(teamGroup.getTeams());
                    return Mono.zip(
                            teamGroup1, 
                            teams.flatMap(t -> {
                                String teamName = teamGroup.getName() + teamGroup.getGender() + t.getName();
                                t.setName(teamName.toUpperCase());
                                return teamRepo.insert(t);
                            }).collectList(), 
                            
                            (tg, ts) -> {
                                tg.setTeams(ts);
                                tg.setName(teamGroup.getName().toUpperCase());
                                return tg;
                            })
                            .map(t -> t);
                })
                .flatMap(t -> t)
                .map(teamGroupRepo::insert)
                .flatMap(t -> t);
            return ServerResponse.ok().body(insertedTeamGroup, TeamGroup.class);
    }

    public Mono<ServerResponse> deleteCategoryById(ServerRequest request) {
        Mono<Void> response = teamGroupRepo.findById(request.pathVariable("id"))
                .map(tg -> {
                    Mono<TeamGroup> me = Mono.just(tg);
                    Flux<Team> teams = Flux.fromIterable(tg.getTeams());
                    return Mono.zip(
                                me, 
                                teams.flatMap(teamRepo::delete).collectList(),
                                (cat, deletedTeams) -> teamGroupRepo.delete(cat))
                            .flatMap(t -> t);
                })
                .flatMap(t -> t);
                
        return ServerResponse.accepted().build(response);
    }

    // public Mono<ServerResponse> createTeam(ServerRequest request) {
    // Mono<Team> team = request.bodyToMono(Team.class);
    //
    // return ServerResponse.ok().body(teamRepo.insert(team).next(), Team.class);
    // }
    //
    // public Mono<ServerResponse> updateTeamById(ServerRequest request) {
    // Mono<Team> team = request.bodyToMono(Team.class);
    // return ServerResponse.ok().body(teamRepo.saveAll(team), Team.class);
    // }
    //
    // public Mono<ServerResponse> deleteById(ServerRequest request) {
    // Mono<Void> response = teamRepo.deleteById(request.pathVariable("id"));
    // return ServerResponse.accepted().build(response);
    // }
    //
    // public Mono<ServerResponse> setTrainings(ServerRequest request) {
    // Mono<Team> result = teamRepo.findById(request.pathVariable("id"))
    // .zipWith(request.bodyToMono(Training.class))
    // .map(p -> {
    // p.getT1().getTrainings().add(p.getT2());
    // return p.getT1();
    // });
    // return ServerResponse.ok()
    // .body(teamRepo.saveAll(result)
    // .switchIfEmpty(Mono.error(new Exception("Error updating the team"))),
    // Team.class);
    // }
}
