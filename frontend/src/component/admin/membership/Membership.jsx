import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Notification from '../../common/Notification'
import { Button, Table } from 'react-bootstrap'
import { deleteMemberSub, getMemberships } from '../../../service/MemberShipService'
import useNotification from '../../../hooks/useNotification'
import CustomModal from '../../common/CustomModal'
import { useAuth } from '../../context/AuthContext'

const Membership = () => {
    const {user} = useAuth()
    const [membership, setMemberShip] = useState()
    const { showSuccess, showError } = useNotification();
    const navigate = useNavigate();
    const location = useLocation();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [authorToDelete, setAuthorToDelete] = useState(null);
    const [submittingDelete, setSubmittingDelete] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (location.state && location.state.success) {
            showSuccess(location.state.success);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, showSuccess, navigate]);

    const fetchData = async () => {
        getMemberships().then(resp => {
            if (resp?.code === 200) {
                setMemberShip(resp?.data)
            }
        })
    }

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }
        const date = new Date(dateString)
        return date.toLocaleString('sv-SE', options).replace(' ', ' ')
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount).replace('₫', 'VND');
    };
    
    
    const handleShowDeleteModal = (author) => {
        setAuthorToDelete(author);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setAuthorToDelete(null);
        setShowDeleteModal(false);
    };

    const handleDeletePackage = async () => {
        const body = {
            email: user?.email,
            subscriptionId: authorToDelete?.id
        }
        await deleteMemberSub(body).then(resp => {
            if(resp?.code === 200){
                // showSuccess(resp?.data?.message)
                handleCloseDeleteModal()
                fetchData();
            }
        }).catch(err => showError("lỗi khi xóa gói thành viên"))
    }

    const handleEditPackage = (p) => {
        navigate('/admin/membership/edit', { state: { data: p } });
    }


    return (
        <div>
            <Notification />
            <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
                <h5>Danh sách gói thành viên</h5>
                <Link
                    className="btn btn-primary"
                    to="/admin/membership/add"
                    style={{
                        fontSize: 'small',
                        backgroundColor: '#F87555',
                        border: 'none',
                    }}
                >
                    <i className="bi bi-plus-lg"></i>
                    <span className="m-1">Thêm</span>
                </Link>
            </div>
            {membership?.length > 0 ? (
                <Table style={{ fontSize: 'small', boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                    <thead>
                        <tr>
                            <th>Tên gói</th>
                            <th>Tạo ngày</th>
                            {/* <th>Người tạo</th> */}
                            <th>Thời hạn hết hạn gói</th>
                            <th>Giá</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {membership.map((m) => (
                            <tr key={m.id}>
                                <td className="align-middle">{m.nameSubscription}</td>
                                <td className="align-middle">{formatDate(m.createdAt)}</td>
                                {/* <td className="align-middle">{m?.userCreated?.email}</td> */}
                                <td className="align-middle">{m?.expireDate} tháng</td>
                                <td className="align-middle">{formatCurrency(m?.feeMember)}</td>
                                <td className="align-middle">
                                    <Button
                                        as={Button}
                                        onClick={() => handleEditPackage(m)}
                                        style={{
                                            fontSize: 'small',
                                            backgroundColor: '#fff',
                                            border: 'none',
                                            color: '#000',
                                            padding: '0'
                                        }}
                                    >
                                        <i className="bi bi-pen"></i>
                                        <span className='m-1'>Sửa</span>
                                    </Button>
                                    <Button
                                        as={Button}
                                        style={{
                                            fontSize: 'small',
                                            backgroundColor: '#fff',
                                            border: 'none',
                                            color: '#000',
                                            padding: '0',
                                            marginLeft: '5px'
                                        }}
                                        onClick={() => handleShowDeleteModal(m)}
                                    >
                                        <i className="bi bi-trash3"></i>
                                        <span className='m-1'>Xóa</span>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>) : (
                <p>Không có thành viên nào được tìm thấy</p>
            )}

            <CustomModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                title="Xác nhận xóa gói"
                handleSave={handleDeletePackage}
                submitting={submittingDelete}
                hasFooter={true}
            >
                <p>Bạn có chắc chắn muốn xóa danh mục <strong>{authorToDelete?.name}</strong> không?</p>
            </CustomModal>

        </div>
    )
}

export default Membership