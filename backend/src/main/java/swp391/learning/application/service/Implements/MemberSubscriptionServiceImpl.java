package swp391.learning.application.service.Implements;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import swp391.learning.application.service.MemberSubscriptionService;
import swp391.learning.application.service.PaymentService;
import swp391.learning.config.VnPayConfig;
import swp391.learning.domain.dto.common.PaymentRes;
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
import swp391.learning.domain.dto.response.user.membership.MembershipResponse.BenefitDTO;
import swp391.learning.domain.entity.MemberBenefit;
import swp391.learning.domain.entity.MemberBenefitKey;
import swp391.learning.domain.entity.MemberSubscription;
import swp391.learning.domain.entity.Order;
import swp391.learning.domain.entity.Payment;
import swp391.learning.domain.entity.User;
import swp391.learning.domain.enums.*;
import swp391.learning.exception.ResourceNotFoundException;
import swp391.learning.repository.BenefitsRepository;
import swp391.learning.repository.MemberBenefitRepository;
import swp391.learning.repository.MemberSubscriptionRepository;
import swp391.learning.repository.OrderRepository;
import swp391.learning.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MemberSubscriptionServiceImpl implements MemberSubscriptionService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final PaymentService paymentService;
    private final MemberSubscriptionRepository memberSubscriptionRepository;
    private static final Logger log = LoggerFactory.getLogger(MemberSubscriptionServiceImpl.class);
    private final MemberBenefitRepository memberBenefitRepository;
    private final BenefitsRepository benefitsRepository;

    @Override
    public ResponseCommon<List<MembershipResponse>> getAllMemberships() {
        List<MemberSubscription> memberSubscription = memberSubscriptionRepository
                .findMemberSubscriptionByIsDeleted(false);
        List<MembershipResponse> list = mapMemberSubscriptionToMembershipResponse(memberSubscription);
        log.debug("Get all membership with " + memberSubscription.size() + " records");
        return new ResponseCommon<>(ResponseCode.SUCCESS, list);
    }   

    private List<String> mapMemberBenefitToListBenefit(List<MemberBenefit> memberBenefits){
        List<String> list = new ArrayList<>();
        for (MemberBenefit m : memberBenefits) {
            list.add(m.getBenefits().getName());
        }
        return list;
    }

    private List<MembershipResponse> mapMemberSubscriptionToMembershipResponse(List<MemberSubscription> list){
        List<MembershipResponse> result = new ArrayList<>();
        for (MemberSubscription memberSubscription : list) {
            MembershipResponse membershipResponse = new MembershipResponse();
            List<MemberBenefit> memberBenefit = memberSubscription.getMemberBenefits().stream().filter(m -> m.getId().getMemberId() == memberSubscription.getId()).toList();
            List<BenefitDTO> benefits = memberBenefit.stream().map(m -> new MembershipResponse.BenefitDTO(m.getBenefits().getId(), m.getBenefits().getName())).toList();
            BeanUtils.copyProperties(memberSubscription, membershipResponse);
            membershipResponse.setBenefits(benefits);
            result.add(membershipResponse);
        }
        return result;
    }

    @Override
    public ResponseCommon<AddMemberSubscriptionResponse> addMemberSubscription(
            AddMemberSubscriptionRequest addMemberSubscriptionRequest) {
        try {
            MemberSubscription memberSubscription = memberSubscriptionRepository
                    .findMemberSubscriptionByNameSubscription(addMemberSubscriptionRequest.getNameSubscription())
                    .orElse(null);
            if (memberSubscription != null) {
                log.debug("Thêm đăng ký thành viên không thành công: Gói thành viên đã tồn tại");
                return new ResponseCommon<>(ResponseCode.SUBSCRIPTION_EXIST, null);
            }
            User user = userRepository.findByEmail(addMemberSubscriptionRequest.getEmail());
            if (Objects.isNull(memberSubscription)) {
                memberSubscription = new MemberSubscription();
            }
//            memberSubscription.setUserCreated(user);
            memberSubscription.setDeleted(false);
            memberSubscription.setNameSubscription(addMemberSubscriptionRequest.getNameSubscription());
            memberSubscription.setFeeMember(addMemberSubscriptionRequest.getFee_member());
            memberSubscription.setMaxBook(addMemberSubscriptionRequest.getMaxBook());
            memberSubscription.setExpireDate(Integer.parseInt(addMemberSubscriptionRequest.getExpireDate()));
            memberSubscription.setCreatedAt(LocalDateTime.now());

            MemberSubscription savedSubscription = memberSubscriptionRepository.save(memberSubscription);
            if (savedSubscription == null) {
                log.debug("Add Member Subscription failed: Unable to save the subscription");
                return new ResponseCommon<>(ResponseCode.FAIL, null);
            }
            for (String s : addMemberSubscriptionRequest.getSelectedBenefits()) {
                MemberBenefit memberBenefit = new MemberBenefit(
                    new MemberBenefitKey(savedSubscription.getId(), Integer.parseInt(s)), savedSubscription, benefitsRepository.findById(Integer.parseInt(s)).get());
                memberBenefitRepository.save(memberBenefit);
            }
            // memberBenefitRepository.save()
            AddMemberSubscriptionResponse response = new AddMemberSubscriptionResponse(
                    "Thêm gói thành viên thành công");
            return new ResponseCommon<>(ResponseCode.SUCCESS, response);
        } catch (Exception e) {
            e.printStackTrace();
            log.debug("Thêm gói thành viên thành công: " + e.getMessage());
            return new ResponseCommon<>(ResponseCode.FAIL, null);
        }
    }

    @Override
    public ResponseCommon<UpdateMemberSubscriptionResponse> updateMemberSubscription(
            UpdateMemberSubscriptionRequest updateMemberSubscriptionRequest) {
        try {
            MemberSubscription memberSubscription = memberSubscriptionRepository
                    .findById(updateMemberSubscriptionRequest.getSubId()).orElse(null);
            User user = userRepository.findByEmail(updateMemberSubscriptionRequest.getEmail());

            if (Objects.isNull(memberSubscription)) {
                log.debug("Update MemberSubscription failed: Subscription does not exist");
                return new ResponseCommon<>(ResponseCode.SUBSCRIPTION_NOT_EXIST, null);
            }
            MemberSubscription memberSubscriptionUpdate = memberSubscription;
//            memberSubscriptionUpdate.setUserCreated(user);
            memberSubscription.setExpireDate(Integer.parseInt(updateMemberSubscriptionRequest.getExpireDate()));
            memberSubscription.setNameSubscription(updateMemberSubscriptionRequest.getNameSubscription());
            memberSubscriptionUpdate.setFeeMember(updateMemberSubscriptionRequest.getFee_member());
            memberSubscription.setMaxBook(updateMemberSubscriptionRequest.getMaxBook());
            memberSubscriptionUpdate.setCreatedAt(LocalDateTime.now());

            MemberSubscription updatedSubscription = memberSubscriptionRepository.save(memberSubscription);
            if (updatedSubscription == null) {
                log.debug("Update Member Subscription failed: Unable to update the subscription");
                return new ResponseCommon<>(ResponseCode.FAIL, null);
            }
            for (BenefitDTO b : updateMemberSubscriptionRequest.getSelectedBenefits()) {
                MemberBenefit memberBenefit = new MemberBenefit(
                    new MemberBenefitKey(updatedSubscription.getId(), b.getId()), updatedSubscription, benefitsRepository.findById(b.getId()).get());
                memberBenefitRepository.save(memberBenefit);
            }
            UpdateMemberSubscriptionResponse response = new UpdateMemberSubscriptionResponse(
                    "Cập nhật gói thành viên thành công");
            return new ResponseCommon<>(ResponseCode.SUCCESS, response);
        } catch (Exception e) {
            e.printStackTrace();
            log.debug("Cập nhật gói thành viên thành công: " + e.getMessage());
            return new ResponseCommon<>(ResponseCode.FAIL, null);
        }
    }

    @Override
    public ResponseCommon<DeleteMemberSubscriptionResponse> deleteMemberSubscription(
            DeleteMemberSubscriptionRequest deleteMemberSubscriptionRequest) {
        try {
            MemberSubscription memberSubscription = memberSubscriptionRepository
                    .findMemberSubscriptionById(deleteMemberSubscriptionRequest.getSubscriptionId()).orElse(null);
            User user = userRepository.findByEmail(deleteMemberSubscriptionRequest.getEmail());
            if (Objects.isNull(memberSubscription)) {
                log.debug("Delete Member Subscription failed: Member Subscription does not exist");
                return new ResponseCommon<>(ResponseCode.SUBSCRIPTION_NOT_EXIST, null);
            } else {
                MemberSubscription memberSubscriptionUpdate = memberSubscription;
                memberSubscriptionUpdate.setDeleted(true);
//                memberSubscriptionUpdate.setUserCreated(user);
                memberSubscriptionRepository.save(memberSubscriptionUpdate);

                DeleteMemberSubscriptionResponse deleteMemberSubscriptionResponse = new DeleteMemberSubscriptionResponse();
                deleteMemberSubscriptionResponse.setMessage("Xóa gói thành viên thành công");
                return new ResponseCommon<>(ResponseCode.SUCCESS, deleteMemberSubscriptionResponse);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.debug("Xóa gói thành viên thành công: " + e.getMessage());
            return new ResponseCommon<>(ResponseCode.FAIL, null);
        }
    }

    @Override
    public ResponseCommon<EnrollMembershipResponse> enrollMembership(EnrollMembershipRequest enrollMembershipRequest) {
        try {
            EnrollMembershipResponse enrollMembershipResponse = new EnrollMembershipResponse();
            MemberSubscription memberSubscription = memberSubscriptionRepository
                    .findMemberSubscriptionById(enrollMembershipRequest.getMembershipId()).orElse(null);
            User user = userRepository.findByEmail(enrollMembershipRequest.getEmail());
            Order validOrder = orderRepository.getOrderByUserIdAndStatus(user.getId(), "ACTIVE");
            String expectedSignValue = generateAndHashQueryString(enrollMembershipRequest);
            if (!expectedSignValue.equals(enrollMembershipRequest.getVnp_TransactionNo())) {
                log.debug("Enroll member response failed because the transaction has been altered.");
                return new ResponseCommon<>(ResponseCode.SEND_URL_PAYMENT_FAIL.getCode(), "URL không tồn tại", null);
            }            if (validOrder == null) {
                System.out.println(memberSubscription);
                Order order = new Order();
                order.setCreated_at(LocalDateTime.now());
                order.setUser(user);
                order.setChecksum(enrollMembershipRequest.getVnp_TransactionNo());
                order.setMemberSubscription(memberSubscription);
                order.setEnumTypeProcessPayment(EnumTypeProcessPayment.INPROCESS);
                order.setAmount(memberSubscription.getFeeMember());
                order.setStatus("ACTIVE");
                orderRepository.save(order);
                user.setMemberSubscription(memberSubscription);
                userRepository.save(user);

                ResponseCommon<PaymentRes> paymentResponse = paymentService
                        .addPayment(memberSubscription.getFeeMember(), enrollMembershipRequest.getMembershipId());

                if (paymentResponse.getCode() == ResponseCode.SUCCESS.getCode()) {
                    enrollMembershipResponse.setOrderId(order.getId());
                    enrollMembershipResponse.setUrlPayment(paymentResponse.getData().getUrl());
                    order.setChecksum(paymentResponse.getData().getVnp_TxnRef());
                    return new ResponseCommon<>(ResponseCode.SUCCESS.getCode(), "Đăng ký gói thành công",
                            enrollMembershipResponse);
                } else {
                    log.debug("Enroll member response failed because payment Response not success.");
                    return new ResponseCommon<>(ResponseCode.FAIL.getCode(), "Thanh toán thất bại", null);
                }
            }else{
                log.debug("Enroll member response failed because payment Response not success");
                return new ResponseCommon<>(ResponseCode.SUCCESS.getCode(), "Người dùng đã mua gói thành viên", null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.debug("Enroll member failed: " + e.getMessage());
            return new ResponseCommon<>(ResponseCode.FAIL, null);
        }
    }
    public String generateAndHashQueryString(EnrollMembershipRequest enrollMembershipRequest) {
        Map<String, String> fields = new HashMap<>();
        fields.put("vnp_TransactionNo", enrollMembershipRequest.getVnp_TransactionNo());
        String queryString = VnPayConfig.hashAllFields(fields);

        return queryString;
    }

    @Override
    public MemberSubscription findById(int id) {
        return memberSubscriptionRepository.findMemberSubscriptionById(id).orElse(null);
    }

    @Override
    public boolean isUserSubscribed(int userId, int subscriptionId) {
        User user = userRepository.findById(userId);
        if(user == null){
            throw new ResourceNotFoundException("Người dùng không tồn tại");
        }
        if (user.getMemberSubscription() != null) {
            return user.getMemberSubscription().getId() == subscriptionId;
        }
        return false;
    }

    @Override
    public boolean isUserSubscribed(int userId) {
        User user = userRepository.findById(userId);
        if(user == null){
            throw new ResourceNotFoundException("Người dùng không tồn tại");
        }
        return user.getMemberSubscription() != null;
    }
}
