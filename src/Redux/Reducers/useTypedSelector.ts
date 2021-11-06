import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "./rootReduser";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector