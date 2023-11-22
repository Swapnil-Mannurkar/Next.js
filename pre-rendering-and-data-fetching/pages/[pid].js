import React from "react";
import fs from "fs/promises";
import path from "path";

const ProductDetailsPage = (props) => {
  const { selectedProduct } = props;

  /*
  if fallback is true in getStaticPaths() add the below code:
  if (!selectedProduct) {
    return <p>Loading...</p>
  }

  if fallback is false or 'blocking' no need to add above code
  */

  return (
    <>
      <h1>{selectedProduct.title}</h1>
      <p>{selectedProduct.description}</p>
    </>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const selectedProduct = data.products.find(
    (product) => product.id === productId
  );

  return {
    props: { selectedProduct: selectedProduct },
  };
};

export const getStaticPaths = async () => {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithparams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithparams,
    // if fallback is:
    // false, need to add all the page ids in the paths. Eg: { params: { pid: "p1" } }
    // true, no need to add page ids in the paths but user cannot directly open a certain page
    // 'blocking' no need to add page ids in the paths
    fallback: false,
    // fallback can be:
    // false (known number of pages)
    // true (when user doesn't redirects by changing URL or directly opens the certain page)
    // 'blocking' (dyanmic and unknown numbers of pages)
  };
};

export default ProductDetailsPage;
