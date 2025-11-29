import * as React from "react";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function FormDatePicker({
  control,
  name,
  label,
  errors,
  defaultValue,
  onExtraChange,
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? ""}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            label={label}
            value={field.value ? dayjs(field.value) : null}
            onChange={(val) => {
              field.onChange(val);
              onExtraChange?.(val);
            }}
            views={["year", "month", "day"]}
            slotProps={{
              textField: {
                helperText: "DD/MM/YYYY",
                size: "small",
                error: !!error,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
}
 function FormAutocomplete({
  control,
  name,
  label,
  options = [],
  errors,
  onExtraChange,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          options={options}
          getOptionLabel={(o) => o?.value_LA || ""}
          value={options.find((o) => o?._id === field.value) || null}
          onChange={(e, v) => {
            field.onChange(v?._id || "");
            onExtraChange?.(v?._id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!error}
              helperText={error?.message}
              size="small"
            />
          )}
        />
      )}
    />
  );
}
function FormTextField({
  control,
  name,
  label,
  type = "text",
  errors,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          error={!!error}
          helperText={error?.message}
          variant="outlined"
          size="small"
          fullWidth
        />
      )}
    />
  );
}