import React from 'react';
import UsageItemComponent from './UsageItemComponent';
import '../../assets/style/UsageComponent.css';

const UsageComponent = ({ loanStatistic }) => {
    const { booksPending, booksReturning, booksBorrowedToday, booksReturnedToday, booksRejectedToday } = loanStatistic;
    return (
        <div className='d-block' style={{width: '70%'}}>
            <h6>Mượn/trả sách</h6>
            <div className="usage-component">
                <UsageItemComponent title="Yêu cầu mượn sách" value={booksPending} icon="bi-book" link="/admin/rent" />
                <UsageItemComponent title="Yêu cầu trả sách" value={booksReturning} icon="bi-check" link="/admin/book/return" />
                <UsageItemComponent title="Sách đã mượn hôm nay" value={booksBorrowedToday} icon="bi-clock" link="/books-borrowed-today" />
                <UsageItemComponent title="Sách đã trả hôm này" value={booksReturnedToday} icon="bi-calendar-day" link="/books-returned-today" />
                <UsageItemComponent title="Sách đã từ chối hôm nay" value={booksRejectedToday} icon="bi-x-circle" link="/books-rejected" />
            </div>
        </div>

    );
};

export default UsageComponent;
