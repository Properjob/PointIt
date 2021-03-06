import React, { useState, useEffect, useMemo } from "react";
import { useDB, useFind, useGet } from "react-pouchdb";
import Button from "./components/Button";
import PointRadar from "./components/PointRadar";
import Select from "./components/Select";
import Statistic from "./components/Statistic";
import ToggleButtonGroup from "./components/ToggleButtonGroup";

import styles from "./App.module.css";
import ModalDialog from "./components/ModalDialog";
import CreatePreset from "./forms/CreatePreset";

export default function App() {
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
    const noUndefined = values.every((value) => Boolean(value));
    if (!noUndefined) {
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

  const handleTargetReset = () => {
    setTargetComplexity(0);
    setTargetEffort(0);
    setTargetRisk(0);
  };

  const db = useDB();

  const presets = useFind({
    selector: {
      _id: {
        $ne: "",
      },
    },
  });

  const [selected, setSelected] = useState(undefined);

  const doc = useGet({ id: selected || "", live: false });

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

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleTargetSave = () => {
    openModal();
  };

  const handleTargetSubmit = (formData) => {
    db.post({
      name: formData.name,
      risk: targetRisk,
      effort: targetEffort,
      complexity: targetComplexity,
    });

    closeModal();
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.radarColumn}>
        <PointRadar
          data={data}
          keys={[
            { id: "base", label: "Base" },
            { id: "target", label: "Target" },
          ]}
          labels={{ effort: "Effort", risk: "Risk", complexity: "Complexity" }}
        />
      </div>

      <ModalDialog isOpen={isOpen} title="Save Preset" onClose={closeModal}>
        <CreatePreset
          onSubmit={handleTargetSubmit}
          preset={{
            risk: targetRisk,
            effort: targetEffort,
            complexity: targetComplexity,
          }}
        />
      </ModalDialog>

      <div className={styles.inputColumn}>
        <div className={styles.baseSection}>
          <div className={styles.sectionTitle}>Base</div>
          <Select
            label="Presets"
            options={presets.map((option) => ({
              value: option._id,
              displayValue: option.name,
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
            <Button onClick={handleTargetSave} disabled={targetFib === 0}>
              Save
            </Button>
            <Button onClick={handleTargetReset}>Reset</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
