import React from 'react'

const Support = () => {
    return (
        <div style={{ margin: '0 200px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h5>Hỗ Trợ</h5>
            </div>
            <div
                style={{
                    fontSize: 'small',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '5px',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                }}
            >
                <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn! Nếu bạn gặp bất kỳ vấn đề nào hoặc có bất kỳ câu hỏi nào liên quan đến dịch vụ của chúng tôi, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi.</p>

                <p><strong>Hỗ trợ qua email:</strong></p>
                <p>Gửi email đến <a style={{ color: '#000' }} href="mailto:support@mybookshelf.com">support@mybookshelf.com</a> và chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p>

                <p><strong>Hỗ trợ qua điện thoại:</strong></p>
                <p>Gọi đến số điện thoại: <a style={{ color: '#000' }} href="tel:+1234567890">+123 456 7890</a> để được hỗ trợ trực tiếp.</p>

                <p><strong>Giờ làm việc:</strong></p>
                <p>Thứ Hai - Thứ Sáu: 9:00 AM - 6:00 PM</p>
                <p>Thứ Bảy: 10:00 AM - 4:00 PM</p>
                <p>Chúng tôi không làm việc vào Chủ Nhật và các ngày lễ.</p>

                <p>Cảm ơn bạn đã sử dụng dịch vụ của My Book Shelf!</p>
            </div>
        </div>
    )
}

export default Support
