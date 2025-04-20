import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ExplorePage = () => {
  const { explore } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`/discover/${explore}`, {
        params: { page: pageNo },
      });

      setData(prev => [...prev, ...response.data.results]);
      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, [explore, pageNo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (isBottom && pageNo < totalPageNo) {
        setPageNo(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageNo, totalPageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
  }, [explore]);

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Popular {explore} show
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((item) => (
            <Card
              key={item.id + "_explore"}
              data={item}
              media_type={explore}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
