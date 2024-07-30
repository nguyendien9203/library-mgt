package swp391.learning.application.service.Implements;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import swp391.learning.application.service.BenefitsService;
import swp391.learning.domain.dto.response.admin.benefits.BenefitResponse;
import swp391.learning.domain.entity.Benefits;
import swp391.learning.exception.ResourceNotFoundException;
import swp391.learning.repository.BenefitsRepository;
import swp391.learning.repository.MemberSubscriptionRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BenefitsServiceImpl implements BenefitsService {
    private final BenefitsRepository benefitsRepository;
    private final MemberSubscriptionRepository memberSubscriptionRepository;

    // @Override
    // public Benefits createBenefit(CreateBenefitRequest createBenefitRequest) {
    //     int memberSubscriptionId = createBenefitRequest.getMemberSubscription();
    //     if ( !memberSubscriptionRepository.existsById(memberSubscriptionId) ) {
    //         throw new ResourceNotFoundException("Member subscription not found");
    //     }
    //     Benefits benefits = new Benefits();
    //     benefits.setName(createBenefitRequest.getName());
    //     benefits.setDescription(createBenefitRequest.getDescription());
    //     benefits.setMemberSubscription(memberSubscriptionRepository.findById(memberSubscriptionId).get());
    //     return benefitsRepository.save(benefits);
    // }

    // @Override
    // public Benefits updateBenefit(int benefitsId, UpdateBenefitRequest updateBenefitRequest) {
    //     if ( !benefitsRepository.existsById(benefitsId) ) {
    //         throw new ResourceNotFoundException("Benefit not found");
    //     }
    //     int memberSubscriptionId = updateBenefitRequest.getMemberSubscription();
    //     if ( !memberSubscriptionRepository.existsById(memberSubscriptionId) ) {
    //         throw new ResourceNotFoundException("Member subscription not found");
    //     }
    //     Benefits benefits = benefitsRepository.findById(benefitsId).get();
    //     benefits.setName(updateBenefitRequest.getName());
    //     benefits.setDescription(updateBenefitRequest.getDescription());
    //     benefits.setMemberSubscription(memberSubscriptionRepository.findById(memberSubscriptionId).get());
    //     return benefitsRepository.save(benefits);
    // }

    // @Override
    // public void deleteBenefit(int id) {
    //     int benefitId = id;
    //     if ( !benefitsRepository.existsById(benefitId) ) {
    //         throw new ResourceNotFoundException("Benefit not found");
    //     }
    //     benefitsRepository.deleteById(benefitId);
    // }

    @Override
    public BenefitResponse getBenefitById(int id) {
        int benefitId = id;
        if ( !benefitsRepository.existsById(benefitId) ) {
            throw new ResourceNotFoundException("Điều khoản không tồn tại");
        }
        Benefits benefit = benefitsRepository.findById(benefitId).get();
        return new BenefitResponse(benefit.getId(), benefit.getName(), benefit.getDescription());
    }

    @Override
    public List<BenefitResponse> getBenefits() {
        List<Benefits> list = benefitsRepository.findAll();
        List<BenefitResponse> results = new ArrayList<>();
        for (Benefits b : list) {
            results.add(new BenefitResponse(b.getId(), b.getName(), b.getDescription()));
        }
        return results;
    }

    @Override
    public void deleteBenefit(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteBenefit'");
    }
}
