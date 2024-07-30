import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import CustomModal from './CustomModal';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import { useAuth } from '../../component/context/AuthContext';
import { addBookCopy, updateBookCopy, deleteBookCopy } from '../../service/BookCopyService';
import Notification from '../../component/common/Notification.jsx';
import useNotification from '../../hooks/useNotification.js';
import { rejectLoan, returningLoan } from '../../service/RentService.js';

const CopiesTab = ({ bookId, bookCopies, fetchBookDetail }) => {
    const { isUserAuthenticated, isMember, isLibrarian, user } = useAuth();
    const [authenticated, setAuthenticated] = useState(isUserAuthenticated());
    const [member, setMember] = useState(isMember);
    const [librarian, setLibrarian] = useState(isLibrarian);
    const { showError, showSuccess } = useNotification();
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'edit', 'add', 'delete'
    const [selectedCopy, setSelectedCopy] = useState(null);

    useEffect(() => {
        setAuthenticated(isUserAuthenticated());
        setMember(isMember);
        setLibrarian(isLibrarian);
    }, [isUserAuthenticated, isMember, isLibrarian]);

    const userId = user ? user.id : null;

    const [formData, setFormData] = useState({
        userId: userId,
        bookId: bookId,
        barcode: '',
        status: 'AVAILABLE',
    });

    useEffect(() => {
        setFormData({
            userId: userId,
            bookId: bookId,
            barcode: '',
            status: 'AVAILABLE',
        });
    }, [bookId]);


    const handleAdd = async () => {
        setSubmitting(true);
        const timer = new Promise((resolve) => setTimeout(resolve, 2000));

        try {
            const response = await addBookCopy(formData);

            await timer;

            if (response.status === 201) {
                fetchBookDetail();
                // showSuccess(response.message);
            } else {
                showError(response.message);
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Thêm mới bản sao thất bại');
        } finally {
            setSubmitting(false);
            handleCloseModal();
        }
    };

    const handleEdit = async () => {

        if (!selectedCopy || !selectedCopy.id) {
            console.error('Selected copy is null or has no ID');
            return;
        }

        setSubmitting(true);
        const timer = new Promise((resolve) => setTimeout(resolve, 2000));


        try {
            const response = await updateBookCopy(selectedCopy.id, formData);

            await timer;

            if (response.status === 200) {
                fetchBookDetail();
                // showSuccess(response.message);
            } else {
                showError(response.message);
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Cập nhật bản sao thất bại');
        } finally {
            setSubmitting(false);
            handleCloseModal();
        }
    };

    const handleDelete = async () => {
        if (!selectedCopy || !selectedCopy.id) {
            console.error('Selected copy is null or has no ID');
            return;
        }
        setSubmitting(true);
        const timer = new Promise((resolve) => setTimeout(resolve, 2000));


        try {
            const response = await deleteBookCopy(selectedCopy.id);
            await timer;

            if (response.status === 200) {
                fetchBookDetail();
                // showSuccess(response.message);
            } else {
                showError(response.message);
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Xóa bản sao thất bại');
        } finally {
            setSubmitting(false);
            handleCloseModal();
        }
    };

    const handleReturn = async () => {
        if (!selectedCopy || !selectedCopy.id) {
            console.error('Selected copy is null or has no ID');
            return;
        }
        // setSubmitting(true);
        console.log('hehe', selectedCopy);
        const body = {
            loanId: selectedCopy?.loanInfo[selectedCopy?.loanInfo.length - 1]?.loanId,
            bookCopyId: selectedCopy?.id,
            note: ''
        }
        await returningLoan(body).then(resp => {
            if (resp?.code === 200) {
                fetchBookDetail();
                setSubmitting(false);
                handleCloseModal();
            }
        }).catch(err => showError('Lỗi khi trả sách'))
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;
    };


    const handleAction = async () => {
        switch (modalType) {
            case 'add':
                await handleAdd();
                break;
            case 'edit':
                await handleEdit();
                break;
            case 'delete':
                await handleDelete();
                break;
            case 'return':
                await handleReturn();
                break;
            default:
                break;
        }
    };

    const handleShowModal = (type, copy = null) => {
        setModalType(type);
        setShowModal(true);
        setSelectedCopy(copy);
        if (copy) {
            setFormData({
                userId: user.id,
                bookId: bookId,
                barcode: copy.barcode,
                status: copy.status,
            });
        } else {
            setFormData({
                userId: user.id,
                bookId: bookId,
                barcode: '',
                status: 'AVAILABLE',
            });
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCopy(null);
        setFormData({
            userId: user.id,
            bookId: bookId,
            barcode: '',
            status: 'AVAILABLE',
        });
    };
    // console.log(bookCopies);
    const statusOptions = [
        { name: 'Có sẵn', value: 'AVAILABLE' },
        { name: 'Đang được mượn', value: 'BORROWED' },
        { name: 'Hết sách', value: 'OUT_OF_STOCK' },
        { name: 'Hỏng', value: 'DAMAGED' },
        { name: 'Đã mất', value: 'LOST' },
    ];

    console.log('Book copies in copy:', bookCopies);

    return (
        <div style={{ margin: '20px 0' }}>
            <Notification />

            {/* {librarian && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 0' }}>
                    <Button
                        style={{
                            fontSize: 'small',
                            backgroundColor: '#F87555',
                            border: 'none',
                        }}
                        onClick={() => handleShowModal('add')}
                    >
                        <i className="bi bi-plus-lg"></i>
                        <span className="m-2">Thêm</span>
                    </Button>
                </div>
            )} */}

            {bookCopies && bookCopies.length > 0 ? (
                <Table style={{ fontSize: 'small' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã cho thuê</th>
                            {librarian && <th>Thời gian sửa đổi</th>}
                            {librarian && <th>Người sửa đổi</th>}
                            <th>Trạng thái</th>
                            {member && <th>Lí do</th>}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookCopies.map((copy, index) => (
                            copy && (
                                <tr key={index}>
                                    <td className="align-middle">{index + 1}</td>
                                    <td className="align-middle">{copy.barcode}</td>
                                    {librarian && <td className="align-middle">{copy.updatedAt}</td>}
                                    {librarian && <td className="align-middle">{copy.updatedBy}</td>}
                                    <td className="align-middle">{copy.status}</td>
                                    {copy?.status == 'REJECT' ? (<td className="align-middle">{copy?.loanInfo[copy?.loanInfo?.length - 1]?.note}</td>) : (
                                        <td className="align-middle"></td>
                                    )}
                                    {copy?.status == 'ACTIVE' ? (<td className="align-middle">
                                        <Button
                                            style={{
                                                fontSize: 'small',
                                                backgroundColor: '#fff',
                                                border: 'none',
                                                color: '#000',
                                                padding: '0',
                                            }}
                                            onClick={() => handleShowModal('return', copy)}
                                        >
                                            <i class="bi bi-arrow-return-left"></i>
                                            <span className="m-1">Trả sách</span>
                                        </Button>
                                    </td>) : (
                                        <td className="align-middle"></td>
                                    )}
                                    {librarian && (
                                        <td className="align-middle">
                                            <Button
                                                style={{
                                                    fontSize: 'small',
                                                    backgroundColor: '#fff',
                                                    border: 'none',
                                                    color: '#000',
                                                    padding: '0',
                                                }}
                                                onClick={() => handleShowModal('edit', copy)}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                                <span className="m-1">Sửa</span>
                                            </Button>
                                            <Button
                                                style={{
                                                    fontSize: 'small',
                                                    backgroundColor: '#fff',
                                                    border: 'none',
                                                    color: '#000',
                                                    marginLeft: '5px',
                                                    padding: '0',
                                                }}
                                                onClick={() => handleShowModal('delete', copy)}
                                            >
                                                <i className="bi bi-trash3"></i>
                                                <span className="m-1">Xóa</span>
                                            </Button>
                                        </td>
                                    )}
                                </tr>
                            )
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div style={{ fontSize: 'small' }}>Chưa có bản sao sách nào</div>
            )}

            {/* Edit, Add, Delete Modal */}
            <CustomModal
                show={showModal}
                handleClose={handleCloseModal}
                title={modalType === 'add' ? 'Thêm mới' : modalType === 'edit' ? 'Cập nhật' : modalType === 'return' ? 'Trả sách' : 'Xác nhận'}
                handleSave={handleAction}
                submitting={submitting}
                hasFooter={true}
            >
                {(modalType !== 'delete' && modalType !== 'return') && (
                    <>
                        <TextInput
                            label="Barcode"
                            name="barcode"
                            value={formData.barcode}
                            onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                            onBlur={handleBlur}
                            type="text"
                            placeholder="Nhập Barcode"
                        />
                        <SelectInput
                            label="Trạng thái"
                            name="status"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            placeholder="Chọn trạng thái"
                            data={statusOptions}
                        />
                    </>
                )}
                {modalType === 'delete' && modalType !== 'return' && <p>Bạn có chắc chắn muốn xóa bản sao sách này?</p>}
                {modalType === 'return' && <p>Bạn có chắc là muốn trả sách</p>}
            </CustomModal>
        </div>
    );
};

export default CopiesTab;
