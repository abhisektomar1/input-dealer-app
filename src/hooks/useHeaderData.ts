// useHeaderData.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../service/AxiosInstance';

export const useHeaderData = () => {
  const [headerData, setHeaderData] = useState<any>();

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axiosInstance.post(`/GetFPODetails`);
        setHeaderData(response.data);
      } catch (error) {
        console.error('Error fetching header data:', error);
      }
    };

    fetchHeaderData();
  }, []);

  return headerData;
};