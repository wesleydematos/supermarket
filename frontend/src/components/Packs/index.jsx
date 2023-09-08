import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";

export const Packs = () => {
  const [packs, setPacks] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await api.get(`/packs`);
        setPacks(data);
      } catch (error) {
        toast.error("Não foi possível carregar os Packs.");
      }
    }

    getProducts();
  }, []);

  return (
    <main className="flex flex-col items-center mb-3">
      {packs.length ? (
        <>
          <h1 className="text-primary font-bold text-xl my-4">
            Todos os packs:
          </h1>
          <table className="bg-slate-100 rounded-md xl:w-[800px] mb-4 border border-header border-solid mx-1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Kit</th>
                <th>Produto</th>
                <th>Preço total</th>
              </tr>
            </thead>
            <tbody>
              {packs.map((pack) => (
                <tr key={pack.id}>
                  <td>{pack.id}</td>
                  <td>{pack.kit_name}</td>
                  <td>{pack.product_name}</td>
                  <td>{pack.product_price}</td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
        </>
      ) : (
        <h2 className="mt-5 font-bold">Nenhum pack encontrado :/</h2>
      )}
    </main>
  );
};
