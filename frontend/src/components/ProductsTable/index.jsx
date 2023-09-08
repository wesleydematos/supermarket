import { useEffect } from "react";
import { useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import Papa from "papaparse";

export const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [file, setFile] = useState([]);
  const [isDataValid, setIsDataValid] = useState(true);

  function handleFile(e) {
    setIsDataValid(true);
    Papa.parse(e.target.files[0], {
      header: false,
      complete: async (results) => {
        setFile(results.data);

        await api
          .post("/products", results.data)
          .then((response) => {
            if (Array.isArray(response.data)) {
              response.data.forEach((element) => {
                if (element.errors.length > 0) {
                  setIsDataValid(false);
                }
              });
            } else {
              setIsDataValid(false);
            }
            setData(response.data);
          })
          .catch((error) => {
            toast.error("Não foi possível carregar o arquivo.");
            console.error("Erro:", error);
          });
      },
    });
  }

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await api.get(`/products`);
        setProducts(data);
      } catch (error) {
        toast.error("Não foi possível carregar os Produtos.");
      }
    }

    getProducts();
  }, []);
  return (
    <main className="flex flex-col items-center mb-3">
      {products.length ? (
        <>
          <h1 className="text-primary font-bold text-xl my-4">
            Todos os produtos:
          </h1>
          <table className="bg-slate-100 rounded-md xl:w-[800px] mb-4">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Preço de custo</th>
                <th>Preço de venda</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.code}>
                  <td>{product.code}</td>
                  <td>{product.name}</td>
                  <td>{product.cost_price}</td>
                  <td>{product.sales_price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <section className="p-0 flex flex-col items-center">
            <label
              htmlFor="uploadFile"
              className="font-bold text-secondary text-xl my-4"
            >
              Atualizar produtos
            </label>

            <input
              id="uploadFile"
              type="file"
              accept=".csv"
              onChange={handleFile}
            />

            {!isDataValid ? <div>Erros</div> : <div>Acertos</div>}

            {file.length && (
              <button
                className="bg-blue-500 hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-3 px-3 font-medium text-white"
                disabled={!isDataValid}
              >
                ATUALIZAR
              </button>
            )}
          </section>
        </>
      ) : (
        <h2>Nenhum produto encontrado :/</h2>
      )}
    </main>
  );
};
