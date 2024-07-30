package swp391.learning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import swp391.learning.domain.entity.MemberBenefit;
import swp391.learning.domain.entity.MemberBenefitKey;

@Repository
public interface MemberBenefitRepository extends JpaRepository<MemberBenefit, MemberBenefitKey>{
    
}
