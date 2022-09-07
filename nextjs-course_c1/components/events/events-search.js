import { useRef } from "react";
import Button from "../ui/button";
import classes from "./events-search.module.css";

const EventSearch = (props) => {
  const yearRef = useRef();
  const monthRef = useRef();

  function subminHandler(e) {
    e.preventDefault(); // 새로고침 방지

    const year = yearRef.current.value;
    const month = monthRef.current.value;

    props.onSearch(year, month);
  }

  return (
    <form className={classes.form} onSubmit={subminHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>

        <div className={classes.control}>
          <label htmlFor="month">month</label>
          <select id="month" ref={monthRef}>
            <option value="1">1월</option>
            <option value="2">2월</option>
            <option value="3">3월</option>
            <option value="4">4월</option>
            <option value="5">5월</option>
            <option value="6">6월</option>
            <option value="7">7월</option>
            <option value="8">8월</option>
            <option value="9">9월</option>
            <option value="10">10월</option>
            <option value="11">11월</option>
            <option value="12">12월</option>
          </select>
        </div>
      </div>

      <Button>Find Events</Button>
    </form>
  );
};

export default EventSearch;
