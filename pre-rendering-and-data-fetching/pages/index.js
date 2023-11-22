import fs from "fs/promises";
import path from "path";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: { products: data.products },
    revalidate: 10, // Page will re-redenered after every 10 secs
    // notFound: true, // if no data found, display 404 page
    // redirect: "/no-data" // if you want to redirect the user to the other page
  };
}

export default HomePage;
