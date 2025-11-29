import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popover,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Zoom,
  InputAdornment,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Tooltip from "@mui/material/Tooltip";

const ErrorTooltip = ({ message = "", children }) => {
  const hasError = Boolean(message);

  return (
    <Tooltip
      title={hasError ? message : ""}
      arrow
      placement="top-start"
      TransitionComponent={Zoom}
      disableInteractive
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: "error.main",
            color: "white",
            fontSize: 13,
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
          },
        },
        arrow: {
          sx: { color: "error.main" },
        },
      }}
    >
      <Box sx={{ width: "100%" }}>{children}</Box>
    </Tooltip>
  );
};
const Controller_Auto = ({
  name,
  control,
  option = [],
  errors,
  label = "",
  onValueChange,
  disabled = false,
  defaultValue = null,
}) => {
  const errorMessage = errors?.[name]?.message || "";
  const hasError = Boolean(errorMessage);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <ErrorTooltip message={errorMessage} show={!!errorMessage}>
          <Autocomplete
            options={option}
            getOptionLabel={(o) => o?.value_LA || ""}
            value={option.find((opt) => opt._id === value) || null}
            onChange={(_, v) => {
              const newValue = v ? v._id : null;
              onChange(newValue);
              onValueChange?.(newValue);
            }}
            disabled={disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                error={hasError}
                helperText={""}
                size="small"
                variant="outlined"
                fullWidth
                disabled={disabled}
              />
            )}
          />
        </ErrorTooltip>
      )}
    />
  );
};

// 🔹 Controller สำหรับ TextField
const Controller_Text = ({
  name,
  control,
  label = "",
  onValueChange,
  errors,
  defaultValue,
  disabled = false,
  type = "text",
  register,
}) => {
  const errorMessage = errors?.[name]?.message || "";
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <ErrorTooltip message={errorMessage} show={!!errorMessage}>
          <TextField
            type={type}
            label={label}
            value={value || ""}
            onChange={(e) => {
              onChange(e.target.value);
              onValueChange?.(e.target.value);
            }}
            {...register(name)}
            size="small"
            id={`outlined-basic-${name}`}
            error={!!errors?.[name]}
            helperText={""}
            variant="outlined"
            fullWidth
            disabled={disabled}
          />
        </ErrorTooltip>
      )}
    />
  );
};

export const Controller_Text_Hook = ({ name, label, disabled }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          disabled={disabled}
          error={!!errors[name]}
          helperText={errors[name]?.message}
        />
      )}
    />
  );
};
// 🔹 ฟังก์ชันจัดรูปแบบเบอร์โทร
const formatPhoneNumber = (value) => {
  if (!value) return "";
  const digits = value.replace(/\D/g, "");
  const len = digits.length;

  if (len < 4) return digits;
  if (len < 13) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

// 🔹 Controller สำหรับ TextField + format เบอร์โทร
const Controller_PhoneFormat = ({
  name,
  control,
  label = "Phone Number",
  errors = {},
  defaultValue = "",
  disabled = false,
  onValueChange,
}) => {
  const errorMessage = errors?.[name]?.message || "";

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <ErrorTooltip message={errorMessage} show={!!errorMessage}>
          <TextField
            label={label}
            size="small"
            fullWidth
            value={formatPhoneNumber(value || "")}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\D/g, ""); // ส่งเฉพาะตัวเลขกลับไปยัง react-hook-form
              onChange(rawValue);
              onValueChange?.(rawValue);
            }}
            error={!!errors?.[name]}
            helperText={""}
            disabled={disabled}
            variant="outlined"
          />
        </ErrorTooltip>
      )}
    />
  );
};
const Controller_NumberFormat = ({
  name,
  control,
  label = "Amount",
  errors = {},
  defaultValue = "",
  disabled = false,
  onValueChange,
  suffix,
}) => {
  const errorMessage = errors?.[name]?.message || "";

  const formatNumber = (value) => {
    if (value == null || value === "") return "";
    // 🔹 แปลงให้เป็น string ก่อน replace
    const numberString = String(value).replace(/,/g, "");
    if (isNaN(numberString)) return "";
    return new Intl.NumberFormat().format(Number(numberString));
  };

  const parseNumber = (value) => {
    if (value == null) return "";
    return String(value).replace(/,/g, "");
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <Tooltip
          title={errorMessage}
          arrow
          placement="top-start"
          disableInteractive
        >
          <TextField
            label={label}
            size="small"
            fullWidth
            value={formatNumber(value)}
            onChange={(e) => {
              const rawValue = parseNumber(e.target.value);
              onChange(rawValue);
              onValueChange?.(rawValue);
            }}
            error={!!errors?.[name]}
            helperText=""
            disabled={disabled}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{suffix}</InputAdornment>
              ),
              inputProps: { style: { textAlign: "right" } },
            }}
          />
        </Tooltip>
      )}
    />
  );
};
const Controller_NumberFormat_1 = ({
  name,
  control,
  label = "Amount",
  errors = {},
  defaultValue = "",
  disabled = false,
  onValueChange,
  suffix,
  register,
}) => {
  const errorMessage = errors?.[name]?.message || "";

  // ຟອຣ໌ແມັດເລກແບບຮອງຮັບ decimal
  const formatNumber = (value) => {
    if (value === null || value === undefined || value === "") return "";

    // ແຍກສ່ວນເທິງ ແລະ ສ່ວນທົດສະນິຍົມ
    const [intPart, decimalPart] = value.toString().split(".");

    // format ້ພຽງແຕ່ສ່ວນເຕັມ
    const formattedInt = new Intl.NumberFormat().format(
      Number(intPart.replace(/,/g, ""))
    );

    // ຖ້າມີ decimal → ຕໍ່ກັບໄປ
    return decimalPart !== undefined
      ? `${formattedInt}.${decimalPart}`
      : formattedInt;
  };

  // ປ່ຽນຄ່າໃຫ້ສະອາດ (ອະນຸຍາດ 0-9, ".")
  const parseNumber = (value) => {
    if (!value) return "";
    return value.replace(/,/g, "").replace(/[^0-9.]/g, "");
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <Tooltip
          title={errorMessage}
          arrow
          placement="top-start"
          disableInteractive
        >
          <TextField
            label={label}
            size="small"
            fullWidth
            value={formatNumber(value)}
            onChange={(e) => {
              let raw = parseNumber(e.target.value);

              // กัน user ພິມ "." 2 ອັນ
              const parts = raw.split(".");
              if (parts.length > 2) {
                raw = parts[0] + "." + parts[1];
              }

              onChange(raw);
              onValueChange?.(raw);
            }}
            error={!!errors?.[name]}
            helperText=""
            disabled={disabled}
            variant="outlined"
            register={register}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{suffix}</InputAdornment>
              ),
              inputProps: { style: { textAlign: "right" } },
            }}
          />
        </Tooltip>
      )}
    />
  );
};
const Controller_Date = ({
  control,
  name,
  errors,
  label,
  onDateChange,
  defaultValue = null,
  disabled = false,
}) => {
  const errorMessage = errors?.[name]?.message || "";

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <Tooltip
          title={errorMessage}
          arrow
          placement="top-start"
          disableInteractive
          // ✅ ບໍ່ໃຊ້ `open={!!errors?.[name]}` ອີກແລ້ວ
          // ✅ ໃຫ້ tooltip ສະແດງເມື່ອ hover ເທົ່ານັ້ນ
        >
          {" "}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={label}
              value={value ? dayjs(value, "DD/MM/YYYY") : null}
              format="DD/MM/YYYY"
              onChange={(newValue) => {
                const formatted = newValue
                  ? dayjs(newValue).format("DD/MM/YYYY")
                  : null;
                onChange(formatted);
                onDateChange?.(formatted);
              }}
              slotProps={{
                textField: {
                  size: "small",
                  error: !!errors?.[name],
                  helperText: "",
                  fullWidth: true,
                  // ✅ handle manual input typing
                  onBlur: (e) => {
                    const val = e.target.value;
                    if (dayjs(val, "DD/MM/YYYY", true).isValid()) {
                      const formatted = dayjs(val, "DD/MM/YYYY").format(
                        "DD/MM/YYYY"
                      );
                      onChange(formatted);
                      onDateChange?.(formatted);
                    }
                  },
                },
              }}
              disabled={disabled}
              views={["year", "month", "day"]}
            />
          </LocalizationProvider>
        </Tooltip>
      )}
    />
  );
};

// 🔹 Field สำหรับ TextField ธรรมดา
const Field = ({ name, control, label, error, size = "small" }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        label={label}
        size={size}
        error={!!error}
        helperText={error?.message}
        fullWidth
      />
    )}
  />
);

// 🔹 SelectField สำหรับ Autocomplete ทั่วไป
const SelectField = ({
  name,
  control,
  label,
  options = [],
  getLabel = (o) => o?.value_LA || "",
  onSelect,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <Autocomplete
        options={options}
        getOptionLabel={getLabel}
        value={options.find((opt) => opt._id === value) || null}
        onChange={(_, v) => {
          const newValue = v ? v._id : null;
          onChange(newValue);
          onSelect?.(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} size="small" fullWidth />
        )}
      />
    )}
  />
);

const TransferList = ({
  name,
  control,
  labelLeft = "Available",
  labelRight = "Selected",
  defaultValue = [],
  options = [],
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field: { value, onChange } }) => {
      const [left, setLeft] = React.useState(
        options.filter((o) => !value.includes(o))
      );
      const [right, setRight] = React.useState(value);

      const move = (from, to, setFrom, setTo, items) => {
        setTo([...to, ...items]);
        setFrom(from.filter((i) => !items.includes(i)));
        onChange([...to, ...items]);
      };

      const [checked, setChecked] = React.useState([]);

      const toggle = (item) =>
        setChecked((prev) =>
          prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );

      const leftChecked = left.filter((i) => checked.includes(i));
      const rightChecked = right.filter((i) => checked.includes(i));

      const ListBox = (items, title) => (
        <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
          <Box sx={{ p: 1, fontWeight: 600 }}>{title}</Box>
          <List dense component="div">
            {items.map((item) => (
              <ListItem
                button
                key={item}
                onClick={() => toggle(item)}
                selected={checked.includes(item)}
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Paper>
      );

      return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>{ListBox(left, labelLeft)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                sx={{ my: 1 }}
                variant="outlined"
                onClick={() =>
                  move(left, right, setLeft, setRight, leftChecked)
                }
                disabled={!leftChecked.length}
              >
                &gt;
              </Button>
              <Button
                sx={{ my: 1 }}
                variant="outlined"
                onClick={() =>
                  move(right, left, setRight, setLeft, rightChecked)
                }
                disabled={!rightChecked.length}
              >
                &lt;
              </Button>
            </Grid>
          </Grid>
          <Grid item>{ListBox(right, labelRight)}</Grid>
        </Grid>
      );
    }}
  />
);

export default TransferList;
// ✅ Format function
const formatNumber = (value) => {
  if (value === "" || value === null || value === undefined) return "";

  const numericValue = value.toString().replace(/,/g, ""); // Remove commas

  if (isNaN(numericValue)) return "";

  return new Intl.NumberFormat().format(numericValue);
};

// ✅ Controller สำหรับ TextField (Auto format number)
const Controller_Text_Monney = ({
  name,
  control,
  label = "",
  errors,
  defaultValue,
  disabled = false,
  register,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      render={({ field: { onChange, value } }) => (
        <TextField
          label={label}
          value={value ? formatNumber(value) : ""}
          onChange={(e) => {
            const raw = e.target.value.replace(/,/g, "");
            if (!/^\d*$/.test(raw)) return; // block non-numeric
            onChange(raw);
          }}
          {...register(name)}
          size="small"
          fullWidth
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message}
          disabled={disabled}
        />
      )}
    />
  );
};

/**
 * ✅ Controller สำหรับ RadioGroup (React Hook Form + MUI)
 */
export const Controller_RadioGroup = ({
  name,
  control,
  label = "",
  errors = {},
  options = [],
  defaultValue = "",
  disabled = false,
  row = true,
  onChangeExtra, // ✅ callback เพิ่มเติม
}) => {
  return (
    <FormControl
      component="fieldset"
      error={!!errors?.[name]}
      disabled={disabled}
      sx={{ width: "100%" }}
    >
      {label && <FormLabel>{label}</FormLabel>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            row={row}
            value={value || ""}
            onChange={(e) => {
              const val = e.target.value;
              onChange(val);
              if (onChangeExtra) onChangeExtra(val); // ✅ trigger callback
            }}
          >
            {options?.map((opt, i) => (
              <FormControlLabel
                key={i}
                value={opt.value}
                control={<Radio />}
                label={opt.label}
              />
            ))}
          </RadioGroup>
        )}
      />

      {errors?.[name] && (
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      )}
    </FormControl>
  );
};
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

// Utility for responsive image src
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
import { useController } from "react-hook-form";
import { useDropzone } from "react-dropzone";
export function DragDropUpload({
  name,
  control,
  maxFiles = 5,
  maxSizeMB = 2,
  allowedTypes = ["image/jpeg", "image/png", "image/webp"],
}) {
  const {
    field: { onChange, value },
  } = useController({ name, control });

  const onDrop = (acceptedFiles, fileRejections) => {
    const current = value || [];

    if (current.length + acceptedFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed.`);
      return;
    }

    // Show error message
    fileRejections.forEach((rej) => {
      const err = rej.errors[0];
      if (err.code === "file-too-large") {
        alert(`File too large. Max size is ${maxSizeMB}MB.`);
      }
      if (err.code === "file-invalid-type") {
        alert(`Invalid file type. Allowed: JPG, PNG, WEBP.`);
      }
    });

    // Attach preview URL
    const newFiles = acceptedFiles.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));

    onChange([...current, ...newFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: maxFiles,
    maxSize: maxSizeMB * 1024 * 1024,
    accept: allowedTypes.reduce((acc, t) => ({ ...acc, [t]: [] }), {}),
  });

  return (
    <div className="w-full space-y-4">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition duration-200
${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
      >
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select</p>
        <p className="text-sm text-gray-500 mt-1">
          Max {maxFiles} files, up to {maxSizeMB}MB each
        </p>
      </div>

      {/* Preview Gallery */}
      {value && value.length > 0 && (
        <ImageList variant="quilted" cols={4} rowHeight={121}>
          {value.map((item, index) => (
            <ImageListItem key={index} cols={1} rows={1}>
              <img
                src={item.preview}
                alt="preview"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
}

export {
  Controller_Date,
  Controller_Auto,
  Controller_Text,
  Controller_PhoneFormat,
  SelectField,
  Field,
  Controller_Text_Monney,
  Controller_NumberFormat,
  Controller_NumberFormat_1,
};
