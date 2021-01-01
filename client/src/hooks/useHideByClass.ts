import { BaseSyntheticEvent, useState } from "react";

export default function useHideByClass(isHide: boolean = false): any[] {
  const [visible, setVisble] = useState(isHide);

  const changeHandler = (e: BaseSyntheticEvent) => {
    setVisble(!visible);
  }

  return [visible, changeHandler];
}