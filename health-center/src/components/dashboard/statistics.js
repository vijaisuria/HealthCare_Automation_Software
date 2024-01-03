import React, { useState, useEffect } from "react";
import axios from "../../services/api";

const Statistics = () => {
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [completedPercent, setCompletedPercent] = useState(0);
  const [showTodaysStatistics, setShowTodaysStatistics] = useState(false);
  const [todaysCompleted, setTodaysCompleted] = useState(0);
  const [todaysPending, setTodaysPending] = useState(0);
  const [todayCompletedPercent, setTodayCompletedPercent] = useState(0);

  useEffect(() => {
    // Fetch nurse requests data from the backend API
    axios
      .get("/prescription") // Replace with your backend API endpoint for nurse requests
      .then((response) => {
        const prescriptionData = response.data;

        // Compute the variables after fetching the data
        const completedRequests = prescriptionData.filter(
          (request) => request.isCompleted === true
        );
        const pendingRequests = prescriptionData.filter(
          (request) => request.isCompleted === false
        );
        const totalRequests = prescriptionData.length;
        setCompleted(completedRequests.length);
        setPending(pendingRequests.length);
        setCompletedPercent(
          ((completedRequests.length / totalRequests) * 100).toFixed(2)
        );

        // Calculate today's statistics
        const today = new Date().toLocaleDateString("en-US");
        const todaysRequests = prescriptionData.filter(
          (request) =>
            new Date(request.date).toLocaleDateString("en-US") === today
        );
        const todaysCompletedRequests = todaysRequests.filter(
          (request) => request.isCompleted === true
        );
        const todaysPendingRequests = todaysRequests.filter(
          (request) => request.isCompleted === false
        );
        setTodaysCompleted(todaysCompletedRequests.length);
        setTodaysPending(todaysPendingRequests.length);
        setTodayCompletedPercent(
          (
            (todaysCompletedRequests.length / todaysRequests.length) *
            100
          ).toFixed(2)
        );
      })
      .catch((error) => {
        console.error("Error fetching nurse requests:", error);
      });
  }, []);

  const handleToggleStatistics = () => {
    setShowTodaysStatistics((prevState) => !prevState);
  };

  return (
    <div className="flex flex-wrap -mx-3 mb-5">
      <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-green-500 border-0 bg-clip-border rounded-2xl mb-5 draggable">
          <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
            <div className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/normal text-dark">
              <span className="text-white text-5xl/none font-semibold mr-2 tracking-[-0.115rem]">
                {showTodaysStatistics ? todaysCompleted : completed}
              </span>
              <span className="pt-1 font-medium text-white/80 text-lg/normal">
                Completed Requests
              </span>
            </div>
            <div className="flex flex-col items-end justify-center m-2 mr-0 font-medium text-xl/normal text-dark">
              <div className="text-white text-3xl/none font-semibold mr-2">
                <label htmlFor="stat">
                  <span>
                    {showTodaysStatistics
                      ? "Today's Statistics"
                      : "Overall Statistics"}
                  </span>

                  <input
                    title="switch between statistics"
                    type="checkbox"
                    className="ml-2 mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                    checked={showTodaysStatistics}
                    role="switch"
                    id="stat"
                    onChange={handleToggleStatistics}
                  />
                </label>
              </div>
              <span className="pt-1 font-medium text-white/80 text-lg/normal">
                Total Count:{" "}
                {showTodaysStatistics
                  ? todaysCompleted + todaysPending
                  : completed + pending}
              </span>
            </div>
          </div>
          <div className="flex items-end flex-auto py-8 pt-0 px-9">
            <div className="flex flex-col items-center w-full mt-3">
              <div className="flex justify-between w-full mt-auto mb-2 font-semibold text-white/80 text-lg/normal">
                <span className="mr-4">
                  {showTodaysStatistics ? todaysPending : pending} Pending
                </span>
                <span>
                  {showTodaysStatistics
                    ? todayCompletedPercent
                    : completedPercent}
                  %
                </span>
              </div>
              <div className="mx-3 rounded-2xl h-[8px] w-full bg-white/20">
                <div
                  className="rounded-2xl bg-white"
                  style={{
                    width: showTodaysStatistics
                      ? `${todayCompletedPercent}%`
                      : `${completedPercent}%`,
                    height: "8px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
