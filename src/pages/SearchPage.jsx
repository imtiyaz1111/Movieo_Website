import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const query = new URLSearchParams(location.search).get('q');

  const fetchData = async () => {
    if (!query) return;

    try {
      const response = await axios.get(`search/multi`, {
        params: { query, page },
      });

      setData(prev => [...prev, ...response.data.results]);
    } catch (error) {
      console.error('Search fetch error:', error);
    }
  };

  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    if (page > 1) fetchData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="py-16">
      <div className="lg:hidden my-2 mx-1 sticky top-[70px] z-30">
        <input
          type="text"
          placeholder="Search here..."
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query?.replace(/%20/g, ' ') || ''}
          className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900"
        />
      </div>

      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">Search Results</h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((item, index) => (
            <Card
              data={item}
              key={`${item.id}-${item.media_type}-search-${index}`}
              media_type={item.media_type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
