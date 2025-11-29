const RenderTextField = ({ control, register, errors, name, label, type }) => (
  <Controller
    name={name}
    control={control}
    render={() => (
      <TextField
        label={label}
        type={type}
        {...register(name)}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        variant="outlined"
        size="small"
        fullWidth
      />
    )}
  />
);

// 🔹 helper component for autocompletes
const RenderAutocomplete = ({
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