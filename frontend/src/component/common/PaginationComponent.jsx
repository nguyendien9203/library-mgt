import React from 'react';
import { Pagination } from 'react-bootstrap';
import '../../assets/style/Pagination.css';

const PaginationComponent = ({ pageNo, totalPages, onPageChange }) => {
    const handleClick = (page) => {
        if (page !== pageNo && page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const generatePaginationItems = () => {
        const items = [];
        for (let page = 1; page <= totalPages; page++) {
            items.push(
                <Pagination.Item key={page} active={page === pageNo} onClick={() => handleClick(page)}>
                    {page}
                </Pagination.Item>
            );
        }
        return items;
    };

    return (
        <Pagination className="justify-content-center">
            <Pagination.Prev onClick={() => handleClick(pageNo - 1)} disabled={pageNo === 1} />
            {generatePaginationItems()}
            <Pagination.Next onClick={() => handleClick(pageNo + 1)} disabled={pageNo === totalPages} />
        </Pagination>
    );
};

export default PaginationComponent;
