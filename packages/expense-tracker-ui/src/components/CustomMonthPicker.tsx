import React from "react";
import DatePicker from "react-datepicker";
import { Box, Button } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from "../context/AppContext";

const CustomMonthPicker = () => {
  const context = useAppContext();

  return (
    <Box>
      <DatePicker
        selected={context.selectedMonth}
        onChange={(date) => { context.setSelectedMonth(date) }}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        customInput={
          <Button variant='outline' size="sm">
            {context.selectedMonth ? context.selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Select Month"}
          </Button>
        }
      />
    </Box>
  );
};

export default CustomMonthPicker;
