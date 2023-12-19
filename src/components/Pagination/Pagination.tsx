import ReactPaginate from "react-paginate";

type Props = {
  handlePageClick: (event: any) => void;
  pageCount?: number;
};

export default function PagePagination({ handlePageClick, pageCount }: Props) {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageCount={pageCount || 7}
        previousLabel="<"
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
}
