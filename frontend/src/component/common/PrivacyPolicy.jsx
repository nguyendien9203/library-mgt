import React from 'react'

const PrivacyPolicy = () => {
    return (
        <div style={{ margin: '0 200px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h5>Điều khoản bảo mật</h5>
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
                <p><strong>1. Giới thiệu</strong></p>
                <p>My Book Shelf cam kết bảo vệ sự riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.</p>

                <p><strong>2. Thu thập Thông tin Cá nhân</strong></p>
                <ul>
                    <li>Chúng tôi thu thập thông tin cá nhân khi bạn đăng ký tài khoản, sử dụng dịch vụ, hoặc liên hệ với chúng tôi.</li>
                    <li>Thông tin cá nhân có thể bao gồm tên, địa chỉ email, số điện thoại, và các thông tin khác mà bạn cung cấp.</li>
                </ul>

                <p><strong>3. Sử dụng Thông tin Cá nhân</strong></p>
                <ul>
                    <li>Chúng tôi sử dụng thông tin cá nhân của bạn để cung cấp, duy trì và cải thiện dịch vụ của chúng tôi.</li>
                    <li>Thông tin của bạn có thể được sử dụng để liên hệ với bạn về các cập nhật, khuyến mãi, và các thông tin liên quan đến dịch vụ.</li>
                </ul>

                <p><strong>4. Chia sẻ Thông tin Cá nhân</strong></p>
                <ul>
                    <li>Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba trừ khi được pháp luật yêu cầu hoặc bạn cho phép.</li>
                    <li>Thông tin cá nhân của bạn có thể được chia sẻ với các đối tác và nhà cung cấp dịch vụ để hỗ trợ chúng tôi trong việc cung cấp dịch vụ.</li>
                </ul>

                <p><strong>5. Bảo mật Thông tin Cá nhân</strong></p>
                <ul>
                    <li>Chúng tôi áp dụng các biện pháp bảo mật để bảo vệ thông tin cá nhân của bạn khỏi mất mát, truy cập trái phép, và tiết lộ.</li>
                    <li>Chỉ những nhân viên và đối tác có quyền truy cập mới có thể truy cập thông tin cá nhân của bạn.</li>
                </ul>

                <p><strong>6. Quyền của Bạn</strong></p>
                <ul>
                    <li>Bạn có quyền truy cập, sửa đổi, và xóa thông tin cá nhân của mình.</li>
                    <li>Bạn có quyền từ chối nhận các thông báo từ chúng tôi bất kỳ lúc nào.</li>
                </ul>

                <p><strong>7. Liên Hệ</strong></p>
                <p>Nếu bạn có bất kỳ câu hỏi nào về điều khoản bảo mật, vui lòng liên hệ với chúng tôi qua email: <a style={{color: '#000'}} href="mailto:support@mybookshelf.com">support@mybookshelf.com</a></p>

                <p><strong>8. Thay Đổi Điều Khoản</strong></p>
                <p>Chúng tôi có thể thay đổi chính sách bảo mật này bất kỳ lúc nào. Các thay đổi sẽ được thông báo trên trang web và có hiệu lực ngay khi đăng tải.</p>

                <p>Cảm ơn bạn đã sử dụng dịch vụ của My Book Shelf!</p>
            </div>
        </div>
    )
}

export default PrivacyPolicy
