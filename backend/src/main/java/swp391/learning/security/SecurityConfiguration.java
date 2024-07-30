package swp391.learning.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers(
                                        "/api/v1/auth/**",
                                        "/api/v1/book/get-books",
                                        "/api/v1/book/get-newest-books",
                                        "/api/v1/book/{parentCategoryId}/get-all-books-by-sub-category",
                                        "/api/v1/book/{subCategoryId}/get-books-by-category-id",
                                        "/api/v1/book/{bookId}/get-book-by-id",
                                        "/api/v1/book/{bookId}/get-book-image",
                                        "/api/v1/book/{bookId}/get-sample-book-images",
                                        "/api/v1/book-copy/{bookCopyId}/get-all-book-copy",
                                        "/api/v1/book-copy/{bookCopyId}/get-book-copy-by-id",
                                        "/api/v1/category/get-all-category",
                                        "/api/v1/category/get-category-by-id/{id}",
                                        "/api/v1/category/get-all-parent-category",
                                        "/api/v1/author/get-all-author",
                                        "/api/v1/author/get-author-by-id/{id}",
                                        "/api/v1/membership/memberships"
                                ).permitAll()
                                .anyRequest().authenticated()

                )
//                .oauth2Login(oath2 -> {
//                    oath2.loginPage("/login").permitAll();
//                    oath2.successHandler(oAuth2LoginSuccessHandler);
//                })


                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return webSecurity -> webSecurity.ignoring().
                requestMatchers("/actuator/**", "/v3/**", "/webjars/**", "/swagger-ui*/*swagger-initializer.js", "/swagger-ui*/**");
    }
}