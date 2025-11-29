import * as React from "react";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Autocomplete, TextField } from "@mui/material";

 function FormDatePicker({
  control,
  name,
  label,
  errors,
  defaultValue,
  onExtraChange,
  register,
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? ""}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label}
            value={value ? dayjs(value) : null}
            {...register(name)}
            onChange={(val) => {
              onChange(val);
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
  register,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Autocomplete
          options={options}
          getOptionLabel={(o) => o?.value_LA || ""}
          
          onChange={(e, v) => {
            onChange(v?._id || "");
            onExtraChange?.(v?._id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              id={`outlined-basic-${name}`}
              {...register(name)}
              label={label}
              error={!!errors}
              helperText={errors?.message}
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
  type,
  errors,
  register,
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
          {...register(name)}
          size="small"
        />
      )}
    />
  );
}const RenderAutocomplete1 = ({
  control,
  register,
  errors,
  name,
  label,
  options,
  onSelect,
}) => (
  <Controller
    name={name}
    control={control}
    render={() => (
      <Autocomplete
        options={options}
        getOptionLabel={(o) => o.value_LA || ""}
        onChange={(e, v) => onSelect?.(v)}
        renderInput={(params) => (
          <TextField
            {...params}
            {...register(name)}
            label={label}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            size="small"
          />
        )}
      />
    )}
  />
);

export {FormDatePicker,FormAutocomplete,FormTextField,RenderAutocomplete1}