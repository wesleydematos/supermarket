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

  function updateProducts() {
    console.log(data);
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
          <table className="bg-slate-100 rounded-md xl:w-[800px] mb-4 border border-header border-solid mx-1">
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

            {isDataValid && data.length && (
              <div>
                <h3 className="text-primary font-bold text-xl my-4 ">
                  Confirme as mudanças:
                </h3>
                <table className="bg-slate-100 rounded-md xl:w-[800px] mb-4 border border-teal-500 border-solid mx-1">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Nome</th>
                      <th>Preço atual</th>
                      <th>Novo preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((product) => (
                      <tr key={product.code}>
                        <td>{product.code}</td>
                        <td>{product.name}</td>
                        <td>{product.last_price}</td>
                        <td>{product.new_price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!isDataValid && (
              <div>
                {data.message ? (
                  <div>
                    <h3 className="font-bold text-xl my-3 text-center text-red-400">
                      {data.message}
                    </h3>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-primary font-bold text-xl my-4 ">
                      Ajuste os erros:
                    </h3>
                    <div className="bg-slate-100 rounded-md mb-4 border border-red-500 border-solid mx-1">
                      {data.map((product) => (
                        <>
                          {product.errors.length > 0 ? (
                            <div key={product.code} className="m-2">
                              <p className="font-medium">
                                O novo preço de R${product.new_price} para o
                                produto {product.name} de código {product.code}{" "}
                                não pode ser alterado devido os seguintes erros:
                              </p>
                              {product.errors.map((erro) => (
                                <p key={erro}>- {erro}</p>
                              ))}
                            </div>
                          ) : product.name.length ? null : (
                            <p key={product.code} className="m-2 font-medium">
                              Os dados referentes ao produto de código{" "}
                              {product.code} não podem ser alterados pois o
                              mesmo não existe.
                            </p>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {file.length && (
              <button
                className="bg-blue-500 hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-3 px-3 font-medium text-white"
                disabled={!isDataValid}
                onClick={() => updateProducts()}
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
