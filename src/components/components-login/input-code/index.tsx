import { ChangeEvent, ClipboardEvent, Dispatch, KeyboardEvent, SetStateAction, useRef } from "react";
import "./styles.scss";

type InputCodeProps = {
  arrayCode: string[];
  setArrayCode: Dispatch<SetStateAction<string[]>>;
};

const InputCode = ({ arrayCode, setArrayCode }: InputCodeProps) => {
  const codeInputRef = useRef<(HTMLInputElement | null)[]>(Array(6));

  const onCodeChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value == "") {
      const newValues = [...arrayCode];
      newValues[index] = value;
      setArrayCode(newValues);

      if (value !== "" && index < arrayCode.length - 1) {
        (codeInputRef.current[index]?.nextElementSibling as HTMLInputElement)?.focus();
      }
    }
  };

  const onCodeKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && arrayCode[index] === "") {
      (codeInputRef.current[index]?.previousElementSibling as HTMLInputElement)?.focus();
    }
  };

  const onPasteCode = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasteValues = e.clipboardData.getData("text").slice(0, 6).split("");
    const newArrayCode = [...arrayCode];

    pasteValues.forEach((char, idx) => {
      newArrayCode[idx] = char;
    });

    setArrayCode(newArrayCode);

    const firstEmptyInput = newArrayCode.findIndex((x) => x === "");
    const focusIndex = firstEmptyInput !== -1 ? firstEmptyInput : newArrayCode.length - 1;

    if (codeInputRef.current[focusIndex]) {
      codeInputRef.current[focusIndex].focus();
    }
  };

  return (
    <div className="code-input">
      {arrayCode.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          placeholder="__"
          onChange={(e) => onCodeChange(e, index)}
          onKeyDown={(e) => onCodeKeyDown(e, index)}
          onPaste={onPasteCode}
          ref={(el) => (codeInputRef.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default InputCode;
