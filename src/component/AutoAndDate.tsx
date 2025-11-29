import * as React from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  Autocomplete
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Item from "./Item";

// 🗓️ DatePicker Component
const FormDatePicker = ({ control, name, label, register, errors, setState }) => (
  <Item>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        // ✅ ตรวจสอบและแปลงค่าให้เป็น dayjs เสมอ
        const safeValue = value ? dayjs(value) : dayjs();

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={label}
              views={["year", "month", "day"]}
              value={safeValue.isValid() ? safeValue : dayjs()}
              onChange={(v) => {
                onChange(v); // update react-hook-form
                setState?.(v); // update external state if needed
              }}
              slotProps={{
                textField: {
                  ...register(name),
                  helperText: errors?.[name]?.message || "DD/MM/YYYY",
                  error: !!errors?.[name],
                  size: "small",
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  </Item>
);

// 🔽 Autocomplete Component
const FormAutocomplete = ({
  control,
  name,
  label,
  options,
  setState,
  errors,
  register,
}) => (
  <Item>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={options?.data || []}
          value={options?.data?.find((opt) => opt._id === value) || null}
          getOptionLabel={(o) => o.value_LA || ""}
          onChange={(e, v) => {
            onChange(v?._id || "");
            setState?.(v?._id || "");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...register(name)}
              label={label}
              error={!!errors?.[name]}
              helperText={errors?.[name]?.message}
              size="small"
            />
          )}
        />
      )}
    />
  </Item>
);

// 🔤 TextField Component
const FormTextField = ({
  control,
  name,
  label,
  register,
  errors,
  setState,
  ...props
}) => (
  <Item>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          {...register(name)}
          label={label}
          value={value || ""}
          onChange={(e) => {
            onChange(e.target.value); // ✅ ต้องเป็น e.target.value
            setState?.(e.target.value);
          }}
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message}
          size="small"
          fullWidth
          {...props}
        />
      )}
    />
  </Item>
);
// 🔹 helper component for autocompletes
const RenderAutocomplete1 = ({
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
export { FormDatePicker, FormAutocomplete, FormTextField ,RenderAutocomplete1};
