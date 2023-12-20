import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDistpach } from "@/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDistpach = () => useDispatch<AppDistpach>();
