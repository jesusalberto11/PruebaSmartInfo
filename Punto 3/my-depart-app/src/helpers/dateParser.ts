const formatDate = (currentDate: Date, options: any | undefined): string => {
  return currentDate.toLocaleDateString("es-ES", options);
};

export const getCurrentMonthName = (): string => {
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const currentMonthName = months[currentMonthIndex];

  return currentMonthName;
};

export const getCurrentMonthNameByIndex = (index: number): string => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const currentMonthName = months[index];

  return currentMonthName;
};

export const getWeekDaysShort = (): Array<string> => {
  const weekDaysShort = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

  return weekDaysShort;
};

export const getFirstDayOfTheMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export const totalDaysOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

export const getTaskFormatedDate = (): string => {
  const currentDate = new Date();

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = formatDate(currentDate, options);

  return formattedDate;
};

export const formatStringDate = (stringDate: string): string => {
  const [year, month, day] = stringDate.split("-");

  const dateToFormat = new Date(Number(year), Number(month) - 1, Number(day));

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = formatDate(dateToFormat, options);

  return formattedDate;
};

export const getCurrentDateFormated = (): string => {
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();
  const weekDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const currentDay = weekDays[currentDayIndex];

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = formatDate(currentDate, options);

  const currentDateFormatted = currentDay + ", " + formattedDate;

  return currentDateFormatted;
};

/**
 * Obtiene la fecha actual en formato YYYY-MM-DD.
 *
 * @returns {string} - La fecha actual en formato YYYY-MM-DD.
 */
export const getCurrentDateString = (): string => {
  const actualDate = new Date();

  const year = actualDate.getFullYear();
  const month = String(actualDate.getMonth() + 1).padStart(2, "0");
  const day = String(actualDate.getDate()).padStart(2, "0");

  const resultDate = `${year}-${month}-${day}`;

  return resultDate;
};

/**
 * Obtiene los nombres de los meses a partir de una lista de fechas.
 *
 * @param {string[]} week - La lista de fechas en formato "AAAA-MM-DD".
 * @returns {string[]} - Una lista de los nombres de los meses.
 */
export const getMonthsFromWeek = (week: Array<string>): Array<string> => {
  const uniqueMonths = new Set(
    week.map((date) => getStringDateWithoutDay(date))
  );
  return [...uniqueMonths];
};

/**
 * Convierte una cadena de fecha en formato "AAAA-MM-DD" en una representación legible sin el día.
 * Si no se proporciona una cadena de fecha, se utilizará la fecha actual.
 *
 * @param {string} stringDate - La cadena de fecha en formato "AAAA-MM-DD".
 * @returns {string} - Una representación legible de la fecha sin el día, por ejemplo, "Noviembre de 2023".
 */
export const getStringDateWithoutDay = (stringDate: string): string => {
  const dateToFormat = stringDate ? new Date(stringDate) : new Date();

  const formattedDate = dateToFormat.toLocaleString("default", {
    year: "numeric",
    month: "long",
  });

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

/**
 * Verifica si una fecha dada es igual al día actual (sin tener en cuenta la hora).
 *
 * @param {Date} date - La fecha que se desea verificar.
 * @returns {boolean} - `true` si la fecha es igual al día actual, `false` en caso contrario.
 */
export const IsToday = (date: Date): boolean => {
  const inputDate = new Date(date);
  const today = new Date();

  return (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate()
  );
};

/**
 * Obtiene una fecha anterior a partir de una fecha dada.
 *
 * @param {string} date - La fecha en formato "YYYY-MM-DD".
 * @param {number} days - El número de días a restar para obtener la fecha anterior.
 * @returns {string} - La fecha anterior en el mismo formato "YYYY-MM-DD".
 */
export const getDayBefore = (date: string, days: number): string => {
  const originalDate = new Date(date);
  const dayBeforeDate = new Date(originalDate);

  dayBeforeDate.setDate(originalDate.getDate() - days);

  return dayBeforeDate.toISOString().split("T")[0];
};

/**
 * Obtiene el día del mes de una fecha en formato "YYYY-MM-DD".
 *
 * @param {string} date - La fecha en formato "YYYY-MM-DD" de la cual se desea obtener el día del mes.
 * @returns {number} - El día del mes.
 */
export const getDayFromDate = (date: Date): number => {
  return new Date(date).getDate();
};

/**
 * Obtiene los días de la semana a partir de la fecha especificada.
 *
 * @param {Date} [selectedDate] - La fecha a partir de la cual obtener los días de la semana. Si no se proporciona, se usa la fecha actual.
 * @returns {Array} - Un array con los días de la semana en formato "YYYY-MM-DD".
 */
export const getSpecificWeek = (selectedDate: string | null): Array<string> => {
  const currentDate = selectedDate ? new Date(selectedDate) : new Date();
  const currentWeekAndDays = new Array();

  if (selectedDate) {
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);
  } else {
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 2);
  }

  for (let index = 0; index < 7; index++) {
    if (index > 7) break;
    currentWeekAndDays.push(new Date(currentDate).toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return currentWeekAndDays;
};

export const getCurrentWeekDates = (): Array<string> => {
  const today = new Date();
  const firstDayOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 1)
  );
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(firstDayOfWeek);
    currentDay.setDate(firstDayOfWeek.getDate() + i);
    weekDates.push(currentDay.toLocaleDateString());
  }

  return weekDates;
};
