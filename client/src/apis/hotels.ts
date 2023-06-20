import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const performHotelSearch = async ({
  location,
  groupSize,
  toDate,
  fromDate,
}: {
  location: string;
  groupSize: number;
  toDate: string;
  fromDate: string;
}) => {
  const response = await axios.get(`${BASE_URL}/hotels/search`, {
    params: {
      location,
      groupSize,
      toDate,
      fromDate,
    },
  });
  return response.data;
};

export const fetchResults = async () => {
  const response = await axios.get(`${BASE_URL}/hotels/fetch-results`);
  return response.data;
};
