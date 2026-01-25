import { useRecoilState } from "recoil";
import { balanceAtom } from "../atoms/balance";

export const useBalance = () => {
  const [balance, setBalance] = useRecoilState(balanceAtom);
  return { balance, setBalance };
};
