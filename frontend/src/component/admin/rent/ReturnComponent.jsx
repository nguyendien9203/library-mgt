import React, { useEffect, useState } from 'react';
import { getLoansWithReturningStatus, returnLoan } from '../../../service/RentService';
import useNotification from '../../../hooks/useNotification';
import { Button, Table, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Notification from '../../common/Notification';
import './RentComponent.css'; // Import the CSS file here

const ReturnComponent = () => {
    const [rentReturn, setRentReturn] = useState([]);
    const { showError, showSuccess } = useNotification();
    const [tmp, setTmp] = useState(false);

    useEffect(() => {
        fetchLoanReturn();
    }, [tmp]);

    const formatDateTime = (dateString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('sv-SE');
        const formattedTime = date.toLocaleTimeString('sv-SE', { hour12: false });
        return `${formattedDate} ${formattedTime}`;
    };

    const fetchLoanReturn = async () => {
        await getLoansWithReturningStatus()
            .then(res => {
                if (res?.code === 200) {
                    setRentReturn(res?.data);
                }
            })
            .catch(err => {
                console.error("Lỗi khi lấy danh sách trả sách:", err);
                showError('Lỗi khi lấy danh sách trả sách');
            });
    };

    const handleApprove = async (loanId, bookCopyId) => {
        const body = { loanId: loanId, bookCopyId: bookCopyId, note: '' };
        await returnLoan(body).then(res => {
            if (res?.code === 200) {
                setTmp(!tmp);
            }
        }).catch(err => {
            showError("Lỗi khi đồng ý trả sách");
            console.log(err);
        });
    };

    return (
        <div>
            <Notification />
            <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
                <h5>Danh sách đồng ý trả sách</h5>
            </div>
            {rentReturn?.length > 0 ? (
                <Table style={{ fontSize: 'small', boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                    <thead>
                        <tr>
                            <th>Tên người thuê</th>
                            <th>Tên sách</th>
                            <th>Mã cho thuê</th>
                            <th>Ngày cho thuê</th>
                            <th>Ngày trả</th>
                            <th>Ngày quá hạn trả sách</th>
                            <th>Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentReturn?.map((r, idx) => (
                            <tr key={idx}>
                                <td className="align-middle">{r?.userName}</td>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id={`tooltip-${idx}`} className="custom-tooltip">{r?.bookCopyResponse?.title}</Tooltip>}
                                >
                                    <td className="align-middle" style={{ maxWidth: '200px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {r?.bookCopyResponse?.title}
                                    </td>
                                </OverlayTrigger>
                                <td className="align-middle">{r?.bookCopyResponse?.barcode}</td>
                                <td className="align-middle">{formatDateTime(r?.borrowAt)}</td>
                                <td className="align-middle">{formatDateTime(r?.returnAt)}</td>
                                <td className="align-middle">{formatDateTime(r?.dueDate)}</td>
                                <td className="align-middle">{r?.status}</td>
                                <td className="align-middle">
                                    <Button
                                        as={Button}
                                        onClick={() => handleApprove(r?.loanId, r?.bookCopyResponse?.id)}
                                        style={{
                                            fontSize: 'small',
                                            backgroundColor: '#fff',
                                            border: 'none',
                                            color: '#000',
                                            padding: '0'
                                        }}
                                    >
                                        <i className="bi bi-check-lg"></i>
                                        <span className='m-1'>Chấp nhận</span>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>Không có yêu cầu trả sách nào được tìm thấy</p>
            )}
        </div>
    );
};

export default ReturnComponent;
