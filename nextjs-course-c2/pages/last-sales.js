import { useState, useEffect } from "react";
import useSRW from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSRW(
    "https://nextjs-course-dfeed-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const salesArr = [];
      for (const key in data) {
        salesArr.push({
          id: key,
          username: data[key].username,
          volumn: data[key].volumn,
        });
      }
      setSales(salesArr);
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://nextjs-course-dfeed-default-rtdb.firebaseio.com/sales.json")
      .then((res) => res.json())
      .then((data) => {
        const salesArr = [];
        for (const key in data) {
          salesArr.push({
            id: key,
            username: data[key].username,
            volumn: data[key].volumn,
          });
        }
        setSales(salesArr);
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (isLoading) {
    return <p>Loading..</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volumn}
        </li>
      ))}
    </ul>
  );
}

export default LastSalesPage;

export async function getStaticProps() {
  const res = await fetch(
    "https://nextjs-course-dfeed-default-rtdb.firebaseio.com/sales.json"
  );

  const data = res.json();

  const salesArr = [];
  for (const key in data) {
    salesArr.push({
      id: key,
      username: data[key].username,
      volumn: data[key].volumn,
    });
  }

  return {
    props: { sales: salesArr },
    revalidate: 10,
  };
}
