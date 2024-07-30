package swp391.learning.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import swp391.learning.application.service.BenefitsService;
import swp391.learning.domain.dto.common.ResponseError;
import swp391.learning.domain.dto.common.ResponseSuccess;
import swp391.learning.domain.dto.request.admin.benefits.CreateBenefitRequest;
import swp391.learning.domain.dto.request.admin.benefits.UpdateBenefitRequest;
import swp391.learning.domain.dto.response.admin.benefits.BenefitResponse;

@RestController
@RequestMapping("/api/v1/benefits")
@AllArgsConstructor
@Log4j2
public class BenefitsController {
    private BenefitsService benefitsService;

    // @Operation(summary = "Create new benefit")
    // @RequestMapping("/create-benefit")
    // public ResponseSuccess<?> createBenefit(@Valid @RequestBody CreateBenefitRequest createBenefitRequest) {
    //     try {
    //         benefitsService.createBenefit(createBenefitRequest);
    //         return new ResponseSuccess<>(HttpStatus.CREATED.value(), "Create benefit successfully");
    //     } catch (Exception e) {
    //         log.error("Create benefit failed: {}", e.getMessage());
    //         return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
    //     }
    // }

    // @Operation(summary = "Update benefit")
    // @RequestMapping("/update-benefit/{benefitsId}")
    // public ResponseSuccess<?> updateBenefit(@PathVariable int benefitsId, @RequestBody UpdateBenefitRequest updateBenefitRequest) {
    //     try {
    //         benefitsService.updateBenefit(benefitsId, updateBenefitRequest);
    //         return new ResponseSuccess<>(HttpStatus.OK.value(), "Update benefit successfully");
    //     } catch (Exception e) {
    //         log.error("Update benefit failed: {}", e.getMessage());
    //         return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
    //     }
    // }

    @Operation(summary = "Get benefit by id")
    @RequestMapping("/get-benefit/{benefitsId}")
    public ResponseSuccess<?> getBenefitById(@PathVariable int benefitsId) {
        try {
            BenefitResponse benefits = benefitsService.getBenefitById(benefitsId);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Get benefit successfully", benefits);
        } catch (Exception e) {
            log.error("Get benefit failed: {}", e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }
    }

    @Operation(summary = "Get benefits")
    @RequestMapping("/getBenefits")
    public ResponseSuccess<?> getBenefits() {
        try {
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Get benefit successfully", benefitsService.getBenefits());
        } catch (Exception e) {
            log.error("Get benefit failed: {}", e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }
    }

    // @Operation(summary = "Delete benefit")
    // @RequestMapping("/delete-benefit/{id}")
    // public ResponseSuccess<?> deleteBenefit(@PathVariable int id) {
    //     try {
    //         benefitsService.deleteBenefit(id);
    //         return new ResponseSuccess<>(HttpStatus.OK.value(), "Delete benefit successfully");
    //     } catch (Exception e) {
    //         log.error("Delete benefit failed: {}", e.getMessage());
    //         return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
    //     }
    // }
}
