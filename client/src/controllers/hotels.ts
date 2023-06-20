import { fetchResults, performHotelSearch } from "@/apis/hotels";
import { searchResults } from "@/entities/hotels";

export const searchHotels = async ({
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
  const data = await performHotelSearch({
    location,
    groupSize,
    toDate,
    fromDate,
  });
  console.log(data);
  return data;
};

export const getSearchResultsInterval = async () => {
  let numberOfPolls = 0;
  const intervalId = setInterval(async () => {
    numberOfPolls++;
    // We want to stop polling after server tells us it's done, or after 20 retries
    if (numberOfPolls > 20) clearInterval(intervalId);
    const results = await fetchResults();
    if (results.done) clearInterval(intervalId);
    searchResults.value = results.values;
  }, 1000);
};
