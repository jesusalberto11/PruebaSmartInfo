import "../../../styles/shared/calendar/MiniCalendar.css";
import { useEffect, useMemo, useState } from "react";
import SimpleButton from "../buttons/SimpleButton";
import { SVG_ICONS } from "../../../helpers/svgIcons";
import {
  getCurrentMonthNameByIndex,
  getFirstDayOfTheMonth,
  getWeekDaysShort,
  totalDaysOfMonth,
} from "../../../helpers/dateParser";

const WORKED_DAYS = [
  {
    id: 0,
    date: "07/08/2024",
    day: 7,
    month: 8,
    year: 2024,
  },
  {
    id: 1,
    date: "09/08/2024",
    day: 9,
    month: 8,
    year: 2024,
  },
  {
    id: 2,
    date: "02/08/2024",
    day: 2,
    month: 8,
    year: 2024,
  },
  {
    id: 3,
    date: "07/08/2024",
    day: 8,
    month: 8,
    year: 2024,
  },
  {
    id: 4,
    date: "07/08/2024",
    day: 8,
    month: 7,
    year: 2024,
  },
];

const MiniCalendar = () => {
  const [calendar, setCalendar] = useState<Array<any>>([]);

  const currentYear = new Date().getFullYear();
  const [currentYearIndex, setCurrentYearIndex] = useState(0);

  const currentMonth = new Date().getMonth();
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);
  const [currentMonthName, setCurrentMonthName] = useState<string>("");

  const weekDays = getWeekDaysShort();
  const currentDay = new Date().getDate();

  useEffect(() => {
    setCurrentYearIndex(new Date().getFullYear());
    setCurrentMonthIndex(new Date().getMonth());
    setCurrentMonthName(getCurrentMonthNameByIndex(new Date().getMonth()));

    initCalendar();
  }, []);

  useEffect(() => {
    setCurrentMonthName(getCurrentMonthNameByIndex(currentMonthIndex));

    const firstDaysOfTargetMonth = getFirstDayOfTheMonth(
      currentYearIndex,
      currentMonthIndex
    );

    const daysOfTargetMonth = totalDaysOfMonth(
      currentYearIndex,
      currentMonthIndex + 1
    );

    clearCalendar();

    drawCalendar(firstDaysOfTargetMonth, daysOfTargetMonth);
  }, [currentMonthIndex]);

  const goToPastMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(12);
      setCurrentYearIndex((currentYearIndex) => currentYearIndex - 1);
    }

    setCurrentMonthIndex((currentMonthIndex) => currentMonthIndex - 1);
  };

  const goToNextMonth = () => {
    if (currentMonthIndex >= 11) {
      setCurrentMonthIndex(-1);
      setCurrentYearIndex((currentYearIndex) => currentYearIndex + 1);
    }

    setCurrentMonthIndex((currentMonthIndex) => currentMonthIndex + 1);
  };

  const drawCalendar = (firstDaysOfTheMonth: any, daysOfTheMonth: any) => {
    const newCalendar = [];

    for (let i = 0; i < firstDaysOfTheMonth; i++) {
      newCalendar.push(null);
    }

    for (let i = 1; i <= daysOfTheMonth; i++) {
      newCalendar.push(i);
    }

    setCalendar(newCalendar);
  };

  const initCalendar = () => {
    const firstDayOfCurrentMonth = getFirstDayOfTheMonth(
      new Date().getFullYear(),
      new Date().getMonth()
    );

    const daysOfCurrentMonth = totalDaysOfMonth(
      new Date().getFullYear(),
      new Date().getMonth() + 1
    );

    drawCalendar(firstDayOfCurrentMonth, daysOfCurrentMonth);
  };

  const clearCalendar = () => {
    setCalendar([]);
  };

  const getCurrentDay = (day: any) => {
    return (
      day === currentDay &&
      currentYear === currentYearIndex &&
      currentMonth === currentMonthIndex
    );
  };

  const workedDaysSet = useMemo(() => {
    const set = new Set();

    WORKED_DAYS.forEach((item) => {
      if (
        item.month - 1 === currentMonthIndex &&
        item.year === currentYearIndex
      ) {
        set.add(item.day);
      }
    });

    return set;
  }, [WORKED_DAYS, currentMonthIndex, currentYearIndex]);

  const checkIfWorkedThatDay = (day: number) => {
    return workedDaysSet.has(day);
  };

  return (
    <div className="minicalendar-container">
      <div className="minicalendar-header flex column centered">
        <div className="w-full flex align-center justify-between">
          <SimpleButton
            showTitle={false}
            title={"Ir al mes pasado"}
            icon={SVG_ICONS.ARROW_LEFT}
            onClickItem={() => goToPastMonth()}
          />
          {currentMonthName} {currentYearIndex}
          <SimpleButton
            showTitle={false}
            title={"Ir al mes siguiente"}
            icon={SVG_ICONS.ARROW_RIGHT}
            onClickItem={() => goToNextMonth()}
          />
        </div>
      </div>

      <div className="minicalendar">
        {weekDays.map((day, index) => (
          <div key={index} className="day-name centered">
            {day}
          </div>
        ))}

        {calendar.map((day, index) => (
          <div key={index} className="day-cell">
            <div
              className={
                "day-item " +
                (getCurrentDay(day) ? "current-day" : "") +
                " " +
                (checkIfWorkedThatDay(day) ? "worked-day" : "")
              }
            >
              {day}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex centered" style={{ gap: "5px" }}>
        <div className="worked-day-info"></div>
        <p>Dias trabajados</p>
      </div>
    </div>
  );
};

export default MiniCalendar;
