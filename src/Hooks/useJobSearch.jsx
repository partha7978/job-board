import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addBackupItem,
  addItem,
  clearItem,
  addTotalCount,
  clearTotalCount,
} from "../Store/jobSlice";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const useJobSearch = (limit) => {
  const dispatch = useDispatch();

  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    dispatch(clearItem());
    dispatch(clearTotalCount());

    const body = JSON.stringify({
      limit: limit,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setJobData(data);
        setHasMore(data.totalCount);
        setLoading(false);
        console.log(data, "jobData");
      })
      .catch((error) => setError(error));
  }, [limit]);

  useEffect(() => {
    dispatch(clearItem());
    dispatch(addItem(jobData.jdList));
    dispatch(addTotalCount(jobData.totalCount));
    dispatch(addBackupItem(jobData.jdList));
  }, [jobData, dispatch]);

  return { jobData, loading, error, hasMore };
};

export default useJobSearch;
