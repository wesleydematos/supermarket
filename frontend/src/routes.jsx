import { Routes, Route, Navigate } from "react-router-dom";
import { ProductsTable } from "./components/ProductsTable";
import { Packs } from "./components/Packs";

export const RoutesMain = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductsTable />} />
        <Route path="/packs" element={<Packs />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
