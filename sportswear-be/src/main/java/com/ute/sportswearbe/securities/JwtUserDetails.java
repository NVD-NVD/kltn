package com.ute.sportswearbe.securities;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class JwtUserDetails implements UserDetails {
    private final String userName;

    private final String password;

    public final Collection<? extends GrantedAuthority> authorities;

    public final boolean active;

    public JwtUserDetails(String userName, String password
            , Collection<? extends GrantedAuthority> authorities, boolean active) {
        this.userName = userName;
        this.password = password;
        this.authorities = authorities;
        this.active = active;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return active;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}
