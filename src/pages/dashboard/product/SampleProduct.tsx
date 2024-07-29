import Layout from "../../../layout";
import { Card } from "../../../components/ui/card";
import ProductCard from "../../../sections/product/ProductCard";
import { Input } from "../../../components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_APP } from "../../../utils";
import { toast } from "react-toastify";

function SampleProduct() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.post(`${BASE_URL_APP}/GetProductCategoryWise`)
      .then((r) => {
        if (r.data.status === "success") {
          setData(r.data.fpo_product);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((r) => {
        console.log(r);
        toast.error(r.message);
      });
  }, []);

  const handleSearchChange = (event:any) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item: any) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="relative flex w-[400px] flex-col items-start justify-start">
        <Input
          className="my-3"
          placeholder="Search Sample Product"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <img
          src="/images/search.svg"
          className="absolute right-[12px] top-[20px] hover:cursor-pointer"
        />
      </div>
      <Card className="rounded p-4">
        <h1 className="p-3 text-xl font-bold">Sample Products</h1>
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {filteredData.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      </Card>
    </Layout>
  );
}

export default SampleProduct;
