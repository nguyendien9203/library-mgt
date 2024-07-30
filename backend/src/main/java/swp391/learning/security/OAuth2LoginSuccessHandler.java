package swp391.learning.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import swp391.learning.domain.entity.User;
import swp391.learning.domain.enums.EnumTypeRole;
import swp391.learning.repository.UserRepository;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        DefaultOAuth2User principal = (DefaultOAuth2User) oauthToken.getPrincipal();
        Map<String, Object> attributes = principal.getAttributes();

        String email = attributes.getOrDefault("email", "").toString();
        String name = attributes.getOrDefault("name", "").toString();

        // Check if user already exists in database
        User user = userRepository.findByEmail(email);

        if (user == null) {
            // Create a new user entity
            user = new User();
            user.setEmail(email);
            user.setFullName(name);

            // Save the new user entity to database
            userRepository.save(user);
        }

        // Create a new authentication token with updated authorities if needed
        DefaultOAuth2User newUserPrincipal = new DefaultOAuth2User(
                List.of(new SimpleGrantedAuthority(EnumTypeRole.MEMBER.name())),
                attributes, "id");
        OAuth2AuthenticationToken newAuthentication = new OAuth2AuthenticationToken(
                newUserPrincipal,
                newUserPrincipal.getAuthorities(),
                oauthToken.getAuthorizedClientRegistrationId());

        // Set the new authentication token to security context
        SecurityContextHolder.getContext().setAuthentication(newAuthentication);

        // Redirect to frontend URL after successful authentication
        response.sendRedirect(frontendUrl);
    }
}
