import React from 'react';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';

const Pagination = ({pageIndex, setPageIndex, pagination}) => {
    const handlePrevious = (event) => {
        event.preventDefault(); // Prevent default if inside a form
        if (pageIndex > 1) {
            setPageIndex(pageIndex - 1);
        }
    };

    const handleNext = (event) => {
        event.preventDefault(); // Prevent default if inside a form
        if (pageIndex < pagination.pageCount) {
            setPageIndex(pageIndex + 1);
        }
    };


    return (
        <div className={'gallery_footer pagination'}>
            <button className={"btn-pagination"} onClick={handlePrevious} disabled={pageIndex === 1}>
                <FaArrowLeft/>
            </button>
            <span>
                {`${pageIndex} sur ${pagination.pageCount}`}
            </span>
            <button className={"btn-pagination"} onClick={handleNext}
                    disabled={pageIndex === pagination.pageCount || pagination.pageCount === 0}>
                <FaArrowRight/>
            </button>
        </div>
    );
};

export default Pagination;
