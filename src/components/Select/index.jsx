import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";

import styles from "./Select.module.css";
import classnames from "../../helpers/classnames";

export default function Select({ options, selected, onChange, label }) {
  return (
    <Listbox value={selected} onChange={onChange}>
      <div className={styles.container}>
        <div className={styles.content}>
          {label}
          <Listbox.Button className={styles.button}>
            <span className={styles.buttonLabel}>
              {selected !== undefined && options
                ? options.find((o) => o.value === selected).displayValue
                : "Select..."}
            </span>
            <span className={styles.selectorContainer}>
              <SelectorIcon
                className={styles.selectorIcon}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
        </div>
        <Transition
          as={Fragment}
          leave={styles.leave}
          leaveFrom={styles.leaveFrom}
          leaveTo={styles.leaveTo}
        >
          <Listbox.Options className={styles.options}>
            {options.map((option) => (
              <Listbox.Option
                key={option.displayValue}
                className={({ active }) =>
                  classnames(styles.option, active && styles.optionActive)
                }
                value={option.value}
              >
                {({ selected: isSelected }) => (
                  <>
                    <span
                      className={classnames(
                        styles.optionText,
                        isSelected && styles.optionTextSelected
                      )}
                    >
                      {option.displayValue}
                    </span>
                    {isSelected ? (
                      <span className={styles.optionSelected}>
                        <CheckIcon
                          className={styles.optionSelectedIcon}
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      displayValue: PropTypes.node,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ).isRequired,
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
};

Select.defaultProps = {
  selected: undefined,
  onChange: undefined,
};
