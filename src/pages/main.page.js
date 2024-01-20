import "./main.page.css";
import NOT_FOUND_IMAGE from "../utils/not_found_image.png";

import React, { useState } from "react";
import { useQuery } from "react-query";

import { getPodNasa } from "../queries";
import Spinner from "../components/spinner/spinner.component";

const ImageCarousel = ({ data }) =>
  Array.isArray(data) ? (
    data.map((imageData) => (
      <div key={Math.random()} className="image-wrapper">
        <img src={imageData?.hdurl} alt={NOT_FOUND_IMAGE} />
      </div>
    ))
  ) : (
    <div className="image-wrapper">
      <img src={data?.hdurl} alt={NOT_FOUND_IMAGE} />
    </div>
  );

const Error = () => (
  <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>
    <p>Something went wrong... Please choose closer dates and try again</p>
  </div>
);

const MainPage = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const {
    data = null,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: "get.pod",
    queryFn: () => getPodNasa({ startDate, endDate }),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="date-picker-container">
        <label htmlFor="start-date">Start-date or precise day</label>
        <input
          id="start-date"
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="end-date">End-date</label>
        <input
          id="end-date"
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={() => refetch()}>Search</button>
      </div>
      {isLoading || isFetching ? (
        <Spinner />
      ) : isError ? (
        <Error />
      ) : (
        <ImageCarousel data={data?.data} />
      )}
    </>
  );
};

export default MainPage;
