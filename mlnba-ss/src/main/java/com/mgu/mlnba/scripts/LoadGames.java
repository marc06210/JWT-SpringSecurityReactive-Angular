package com.mgu.mlnba.scripts;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.AbstractMap.SimpleEntry;
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Stream;

import javax.xml.bind.DatatypeConverter;

import org.springframework.http.HttpHeaders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ClientResponse.Headers;
import org.springframework.web.reactive.function.client.WebClient;

import com.mgu.mlnba.model.GameEvent;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

public class LoadGames {

    protected static final String FILEPATH = "/Users/guerrini/Documents/_perso/basket/rechercherRencontreAccueil.csv";

    public static void main(String[] args) {
//        try {
//            Reader reader = Files.newBufferedReader(Paths.get(FILEPATH));
//            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader());
//            
//            csvParser.iterator().forEachRemaining(LoadGames::process);
////            csvParser.getRecords().stream()
////                .forEach(LoadGames::process);
//        } catch(Exception e) {
//            
//        }
        
//        stream(Paths.get(FILEPATH))
//            .filter(GameEvent::isValid)
//            .subscribe(LoadGames::process);
//        
//        
//        try {
//            System.in.read();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        
        connect();
    }
    
    
    protected static boolean connect() {
        getCookiesAndCsrfToken();
        return true;
    }
    
    protected static boolean insert(GameEvent gameEvent) {
        return false;
    }
    
    public static Flux<GameEvent> stream(Path path) {
        // Using a custom flux creation so that we can control when the jdk stream needs to be closed (after completion).
        return Flux.<String>push(emitter -> {
            try (Stream<String> lines = Files.lines(path).skip(1)) {
                lines.forEach(emitter::next);
                emitter.complete();
            } catch (IOException e) {
                emitter.error(e);
            }
        }).parallel().runOn(Schedulers.parallel()).map(line -> {
            try {
                final String[] data = line.split(";");
                
                return new GameEvent(data[0], data[1], data[2], data[3], data[4], data[5], data[6]);

            } catch (Exception e) {
                // Skip the ones that cannot be parsed, reactor does not allow to return null in a publisher.
                return new GameEvent();
            }
        }).sequential();
    }
    
    protected static void process(GameEvent game) {
        System.out.println("A intégrer: " + game);
    }
    
    protected static SimpleEntry<String, String> getCookiesAndCsrfToken() {
        
        WebClient webClient = WebClient.builder().build();
        
        Mono<ClientResponse> getSessionCookie = webClient.get()
                .uri("https://admin.sportsregions.fr/login/login_from_admin")
                .exchange()
                .doOnSuccess(clientResponse -> processHeaders("session", clientResponse.headers()));
        
        
        getSessionCookie.block();
        
        
        WebClient webClientCookies = WebClient.builder()
                .defaultCookie("session", (String)cookies.get("session").get(0))
//                .defaultHeader("ses", "headerValues")
                .build();
        
        getSessionCookie = webClientCookies.post()
              .uri("https://admin.sportsregions.fr/login/connect_from_admin?target=espaceperso/managesite/1443")
              .body(BodyInserters.fromObject( new AuthentRequest("marc.guerrini@gmail.com", "winona77", "-1")))
              .exchange()
              .doOnSuccess(clientResponse -> processHeaders("login_key", clientResponse.headers()));
        
        System.out.println(getSessionCookie.block());
        
        WebClient webClientCookies2 = WebClient.builder()
                .defaultCookie("session", "toto")//(String)cookies.get("session").get(0))
                .defaultHeader("login_key", "login_key")
                .build();
        
        Mono<String> reponse2 = webClientCookies.get().uri("https://admin.sportsregions.fr/login/login_from_admin/?target=espaceperso/managesite/1443")
                .exchange()
                .doOnSuccess(clientResponse -> System.out.println("clientResponse2.statusCode() = " + clientResponse.statusCode()))
                .flatMap(clientResponse -> clientResponse.bodyToMono(String.class));
        
        
        System.out.println(reponse2.block());

        reponse2 = webClientCookies.get().uri("https://admin.sportsregions.fr/evenement")
                .exchange()
                .doOnSuccess(clientResponse -> System.out.println("clientResponse2.statusCode() = " + clientResponse.statusCode()))
                .flatMap(clientResponse -> clientResponse.bodyToMono(String.class));
        
        System.out.println(reponse2.block());
        return null;

    }

    protected static MultiValueMap<String, String> cookies = new LinkedMultiValueMap<>();
    
    protected static String cookie = null;
    
    private static void processHeaders(String cookieToLookFor, Headers headers) {
        if(cookieToLookFor!=null) {
            HttpHeaders httpHeaders = headers.asHttpHeaders();
            List<String> s = httpHeaders.get("Set-Cookie");
            if(s!=null) {
                s.forEach(c -> {
                    String[] a = c.split(";");
                    Stream.of(a).filter(b -> b.startsWith(cookieToLookFor + "="))
                    .findFirst()
                    .ifPresent(d -> {
                        String[] arr = d.split("=");
                        cookies.put(arr[0], Arrays.asList(arr[1]));
                        System.err.println("cookie extracted '" + cookieToLookFor + "' with value '" + cookies.get(arr[0]) + "'");
                    });
                });
            }
        }
    }
    
    protected static void doNextCall() {
        System.out.println("next call");
    }


    private static String base64Encoded(String username, String password) {
        return "Basic " + DatatypeConverter.printBase64Binary((username + ":" + password).getBytes());
    }


}
