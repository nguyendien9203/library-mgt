package swp391.learning.application.service;

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
import swp391.learning.domain.entity.MemberSubscription;

import java.util.List;


public interface MemberSubscriptionService {
    ResponseCommon<AddMemberSubscriptionResponse> addMemberSubscription(AddMemberSubscriptionRequest request);
    ResponseCommon<UpdateMemberSubscriptionResponse> updateMemberSubscription(UpdateMemberSubscriptionRequest request);

    ResponseCommon<DeleteMemberSubscriptionResponse> deleteMemberSubscription(DeleteMemberSubscriptionRequest deleteMemberSubscriptionRequest);

    ResponseCommon<EnrollMembershipResponse> enrollMembership(EnrollMembershipRequest enrollMembershipRequest);

    ResponseCommon<List<MembershipResponse>> getAllMemberships();

    MemberSubscription findById(int id);

    boolean isUserSubscribed(int userId, int subscriptionId);

    boolean isUserSubscribed(int userId);
}
