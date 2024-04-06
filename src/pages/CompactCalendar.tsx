/**
 * The super compact one-page calendar by Big Think. Article: https://bigthink.com/starts-with-a-bang/one-page-calendar
 */

import clsx from "clsx";
import { format, getDay, getYear } from "date-fns";
import { FC, PropsWithChildren, useMemo, useState } from "react";
// import { range } from 'lodash';

interface ICellProps extends PropsWithChildren {
  className?: string;
}

const Cell: FC<ICellProps> = ({ className, children }) => (
  <div className={clsx(className, "p-2")}>{children}</div>
);

interface IMonthsGroupedByStartingDayProps {
  year: number;
}

const MonthsGroupedByStartingDay: FC<IMonthsGroupedByStartingDayProps> = ({ year }) => {
  const groupedMonths: string[][] = Array.from({ length: 7 }, () => []);
  Array.from({ length: 12 }, (_, i) => i).forEach(
    (m) => {
      const firstOfTheMonth = new Date(year, m, 1);
      const dayOfTheWeek = getDay(firstOfTheMonth);
      groupedMonths[dayOfTheWeek].push(format(firstOfTheMonth, "MMM"));
    }
  );
  const monthsWithFiller = groupedMonths.map((m) => [
    ...m,
    ...Array.from({ length: 4 - m.length }).fill("")
  ]);

  return (
    <>
      {monthsWithFiller.map((dW, x) =>
        dW.map((m, i) => (
          <Cell className={`col-start-${x + 6} row-start-${i + 1} bg-gray-100`}>
            {`${m}`}
          </Cell>
        ))
      )}
    </>
  );
};

const CompactCalendar = () => {
  const [year, setYear] = useState(getYear(new Date()));

  // I'm lazy, so I generated these instead of typing them out.
  const daysInAMonth = useMemo(
    () => Array.from({ length: 35 }, (_, i) => (i < 31 ? i + 1 : "")),
    []
  );
  const daysInAWeek = useMemo(
    () =>
      Array.from({ length: 49 }, (_, i) => i).map((d) =>
        format(new Date(0, 0, d + d / 7), "ccc")
      ),
    []
  );

  return (
    <section className="container mx-auto p-4 flex flex-col gap-y-8">
      <h1 className="text-3xl font-bold">Super Compact Calendar</h1>
      <p>
        This is the super compact one-page compact calendar created by
        {' '}
        <a href="https://bigthink.com/starts-with-a-bang/one-page-calendar" target="_blank">
          Big Think
        </a>
        ! Click that link to read about how to read this calendar.
      </p>
      <form className="mx-auto" onSubmit={(e) => e.preventDefault()}>
        <label className="flex flex-row gap-x-2 items-center justify-center">
          <span className="font-bold">Enter a Year</span>
          <input
            type="number"
            min="0"
            defaultValue={year}
            className="border-2 border-gray-500 rounded-sm p-2"
            onChange={(e) => setYear(Number(e.currentTarget.value))}
          />
        </label>
      </form>
      <div className="grid grid-cols-12 grid-rows-11 grid-flow-col-dense gap-1">
        <div className="col-span-5 row-span-4 row-start-1 col-start-1">
          <div className="sr-only">This is filler space.</div>
        </div>
        <MonthsGroupedByStartingDay year={year} />
        {daysInAMonth.map((d) => (
          <Cell className="bg-gray-100">{d}</Cell>
        ))}
        {daysInAWeek.map((dW) => (
          <Cell>{dW}</Cell>
        ))}
      </div>
    </section>
  );
};

export default CompactCalendar;