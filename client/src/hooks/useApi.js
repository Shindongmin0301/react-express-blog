import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const useApi = ({ url, params }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(url, { params });
      setLoading(true);
      try {
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};

export default useApi;
