package swp391.learning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp391.learning.domain.entity.MemberSubscription;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberSubscriptionRepository extends JpaRepository<MemberSubscription, Integer> {
    Optional<MemberSubscription> findMemberSubscriptionByNameSubscription(String nameSubscription);
    Optional<MemberSubscription> findMemberSubscriptionById(int id);
    List<MemberSubscription> findMemberSubscriptionByIsDeleted(boolean isDeleted);
    // MemberSubscription findMemberSubscriptionById(int id);
}

