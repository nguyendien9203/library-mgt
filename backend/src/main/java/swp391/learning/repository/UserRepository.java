package swp391.learning.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import swp391.learning.domain.entity.User;
import swp391.learning.domain.enums.EnumTypeRole;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
    User findById(int id);

    @Query("SELECT u FROM User u WHERE u.role IN :roles")
    List<User> findAllByRoles(@Param("roles") List<EnumTypeRole> roles);

    @Query("SELECT COUNT(u) FROM User u WHERE u.role IN :roles")
    int countTotalUserByRole(@Param("roles") List<EnumTypeRole> roles);

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    int countLibrarian(EnumTypeRole role);

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    int countMember(EnumTypeRole role);
}
