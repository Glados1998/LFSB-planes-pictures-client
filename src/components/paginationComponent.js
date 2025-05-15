import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const PaginationComponent = ({pageIndex, setPageIndex, pagination}) => {
    const handlePrevious = (event) => {
        event.preventDefault();
        if (pageIndex > 1) {
            setPageIndex(pageIndex - 1);
        }
    };

    const handleNext = (event) => {
        event.preventDefault();
        if (pageIndex < pagination.pageCount) {
            setPageIndex(pageIndex + 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalPages = pagination.pageCount;

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={() => setPageIndex(i)}
                            isActive={i === pageIndex}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            if (pageIndex <= 3) {
                for (let i = 1; i <= 3; i++) {
                    pageNumbers.push(
                        <PaginationItem key={i}>
                            <PaginationLink
                                onClick={() => setPageIndex(i)}
                                isActive={i === pageIndex}
                            >
                                {i}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
                pageNumbers.push(<PaginationEllipsis key="ellipsis1"/>);
                pageNumbers.push(
                    <PaginationItem key={totalPages}>
                        <PaginationLink onClick={() => setPageIndex(totalPages)}>
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                );
            } else if (pageIndex >= totalPages - 2) {
                pageNumbers.push(
                    <PaginationItem key={1}>
                        <PaginationLink onClick={() => setPageIndex(1)}>1</PaginationLink>
                    </PaginationItem>
                );
                pageNumbers.push(<PaginationEllipsis key="ellipsis2"/>);
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    pageNumbers.push(
                        <PaginationItem key={i}>
                            <PaginationLink
                                onClick={() => setPageIndex(i)}
                                isActive={i === pageIndex}
                            >
                                {i}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
            } else {
                pageNumbers.push(
                    <PaginationItem key={1}>
                        <PaginationLink onClick={() => setPageIndex(1)}>1</PaginationLink>
                    </PaginationItem>
                );
                pageNumbers.push(<PaginationEllipsis key="ellipsis3"/>);
                for (let i = pageIndex - 1; i <= pageIndex + 1; i++) {
                    pageNumbers.push(
                        <PaginationItem key={i}>
                            <PaginationLink
                                onClick={() => setPageIndex(i)}
                                isActive={i === pageIndex}
                            >
                                {i}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
                pageNumbers.push(<PaginationEllipsis key="ellipsis4"/>);
                pageNumbers.push(
                    <PaginationItem key={totalPages}>
                        <PaginationLink onClick={() => setPageIndex(totalPages)}>
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        }

        return pageNumbers;
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={handlePrevious}/>
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem>
                    <PaginationNext onClick={handleNext}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;
