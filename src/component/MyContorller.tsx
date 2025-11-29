import * as React from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

// 🔹 1. Autocomplete Component
export const FormAutoComplete = ({
  name,
  control,
  label,
  errors,
  options = [],
  getOptionLabel = (o) => o?.value_LA || "",
  onValueChange,
  disabled = false,
  defaultValue = null,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={options}
          getOptionLabel={getOptionLabel}
          value={options.find((opt) => opt._id === value) || null}
          onChange={(_, v) => {
            const newValue = v ? v._id : null;
            onChange(newValue);
            onValueChange?.(v);
          }}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              size="small"
              variant="outlined"
              error={!!errors?.[name]}
              helperText={errors?.[name]?.message || ""}
              fullWidth
              disabled={disabled}
            />
          )}
        />
      )}
    />
  );
};

// 🔹 2. DatePicker Component
export const FormDatePicker = ({
  name,
  control,
  label,
  errors,
  defaultValue = null,
  onValueChange,
  disabled = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label}
            value={value ? dayjs(value) : null}
            onChange={(newValue) => {
              const iso = newValue ? newValue.toISOString() : null;
              onChange(iso);
              onValueChange?.(newValue);
            }}
            disabled={disabled}
            views={["year", "month", "day"]}
            slotProps={{
              textField: {
                size: "small",
                error: !!errors?.[name],
                helperText: errors?.[name]?.message || "",
                fullWidth: true,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

// 🔹 3. TextField Component
export const FormTextField = ({
  name,
  control,
  label,
  errors,
  defaultValue = "",
  type = "text",
  disabled = false,
  onValueChange,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <TextField
          id={`outlined-basic-${name}`}
          label={label}
          type={type}
          value={value || ""}
          onChange={(e) => {
            onChange(e.target.value);
            onValueChange?.(e.target.value);

          }}
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message || ""}
          variant="outlined"
          size="small"
          fullWidth
          disabled={disabled}
        />
      )}
    />
  );
};
/**
 * 🔹 Component สำหรับเลือกເມືອງ (District)
 * ใช้ร่วมกับ react-hook-form + MUI Autocomplete
 *
 * Props:
 * - name: ชื่อฟิลด์ใน react-hook-form
 * - control: ตัว control จาก useForm()
 * - errors: object error จาก formState
 * - label: ชื่อ label ของฟิลด์
 * - options: รายการ district ทั้งหมด
 * - onValueChange: ฟังก์ชันที่เรียกเมื่อเลือก district (เช่น get_data_village)
 * - disabled: ปิดการใช้งานหรือไม่
 */
export const Controller_Select_Get = ({
  name = "district_id",
  control,
  errors,
  label = "",
  options = [],
  onValueChange,
  disabled = false,
  defaultValue = null,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={options}
          getOptionLabel={(o) => o?.value_LA || ""}
          value={options.find((opt) => opt._id === value) || null}
          onChange={(_, v) => {
            const newValue = v ? v._id : null;
            onChange(newValue); // update react-hook-form
            if (onValueChange) onValueChange(newValue); // callback เช่น get_data_village()
          }}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              size="small"
              variant="outlined"
              fullWidth
              error={!!errors?.[name]}
              helperText={errors?.[name]?.message || ""}
              disabled={disabled}
            />
          )}
        />
      )}
    />
  );
};

