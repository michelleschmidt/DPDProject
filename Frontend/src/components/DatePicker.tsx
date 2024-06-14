import React, { useEffect, useRef, useState } from "react";

interface Props {
  setDate: (date: Date) => void;
  initialDate: Date;
}

const DatePicker = (props: Props) => {
  const MONTH_NAMES: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const DAYS: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerValue, setDatepickerValue] = useState<Date>(
    props.initialDate
  );

  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState<number[]>([]);
  const [blankDays, setBlankDays] = useState<number[]>([]);

  useEffect(() => {
    getNoOfDays();
  }, []);

  useEffect(() => {
    getNoOfDays();
  }, [month, year]);

  useEffect(() => {
    // event handler, closes datepicker if clicked outside of datepicker container
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".datepicker-container")) {
        setShowDatepicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isToday = (date: number): boolean => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const getDateValue = (date: number): void => {
    let selectedDate = new Date(year, month, date);
    setDatepickerValue(selectedDate);
    props.setDate(selectedDate);
    setShowDatepicker(false);
  };

  const getNoOfDays = (): void => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    let dayOfWeek = new Date(year, month, 1).getDay();
    let blankDaysArray: number[] = [];
    for (let i = 0; i < dayOfWeek; i++) {
      blankDaysArray.push(i);
    }
    let daysArray: number[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    setBlankDays(blankDaysArray);
    setNoOfDays(daysArray);
  };

  const dateRef = useRef<HTMLInputElement>(null);

  return (
    <div className="h-flex w-72 flex items-center justify-center z-40">
      <div className="antialiased sans-serif font-montserrat">
        <div className="flex w-72 mt-3">
          <div className="relative w-full">
            <input type="hidden" name="date" ref={dateRef} />
            <input
              type="text"
              readOnly
              value={datepickerValue?.toDateString()}
              onClick={() => setShowDatepicker(!showDatepicker)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setShowDatepicker(false);
              }}
              className=" w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              placeholder="Select date"
            />

            <div
              className="absolute top-0 right-0 px-3 py-2"
              onClick={() => setShowDatepicker(!showDatepicker)}
            >
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            {showDatepicker && (
              <div
                className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0 datepicker-container"
                style={{ width: "17rem" }}
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-lg font-bold text-gray-800">
                      {MONTH_NAMES[month]}
                    </span>
                    <span className="ml-1 text-lg text-gray-600 font-normal">
                      {year}
                    </span>
                  </div>
                  <div>
                    <button
                      type="button"
                      className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full ${
                        month === new Date().getMonth() &&
                        year === new Date().getFullYear()
                          ? "cursor-not-allowed opacity-25"
                          : ""
                      }`}
                      disabled={
                        month === new Date().getMonth() &&
                        year === new Date().getFullYear()
                      }
                      onClick={() => {
                        if (month === 0) {
                          setYear(year - 1);
                          setMonth(11);
                        } else {
                          setMonth(month - 1);
                        }
                      }}
                    >
                      <svg
                        className="h-6 w-6 text-gray-500 inline-flex"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full`}
                      onClick={() => {
                        if (month === 11) {
                          setYear(year + 1);
                          setMonth(0);
                        } else {
                          setMonth(month + 1);
                        }
                      }}
                    >
                      <svg
                        className="h-6 w-6 text-gray-500 inline-flex"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap mb-3 -mx-1">
                  {DAYS.map((day, index) => (
                    <div
                      style={{ width: "14.26%" }}
                      className="px-1"
                      key={index}
                    >
                      <div className="text-gray-800 font-medium text-center text-xs">
                        {day}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap -mx-1">
                  {blankDays.map((_, index) => (
                    <div
                      style={{ width: "14.28%" }}
                      className="text-center border p-1 border-transparent text-sm"
                      key={index}
                    ></div>
                  ))}
                  {noOfDays.map((date, dateIndex) => (
                    <div
                      style={{ width: "14.28%" }}
                      className="px-1 mb-1"
                      key={dateIndex}
                    >
                      <div
                        onClick={() => getDateValue(date)}
                        className={`cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 ${
                          isToday(date)
                            ? "bg-primary-900 text-white"
                            : "text-gray-700 hover:bg-blue-200"
                        }`}
                      >
                        {date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
