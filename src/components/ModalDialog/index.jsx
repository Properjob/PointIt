import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";

import styles from "./ModalDialog.module.css";

export default function ModalDialog({ isOpen, title, children, onClose }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={styles.dialogContainer} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter={styles.dialogBackdropEnter}
          enterFrom={styles.dialogBackdropEnterFrom}
          enterTo={styles.dialogBackdropEnterTo}
          leave={styles.dialogBackdropLeave}
          leaveFrom={styles.dialogBackdropLeaveFrom}
          leaveTo={styles.dialogBackdropLeaveTo}
        >
          <div className={styles.dialogBackdrop} />
        </Transition.Child>

        <div className={styles.dialogScreen}>
          <div className={styles.dialogContent}>
            <Transition.Child
              as={Fragment}
              enter={styles.dialogPanelEnter}
              enterFrom={styles.dialogPanelEnterFrom}
              enterTo={styles.dialogPanelEnterTo}
              leave={styles.dialogPanelLeave}
              leaveFrom={styles.dialogPanelLeaveFrom}
              leaveTo={styles.dialogPanelLeaveTo}
            >
              <Dialog.Panel className={styles.dialogPanel}>
                <Dialog.Title as="h3" className={styles.dialogTitle}>
                  {title}
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

ModalDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClose: PropTypes.func,
};

ModalDialog.defaultProps = {
  onClose: undefined,
};
