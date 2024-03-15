import { useContext } from "react";
import { ShelvesContext } from "./ShelvesContextProvider";

export const useShelvesContext = () => useContext(ShelvesContext);
