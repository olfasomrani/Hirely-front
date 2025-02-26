import { DimensionContext } from "@/context/Dimension";
import { useContext } from "react";

const useDeviceDimension = () => useContext(DimensionContext);
export default useDeviceDimension;
