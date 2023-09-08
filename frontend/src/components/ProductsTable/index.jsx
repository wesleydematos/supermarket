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
            response.data.forEach((element) => {
              if (element.errors.length > 0) {
                setIsDataValid(false);
              }
            });
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
    <main>
      {products.length ? (
        <>
          <table>
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

          <section className="py-3 md:py-5">
            <label htmlFor="uploadFile" className="font-bold">
              Atualizar produtos
            </label>

            <input
              id="uploadFile"
              type="file"
              accept=".csv"
              onChange={handleFile}
            />
          </section>
        </>
      ) : (
        <h2>Nenhum produto encontrado :/</h2>
      )}
    </main>
  );
};
