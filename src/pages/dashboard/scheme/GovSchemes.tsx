import React, { useEffect, useState } from "react";
import Layout from "../../../layout";
import { Input } from "../../../components/ui/input";
import axios from "axios";
import { BASE_URL_APP } from "../../../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";


function GovSchemes() {
  const [data, setData] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigae = useNavigate()
  const lan = useAppSelector((state) => state.lan.lan)

  useEffect(() => {
    axios
      .post(`${BASE_URL_APP}/GetallGovtSchemes`, {
        user_language:lan,
      })
      .then((r) => {
        console.log(r);
        if (r.data.status === "success") {
          setData(r.data.schemes);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((r) => {
        console.log(r);
        toast.error(r.message);
      });
  }, [lan]);

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item: any) =>
    item.scheme_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const truncateText = (text: any, wordLimit: any) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  return (
    <Layout>
      <div className="container mx-auto p-1">
        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="col-span-12 p-4 md:col-span-8">
            <img src="/images/scheme.svg" />
            <div className="font-bitter py-2 text-left text-[34px] font-medium leading-[41.99px] tracking-[0.25px]">
              Government Schemes
            </div>
            <div className="relative flex flex-col items-start justify-start">
              <Input
                className="my-3"
                placeholder="Search Government Schemes"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <img
                src="/images/search.svg"
                className="absolute right-[12px] top-[20px] hover:cursor-pointer"
              />
            </div>
            <div className="rounded bg-white p-4">
              {filteredData.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="mt-2 flex flex-row gap-2 border-b border-gray-300 pb-4 hover:cursor-pointer hover:shadow-lg rounded"
                    onClick={() => {
                      navigae(`/dashboard/governmentSchemes/${item.scheme_id}`)
                    }}
                  >
                    <img
                      src={`${BASE_URL_APP}${item.scheme_image}`}
                      className="m-2 rounded"
                      width={100}
                    />
                    <div>
                      <div className="font-roboto text-left text-base font-normal leading-7 tracking-[0.15px]">
                        {item.scheme_name}
                      </div>
                      <div className="font-roboto text-left text-base font-normal leading-6 tracking-[0.15px] text-[#64748B]">
                        {truncateText(item.details, 20)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-12 p-4 md:sticky md:top-0 md:col-span-4">
            <div className="font-bitter pb-2 text-right text-[30px] font-medium leading-[41.99px] tracking-[0.25px]">
              Most Viewed Schemes
            </div>
            <div className="h-[250px] overflow-auto rounded bg-white p-4">
              {filteredData.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="mt-1 flex flex-row gap-2 border-b border-gray-300 pb-2 hover:cursor-pointer hover:shadow-lg rounded"
                    onClick={() => {
                      navigae(`/dashboard/governmentSchemes/${item.scheme_id}`)
                    }}
                  >
                    <img
                      src={`${BASE_URL_APP}${item.scheme_image}`}
                      className="m-1 rounded"
                      width={50}
                    />
                    <div>
                      <div className="font-roboto text-left text-[13px] text-base font-semibold leading-5 tracking-[0.15px]">
                        {item.scheme_name}
                      </div>
                      <div className="font-roboto text-left text-[10px] text-base font-normal leading-4 tracking-[0.15px] text-[#64748B]">
                        {truncateText(item.details, 5)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="font-bitter mt-4 pb-2 text-right text-[30px] font-medium leading-[41.99px] tracking-[0.25px]">
              Recent Updates
            </div>
            <div className="h-[250px] overflow-auto rounded bg-white p-4">
              {filteredData.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="mt-1 flex flex-row gap-2 border-b border-gray-300 pb-2 hover:cursor-pointer hover:shadow-lg rounded"
                    onClick={() => {
                      navigae(`/dashboard/governmentSchemes/${item.scheme_id}`)
                    }}
                  >
                    <img
                      src={`${BASE_URL_APP}${item.scheme_image}`}
                      className="m-1 rounded"
                      width={50}
                    />
                    <div>
                      <div className="font-roboto text-left text-[13px] text-base font-semibold leading-5 tracking-[0.15px]">
                        {item.scheme_name}
                      </div>
                      <div className="font-roboto text-left text-[10px] text-base font-normal leading-4 tracking-[0.15px] text-[#64748B]">
                        {truncateText(item.details, 5)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default GovSchemes;
