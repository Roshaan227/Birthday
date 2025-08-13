import { useEffect, useMemo, useState } from "react";
import { getCountdownParts, getNextBirthdayDate } from "../utils/date";
import { birthdayDate } from "../config";

export default function Countdown() {
  const targetDate = useMemo(() => getNextBirthdayDate(birthdayDate), []);
  const [parts, setParts] = useState(getCountdownParts(targetDate));

  useEffect(() => {
    const id = setInterval(() => {
      setParts(getCountdownParts(targetDate));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="countdown">
      <div className="cd-box"><span>{parts.days}</span><label>Days</label></div>
      <div className="cd-box"><span>{parts.hours}</span><label>Hours</label></div>
      <div className="cd-box"><span>{parts.minutes}</span><label>Minutes</label></div>
      <div className="cd-box"><span>{parts.seconds}</span><label>Secs</label></div>
    </div>
  );
}


