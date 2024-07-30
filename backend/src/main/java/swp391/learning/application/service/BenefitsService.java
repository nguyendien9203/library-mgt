package swp391.learning.application.service;

import java.util.List;

import swp391.learning.domain.dto.request.admin.benefits.CreateBenefitRequest;
import swp391.learning.domain.dto.request.admin.benefits.UpdateBenefitRequest;
import swp391.learning.domain.dto.response.admin.benefits.BenefitResponse;
import swp391.learning.domain.entity.Benefits;

public interface BenefitsService {
    // Benefits createBenefit(CreateBenefitRequest createBenefitRequest);

    // Benefits updateBenefit(int benefitsId, UpdateBenefitRequest updateBenefitRequest);

    void deleteBenefit(int id);

    BenefitResponse getBenefitById(int id);
    List<BenefitResponse> getBenefits();
}
