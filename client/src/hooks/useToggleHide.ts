import { BaseSyntheticEvent, useState } from "react";

export default function useToggleHide(isHide: boolean = false): any[] {
  const [visible, setVisble] = useState(isHide);

  const changeHandler = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setVisble(!visible);
  }

  return [visible, changeHandler];
}