package swp391.learning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp391.learning.domain.entity.Order;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {

    Optional<Order> getOrderById(int id);
    Order getOrderByUserIdAndStatus(int userId, String status);
    Order findByChecksum(String checksum);

}