import { useSelector } from "react-redux";

export function UseAuth() {
  const data = useSelector((state) => state.user);
  return [data];
}
