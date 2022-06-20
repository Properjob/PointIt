import React, { useState, useEffect, useMemo, Fragment } from "react";
import { useAllDocs, useDB, useGet } from "react-pouchdb";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./components/Button";
import PointRadar from "./components/PointRadar";
import Select from "./components/Select";
import Statistic from "./components/Statistic";
import ToggleButtonGroup from "./components/ToggleButtonGroup";
import TextField from "./components/TextField";

import styles from "./App.module.css";

export default function App() {
  const [keys, setKeys] = useState([]);
  const [data, setData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [baseEffort, setBaseEffort] = useState(0);
  const [baseRisk, setBaseRisk] = useState(0);
  const [baseComplexity, setBaseComplexity] = useState(0);

  const [targetEffort, setTargetEffort] = useState(0);
  const [targetRisk, setTargetRisk] = useState(0);
  const [targetComplexity, setTargetComplexity] = useState(0);

  const fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55];

  useEffect(() => {
    setKeys(["base", "target"]);
    setData([
      {
        factor: "effort",
        base: baseEffort || 0,
        target: targetEffort || 0,
      },
      {
        factor: "risk",
        base: baseRisk || 0,
        target: targetRisk || 0,
      },
      {
        factor: "complexity",
        base: baseComplexity || 0,
        target: targetComplexity || 0,
      },
    ]);
  }, [
    baseEffort,
    baseRisk,
    baseComplexity,
    targetEffort,
    targetRisk,
    targetComplexity,
  ]);

  const calculateFibonacci = (values) => {
    const allEntered = values.every((value) => Boolean(value));
    if (!allEntered) {
      return [0, 0];
    }
    const avgValue = values.reduce((prev, curr) => prev + curr) / values.length;

    let diff = 99;
    let fib = 0;
    fibonacci.every((value) => {
      const currDiff = Math.abs(value - avgValue);
      if (currDiff < diff) {
        diff = currDiff;
        fib = value;
        return true;
      }
      return false;
    });

    return [fib, avgValue.toFixed(2)];
  };

  const [baseFib, baseAvg] = useMemo(
    () => calculateFibonacci([baseComplexity, baseEffort, baseRisk]),
    [baseComplexity, baseEffort, baseRisk]
  );

  const [targetFib, targetAvg] = useMemo(
    () => calculateFibonacci([targetComplexity, targetEffort, targetRisk]),
    [targetComplexity, targetEffort, targetRisk]
  );

  const db = useDB();

  const handleTargetReset = () => {
    setTargetComplexity(0);
    setTargetEffort(0);
    setTargetRisk(0);
  };

  const options = useAllDocs({ include_docs: true });

  const [selected, setSelected] = useState(undefined);

  const doc = useGet({ id: selected || "" });

  useEffect(() => {
    if (doc) {
      setBaseComplexity(doc.complexity);
      setBaseEffort(doc.effort);
      setBaseRisk(doc.risk);
    }
  }, [doc]);

  const handleBaseChange = (type, value) => {
    setSelected(undefined);
    if (type === "complexity") {
      setBaseComplexity(value);
    }
    if (type === "effort") {
      setBaseEffort(value);
    }
    if (type === "risk") {
      setBaseRisk(value);
    }
  };

  const handleTargetChange = (type, value) => {
    if (type === "complexity") {
      setTargetComplexity(value);
    }
    if (type === "effort") {
      setTargetEffort(value);
    }
    if (type === "risk") {
      setTargetRisk(value);
    }
  };

  const [name, setName] = useState(undefined);

  function closeModal() {
    setIsOpen(false);
  }

  const handleSave = () => {
    if (name !== undefined) {
      db.post({
        name,
        complexity: targetComplexity,
        risk: targetRisk,
        effort: targetEffort,
      });
    }
    closeModal();
  };

  function openModal() {
    setName(undefined);
    setIsOpen(true);
  }

  const handleTargetSave = () => {
    openModal();
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.radarColumn}>
        <PointRadar data={data} keys={keys} />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={styles.dialogContainer}
          onClose={() => closeModal()}
        >
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
                    Save As Preset
                  </Dialog.Title>
                  <div className={styles.dialogPanelContent}>
                    <TextField
                      id="name"
                      label="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Button onClick={handleSave}>Save</Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className={styles.inputColumn}>
        <div className={styles.baseSection}>
          <div className={styles.sectionTitle}>Base</div>
          <Select
            label="Presets"
            options={options.map((option) => ({
              value: option.id,
              displayValue: option.doc.name,
            }))}
            selected={selected}
            onChange={setSelected}
          />
          <ToggleButtonGroup
            label="Risk"
            activeColor="red"
            options={fibonacci}
            value={baseRisk}
            onChange={(value) => handleBaseChange("risk", value)}
          />
          <ToggleButtonGroup
            label="Effort"
            activeColor="red"
            options={fibonacci}
            value={baseEffort}
            onChange={(value) => handleBaseChange("effort", value)}
          />
          <ToggleButtonGroup
            label="Complexity"
            activeColor="red"
            options={fibonacci}
            value={baseComplexity}
            onChange={(value) => handleBaseChange("complexity", value)}
          />
          <div className={styles.statisticContainer}>
            <Statistic label="Average" value={baseAvg} color="red" />
            <Statistic
              label="Calculated Fibonacci"
              value={baseFib}
              color="red"
            />
          </div>
        </div>
        <div className={styles.targetSection}>
          <div className={styles.sectionTitle}>Target</div>
          <ToggleButtonGroup
            label="Risk"
            options={fibonacci}
            value={targetRisk}
            onChange={(value) => handleTargetChange("risk", value)}
          />
          <ToggleButtonGroup
            label="Effort"
            options={fibonacci}
            value={targetEffort}
            onChange={(value) => handleTargetChange("effort", value)}
          />
          <ToggleButtonGroup
            label="Complexity"
            options={fibonacci}
            value={targetComplexity}
            onChange={(value) => handleTargetChange("complexity", value)}
          />
          <div className={styles.statisticContainer}>
            <Statistic label="Target Average" value={targetAvg} />
            <Statistic label="Calculated Fibonacci" value={targetFib} />
          </div>
          <div className={styles.actionsContainer}>
            <Button onClick={handleTargetSave}>Save</Button>
            <Button onClick={handleTargetReset}>Reset</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
