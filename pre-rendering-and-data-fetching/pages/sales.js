import React, { useEffect, useState } from "react";
import useSWR from "swr";

const sales = (props) => {
  //   const [isLoading, setIsLoading] = useState(true);
  const [sales, setSales] = useState(props.sales);

  const { data, error } = useSWR(
    "https://nextjs-course-3d59e-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     fetch("https://nextjs-course-3d59e-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <h1>Failed to load data!</h1>;
  }

  //   if (!data || !sales) {
  //     return <h1>Loading....</h1>;
  //   }

  return (
    <div>
      {sales.map((sale) => (
        <div>
          {sale.id}-{sale.username}-{sale.volume}
        </div>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(
    "https://nextjs-course-3d59e-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { sales: transformedSales } };
};

export default sales;
