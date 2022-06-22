import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Button from "../../components/Button";

import TextFormField from "../components/TextFormField";

import styles from "./CreatePreset.module.css";

export default function CreatePreset({ onSubmit }) {
  const { handleSubmit, control } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextFormField
        control={control}
        id="name"
        label="Name"
        rules={{ required: "This field is required." }}
      />
      <Button type="submit">Save</Button>
    </form>
  );
}

CreatePreset.propTypes = {
  onSubmit: PropTypes.func,
  preset: PropTypes.shape({
    risk: PropTypes.number,
    effort: PropTypes.number,
    complexity: PropTypes.number,
  }).isRequired,
};

CreatePreset.defaultProps = {
  onSubmit: undefined,
};
