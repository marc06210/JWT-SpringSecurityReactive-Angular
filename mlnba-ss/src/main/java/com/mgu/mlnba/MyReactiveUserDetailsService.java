package com.mgu.mlnba;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.mgu.mlnba.model.Member;
import com.mgu.mlnba.repository.MemberRepository;

import reactor.core.publisher.Mono;

@Component
public class MyReactiveUserDetailsService implements ReactiveUserDetailsService {
    @Autowired
    private MemberRepository userRepository;

    @Override
    public Mono<UserDetails> findByUsername(String username) {
        return userRepository.findByUsername(username)
                .switchIfEmpty(Mono.defer(() -> {
                    return Mono.error(new UsernameNotFoundException("User Not Found"));
                })).map(CustomUser::new);
    }
    
    public class CustomUser extends Member implements UserDetails {
        /**
         * 
         */
        private static final long serialVersionUID = 1220922143862705704L;

        public CustomUser(Member p) {
            super(p.getId(), p.getUsername(), p.getPassword(), p.getLastname(), p.getFirstname(), null);
            this.setRoles(p.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return roles;
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
