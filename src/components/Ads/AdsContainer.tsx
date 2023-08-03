import { useState } from "react";
import "./Ads.scss";
import AdCard from "./AdCard";
import Pagination from "../Pagination/Pagination";

// type AdProp  = {
//     id: string, 
//     title: string, 
//     img: string, 
//     type: string
// }
type AdsProps = {
    adsData: []
} 

export default function AdsContainer({ adsData }: AdsProps) {

  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(12);

  const indexOfLastRecord = currentPage * adsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - adsPerPage;
  const currentAds = adsData.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(adsData.length / adsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="flats">
        {
          adsData &&
            currentAds.map((ad: any, index: any) => <AdCard key={index} {...ad} />)
        }
      </div>
        <Pagination
          adsPerPage={adsPerPage}
          totalAds={adsData.length}
          paginate={paginate}
          currentPage={currentPage}
          previousPage={previousPage}
          nextPage={nextPage}
        />
    </>
  );
}
