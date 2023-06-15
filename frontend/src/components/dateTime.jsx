import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
export default function DateTime(props) {
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [value1, setValue1] = React.useState(dayjs(new Date()));
  return (
    <div className="mt-[50px] text-center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="inline">
          <DateTimePicker
            label="Start Time"
            value={value}
            disablePast
            onChange={(newValue) => {
                setValue(newValue)
                setValue1(newValue)
            }}
          />
        </div>
        <div className="ml-10 inline">
            <DateTimePicker
            label="End Time"
            value={value1}
            minDateTime={value}
            disablePast
            onChange={(newValue) => setValue1(newValue)}
            />
        </div>
        <div>
            <button onClick={()=>{props.startRegistration(value.format(),value1.format())}} className="  p-4 bg-black mt-10 rounded-md text-primary font-semibold">Start Registration</button>
        </div>
        
      </LocalizationProvider>
    </div>
  );
}
