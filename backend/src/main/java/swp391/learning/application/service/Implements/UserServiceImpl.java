package swp391.learning.application.service.Implements;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import swp391.learning.application.service.UserService;
import swp391.learning.domain.dto.request.user.authentication.UserRequest;
import swp391.learning.domain.dto.response.admin.user.UserChartResponse;
import swp391.learning.domain.dto.response.admin.user.UserResponse;
import swp391.learning.domain.entity.User;
import swp391.learning.domain.enums.EnumTypeRole;
import swp391.learning.domain.enums.EnumUserStatus;
import swp391.learning.exception.DuplicateResourceException;
import swp391.learning.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    @Override
    public List<UserResponse> getAllUserByRole() {
        List<User> users = userRepository.findAllByRoles(List.of(EnumTypeRole.MEMBER, EnumTypeRole.LIBRARIAN));        return users.stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());

    }

    @Override
    public void addUser(UserRequest userRequest) {
        String email = userRequest.getEmail();
        if (userRepository.existsByEmail(email)) {
            throw new DuplicateResourceException("Email đã tồn tại");
        }

        User user = User.builder()
                .fullName(userRequest.getFullName())
                .email(userRequest.getEmail())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .phoneNumber(userRequest.getPhoneNumber())
                .role(EnumTypeRole.valueOf(userRequest.getRole()))
                .status(EnumUserStatus.valueOf(userRequest.getStatus()))
                .verified(false)
                .build();

        userRepository.save(user);
    }

    @Override
    public void updateUser(int id, UserRequest userRequest) {
        User user = userRepository.findById(id);

        user.setFullName(userRequest.getFullName());
        user.setEmail(userRequest.getEmail());
        user.setPhoneNumber(userRequest.getPhoneNumber());
        user.setRole(EnumTypeRole.valueOf(userRequest.getRole()));
        user.setStatus(EnumUserStatus.valueOf(userRequest.getStatus()));

        if (userRequest.getPassword() != null && !userRequest.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }

        userRepository.save(user);
    }

    @Override
    public UserResponse getUserById(int id) {
        User user = userRepository.findById(id);

        return mapToUserResponse(user);
    }

    @Override
    public UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .status(user.getStatus().toString())
                .role(user.getRole().name())
                .verified(user.getVerified())
                .membershipSubscriptionId(
                        user.getMemberSubscription() != null ? user.getMemberSubscription().getId() : 0
                )
                .build();
    }

    @Override
    public UserChartResponse getUserChart() {
        int totalUser = countTotalUserByRole(List.of(EnumTypeRole.MEMBER, EnumTypeRole.LIBRARIAN));
        int totalLibrarian = countLibrarian(EnumTypeRole.LIBRARIAN);
        int totalMember = countMember(EnumTypeRole.MEMBER);

        return UserChartResponse.builder()
                .totalUser(totalUser)
                .totalLibrarian(totalLibrarian)
                .totalMember(totalMember)
                .build();
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    private int countTotalUserByRole(List<EnumTypeRole> roles) {
        return userRepository.countTotalUserByRole(roles);
    }

    private int countLibrarian(EnumTypeRole role) {
        return userRepository.countLibrarian(role);
    }

    private int countMember(EnumTypeRole role) {
        return userRepository.countMember(role);
    }


}
