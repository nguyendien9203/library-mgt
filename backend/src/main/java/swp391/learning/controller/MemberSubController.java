package swp391.learning.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swp391.learning.application.service.MemberSubscriptionService;
import swp391.learning.domain.dto.common.ResponseCommon;
import swp391.learning.domain.dto.request.admin.membership.AddMemberSubscriptionRequest;
import swp391.learning.domain.dto.request.admin.membership.DeleteMemberSubscriptionRequest;
import swp391.learning.domain.dto.request.admin.membership.EnrollMembershipRequest;
import swp391.learning.domain.dto.request.admin.membership.UpdateMemberSubscriptionRequest;
import swp391.learning.domain.dto.response.admin.membership.AddMemberSubscriptionResponse;
import swp391.learning.domain.dto.response.admin.membership.DeleteMemberSubscriptionResponse;
import swp391.learning.domain.dto.response.admin.membership.UpdateMemberSubscriptionResponse;
import swp391.learning.domain.dto.response.user.membership.EnrollMembershipResponse;
import swp391.learning.domain.dto.response.user.membership.MembershipResponse;
import swp391.learning.domain.enums.ResponseCode;

import java.util.List;

@RestController
@RequestMapping("/api/v1/membership")
@AllArgsConstructor
public class MemberSubController {

    private final MemberSubscriptionService memberSubscriptionService;

    @GetMapping("/memberships")
    public ResponseEntity<ResponseCommon<List<MembershipResponse>>> getAllMembershipSubscription(){
        return ResponseEntity.ok(memberSubscriptionService.getAllMemberships());
    }

    @GetMapping("/check-user-subscription")
    public ResponseEntity<ResponseCommon<Boolean>> checkSubscriptionUser(@RequestParam int userId, @RequestParam int subscriptionId) {
        return ResponseEntity.ok(new ResponseCommon<>(ResponseCode.SUCCESS.getCode(), "Success", memberSubscriptionService.isUserSubscribed(userId, subscriptionId)));
    }

    @GetMapping("/is-user-subscribed")
    public ResponseEntity<ResponseCommon<Boolean>> checkSubscriptionUser(@RequestParam int userId) {
        return ResponseEntity.ok(new ResponseCommon<>(ResponseCode.SUCCESS.getCode(), "Success", memberSubscriptionService.isUserSubscribed(userId)));
    }

    @PostMapping("/add-subscription")
    public ResponseEntity<ResponseCommon<AddMemberSubscriptionResponse>> addMemberSubscription(
            @Valid @RequestBody AddMemberSubscriptionRequest addMemberSubscriptionRequest) {
        ResponseCommon<AddMemberSubscriptionResponse> response = memberSubscriptionService.addMemberSubscription(addMemberSubscriptionRequest);
        if (response.getCode() == ResponseCode.SUCCESS.getCode()) {
            return ResponseEntity.ok(response);
        } else if (response.getCode() == ResponseCode.SUBSCRIPTION_EXIST.getCode()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ResponseCommon<>(response.getCode(), "Gói thành viên đã tồn tại", null));
        } else {
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.FAIL.getCode(), "Thêm gói thành viên thất bại", null));
        }
    }

    @PostMapping("/update-subscription")
    public ResponseEntity<ResponseCommon<UpdateMemberSubscriptionResponse>> updateMemberSubscription(
            @Valid @RequestBody UpdateMemberSubscriptionRequest updateMemberSubscriptionRequest) {
        ResponseCommon<UpdateMemberSubscriptionResponse> response = memberSubscriptionService.updateMemberSubscription(updateMemberSubscriptionRequest);
        if (response.getCode() == ResponseCode.SUCCESS.getCode()) {
            return ResponseEntity.ok(response);
        } else if (response.getCode() == ResponseCode.SUBSCRIPTION_NOT_EXIST.getCode()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseCommon<>(response.getCode(), "Gói thành viên không tồn tại", null));
        } else {
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.FAIL.getCode(), "Cập nhật gói thành vien thất bại", null));
        }
    }

    @PostMapping("/delete-subscription")
    public ResponseEntity<ResponseCommon<DeleteMemberSubscriptionResponse>> deleteMemberSubscription(
            @Valid @RequestBody DeleteMemberSubscriptionRequest deleteMemberSubscriptionRequest) {
        ResponseCommon<DeleteMemberSubscriptionResponse> response = memberSubscriptionService.deleteMemberSubscription(deleteMemberSubscriptionRequest);
        if (response.getCode() == ResponseCode.SUCCESS.getCode()) {
            return ResponseEntity.ok(response);
        } else if (response.getCode() == ResponseCode.CATEGORY_NOT_EXIST.getCode()) { // Check if this code matches your delete subscription scenario
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseCommon<>(response.getCode(), "Gói thành viên không tồn tại", null));
        } else {
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.FAIL.getCode(), "Xóa gói thành viên thất bại", null));
        }
    }
    @PostMapping("/enroll-membership")
    public ResponseEntity<ResponseCommon<EnrollMembershipResponse>> enrollMembership(@Valid @RequestBody EnrollMembershipRequest enrollMembershipRequest){
        ResponseCommon<EnrollMembershipResponse> response = memberSubscriptionService.enrollMembership(enrollMembershipRequest);
        if(response.getCode() == ResponseCode.SEND_URL_PAYMENT_FAIL.getCode()){
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.SEND_URL_PAYMENT_FAIL.getCode(),"Gửi đường dẫn thanh toán thất bại",null));
        } else if(response.getCode()==ResponseCode.FAIL.getCode()){
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.FAIL.getCode(),"Lỗi gửi đường dẫn thanh toán",null));
        } else {
            return ResponseEntity.ok().body(new ResponseCommon<>(ResponseCode.SUCCESS.getCode(),response.getMessage(),response.getData()));
        }
    }

}
