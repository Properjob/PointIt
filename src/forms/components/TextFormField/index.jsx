import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import TextField from "../../../components/TextField";

import styles from "./TextFormField.module.css";

export default function TextFormField({ control, id, rules, label }) {
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { error },
  } = useController({
    name: id,
    control,
    rules,
  });

  return (
    <div className={styles.container}>
      <TextField
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        inputRef={ref}
        label={label}
      />
      <div className={styles.errorMessage}>{error && error.message}</div>
    </div>
  );
}

TextFormField.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  rules: PropTypes.shape({
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }),
  label: PropTypes.string.isRequired,
};

TextFormField.defaultProps = {
  rules: undefined,
};
