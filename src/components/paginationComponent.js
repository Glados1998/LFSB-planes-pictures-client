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

/**
 * PaginationComponent renders a pagination UI for navigating between pages.
 *
 * @param {Object} props
 * @param {number} props.pageIndex - The current active page index (1-based).
 * @param {function} props.setPageIndex - Function to update the current page index.
 * @param {Object} props.pagination - Pagination data.
 * @param {number} props.pagination.pageCount - Total number of pages.
 * @returns {JSX.Element} The pagination component.
 */
const PaginationComponent = ({pageIndex, setPageIndex, pagination}) => {
    /**
     * Handles the click event for the "Previous" button.
     * Decrements the page index if not on the first page.
     *
     * @param {React.MouseEvent} event
     */
    const handlePrevious = () => {
        if (pageIndex > 1) {
            setPageIndex(pageIndex - 1);
        }
    };

    /**
     * Handles the click event for the "Next" button.
     * Increments the page index if not on the last page.
     *
     * @param {React.MouseEvent} event
     */
    const handleNext = () => {
        if (pageIndex < pagination.pageCount) {
            setPageIndex(pageIndex + 1);
        }
    };

    /**
     * Renders the page number buttons and ellipses based on the current page and total pages.
     *
     * @returns {JSX.Element[]} Array of pagination items.
     */
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
                    <PaginationPrevious
                        onClick={handlePrevious}
                        disabled={pageIndex <= 1}
                        aria-disabled={pageIndex <= 1}
                    />
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem>
                    <PaginationNext
                        onClick={handleNext}
                        disabled={pageIndex >= pagination.pageCount}
                        aria-disabled={pageIndex >= pagination.pageCount}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;
