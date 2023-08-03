import './Pagination.scss'

type PaginateProps = {
    adsPerPage: number; 
    totalAds: number;
    paginate: (params: any) => any;
    currentPage: number;
    previousPage:(params: any) => any;
    nextPage: (params: any) => any
}

export default function Pagination ({ adsPerPage, totalAds, paginate, currentPage, previousPage, nextPage }: PaginateProps) {
   const pageNumbers = [];
 
   for (let i = 1; i <= Math.ceil(totalAds / adsPerPage); i++) {
      pageNumbers.push(i);
   };

 
   return (
      <div className="pagination-container">
            <ul className="pagination">
				<li onClick={previousPage} className="page-number">
					Prev
				</li>
				{pageNumbers.map((number) => (
					<li
						key={number}
						onClick={() => paginate(number)}
						className={
							'page-number ' + (number === currentPage ? 'active' : '')
						}
					>
						{number}
					</li>
				))}
				<li onClick={nextPage} className="page-number">
					Next
				</li>
			</ul>
      </div>
   );
};
 