import React, { useState, useEffect } from 'react';
import BookCard from '../../common/BookCard';
import { Button, Nav } from 'react-bootstrap';
import './MyShelf.css';
import { getLoansByUserIdAndStatus } from '../../../service/RentService';
import { getBookImage } from '../../../service/BookService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { returningLoan } from '../../../service/RentService';
import CustomModal from '../../common/CustomModal';
import useNotification from '../../../hooks/useNotification';
import Notification from '../../common/Notification';


const MyShelf = () => {
  const [loans, setLoans] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCopy, setSelectedCopy] = useState(null);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { showError } = useNotification();

  const statuses = [
    { name: 'Tất cả', value: '' },
    { name: 'Đang mượn', value: 'ACTIVE' },
    { name: 'Đang xác nhận', value: 'PENDING' },
    { name: 'Đang trả', value: 'RETURNING' },
    { name: 'Đã trả', value: 'RETURNED' },
    { name: 'Bị từ chối', value: 'REJECT' }
  ]

  const fetchLoans = async (status) => {
    try {
      const response = await getLoansByUserIdAndStatus(user.id, status);
      if (response.code === 200) {
        const loanBookWithImage = await Promise.all(
          response.data.map(async (loan) => {
            try {
              const imageResponse = await getBookImage(loan.bookCopyResponse.bookResponse.id);
              console.log('Image response:', imageResponse);
              if (imageResponse.status === 200) {
                const contentDisposition = imageResponse.headers['content-disposition'];
                console.log('Content-Disposition:', contentDisposition);
                let fileName = 'unknown';
                if (contentDisposition) {
                  const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                  if (fileNameMatch.length === 2) {
                    fileName = fileNameMatch[1];
                  }
                }

                const file = new File([imageResponse.data], fileName, { type: imageResponse.data.type });
                console.log('File:', file);
                const imageUrl = URL.createObjectURL(file);
                return {
                  ...loan,
                  imageUrl,
                };
              } else {
                console.error(imageResponse.statusText);
                return { ...loan, imageUrl: null };
              }
            } catch (error) {
              console.error('Failed to fetch book image:', error);
              return { ...loan, imageUrl: null };
            }
          }));
        setLoans(loanBookWithImage);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error('Failed to fetch loans:', error);
    }
  };

  useEffect(() => {
    fetchLoans(selectedStatus);
  }, [selectedStatus]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    navigate(`#${status}`);
  };

  const getStatusName = (status) => {
    const statusItem = statuses.find((item) => item.value === status);
    return statusItem ? statusItem.name : 'Unknown';
  };

  const handleReturn = async () => {

    console.log('Selected copy:', selectedCopy);
    console.log('Selected loan:', selectedLoan);
    if (!selectedCopy) {
      console.error('Selected copy is null or has no ID');
      return;
    }
    if (!selectedLoan) {
      console.error('Selected loan is null or has no ID');
      return;
    }

    setSubmitting(true);
    const timer = new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('hehe', selectedCopy);
    const body = {
      loanId: selectedLoan,
      bookCopyId: selectedCopy,
      note: ''
    }

    try {
      const response = await returningLoan(body);
      await timer;

      if (response.code === 200) {
        fetchLoans(selectedStatus);
        handleCloseModal();
      } else {
        showError("Lỗi khi trả sách");
      }
    } catch (error) {
      console.error('Failed to return book:', error);
      showError("Lỗi khi trả sách");
    } finally {
      setSubmitting(false);
    }

  }

  const handleShowModal = (loadId, bookCopyId) => {

    console.log('Selected copy:', bookCopyId);
    console.log('Selected loan:', loadId);
    setShowModal(true);
    setSelectedCopy(bookCopyId);
    setSelectedLoan(loadId);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCopy(null);
    setSelectedLoan(null);
  }


  return (
    <div>
      <Notification />
      <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '20px' }}>
        <h5>Sách của tôi</h5>
      </div>
      <Nav variant="tabs" className="mb-3">
        {statuses.map((status, index) => (
          <Nav.Item key={index}>
            <Nav.Link
              active={status.value === selectedStatus}
              onClick={(e) => {
                e.preventDefault();
                handleStatusChange(status.value);
              }}
              style={{
                backgroundColor: 'transparent',
                color: '#000',
                fontSize: 'small',
              }}
            >
              {status.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <div className="book-shelf">
        {loans.map((loan) => (
          <div key={loan.loanId} className="book-shelf-item">
            <div
              className='d-flex'
              style={{
                backgroundColor: '#fff',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                width: 'auto',
                padding: '5px',
              }}
            >
              <BookCard
                bookId={loan.bookCopyResponse.bookResponse.id}
                imageUrl={loan.imageUrl}
                mode="info"
                title={loan.bookCopyResponse.bookResponse.title}
                authors={loan.bookCopyResponse.bookResponse.authors}
                publicationYear={loan.bookCopyResponse.bookResponse.publicationYear}
                rating={loan.bookCopyResponse.bookResponse.rating}
                cardWidth="auto"
                cardPadding="10px"
              />
              <div style={{ padding: '10px' }} className='d-flex flex-column justify-content-between'>
                <div>
                  <div style={{ fontSize: 'small', margin: '0' }}>
                    <div style={{ fontSize: 'small' }}>Mã cho thuê</div>
                    <div style={{ fontSize: 'x-small' }}>{loan.bookCopyResponse.barcode}</div>
                  </div>
                  <div style={{ fontSize: 'small', marginTop: '3px' }}>
                    <div style={{ fontSize: 'small' }}>Ngày mượn</div>
                    <div style={{ fontSize: 'x-small' }}>{loan.borrowAt}</div>
                  </div>
                  <div style={{ fontSize: 'small', marginTop: '3px' }}>
                    <div style={{ fontSize: 'small' }}>Ngày hạn trả</div>
                    <div style={{ fontSize: 'x-small' }}>{loan.returnAt}</div>
                  </div>
                  <div style={{ fontSize: 'small', marginTop: '3px' }}>
                    <div style={{ fontSize: 'small' }}>Trạng thái</div>
                    <div style={{ fontSize: 'x-small' }}>{getStatusName(loan.status)}</div>
                  </div>
                </div>
                {loan.status === 'ACTIVE' && (
                  <Button
                    style={{
                      width: '100%',
                      border: '1px solid #F87555',
                      backgroundColor: 'transparent',
                      color: '#F87555',
                      fontSize: 'small',
                      borderRadius: '5px',
                      marginTop: '5px',
                    }}
                    onClick={() => handleShowModal(loan.loanId, loan.bookCopyResponse.id)}
                  >Trả sách</Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <CustomModal
        show={showModal}
        title="Trả sách"
        handleClose={handleCloseModal}
        handleSave={handleReturn}
        submitting={submitting}
        hasFooter={true}
      >
        <p>Bạn có chắc muốn trả sách </p>
      </CustomModal>
    </div>
  );
};

export default MyShelf;
