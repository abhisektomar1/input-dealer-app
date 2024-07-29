import React, { useEffect, useState } from "react";
import Layout from "../../../layout";
import axios from "axios";
import { BASE_URL_APP } from "../../../utils";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";

function ViewGovScheme() {
  const [data, setData] = useState<any>();
  const { id } = useParams();
  const lan = useAppSelector((state) => state.lan.lan);

  useEffect(() => {
    axios
      .post(`${BASE_URL_APP}/GovtSchemesbyID`, {
        user_language: lan,
        govt_id: id,
      })
      .then((r) => {
        console.log(r);
        if (r.data.message === "Successful") {
          setData(r.data.schemes[0]);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((r) => {
        console.log(r);
        toast.error(r.message);
      });
  }, [lan]);

  const [dataa, setDataa] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .post(`${BASE_URL_APP}/GetallGovtSchemes`, {
        user_language: lan,
      })
      .then((r) => {
        console.log(r);
        if (r.data.status === "success") {
          setDataa(r.data.schemes);
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

  const filteredData = dataa.filter((item: any) =>
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="col-span-12 m-2 rounded bg-white p-4  md:col-span-8">
            <div className="font-bitter py-2  text-[34px] font-medium leading-[41.99px] tracking-[0.25px]">
              {data?.scheme_name}
            </div>
            <img
              src={`${BASE_URL_APP}${data?.image}`}
              className="my-2 rounded"
            />
            <h3 className="py-2 font-medium">Overview</h3>
            <p className="text-left">{data?.details}</p>
            <h3 className="py-2 font-medium">Benefits</h3>
            <p className="text-left">{data?.benefits}</p>
            <h3 className="py-2 font-medium">Eligibility</h3>
            <p className="text-left">{data?.eligibility}</p>
            <h3 className="py-2 font-medium">Application Process</h3>
            <p className="text-left">{data?.application_process}</p>
            <h3 className="py-2 font-medium">Documents required</h3>
            <p className="text-left">{data?.document_require}</p>{" "}
            <div className="flex flex-col items-start justify-start">
              <h3 className="py-2 font-medium">Refrence:</h3>
              <p className="text-left">
                <a
                  href={`${data?.reference}`}
                  target="_blank"
                  className="hover:text-blue-700 hover:underline"
                >
                  {data?.reference}
                </a>
              </p>
            </div>
            <div className="flex flex-row items-center justify-start">
              <h3 className="py-2 font-medium">Aplicationform link:</h3>
              <p className="text-left">
                <a
                  href={`${data?.applicationform_link}`}
                  target="_blank"
                  className="hover:text-blue-700 hover:underline"
                >
                  {data?.applicationform_link}
                </a>
              </p>
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
                    className="mt-1 flex flex-row gap-2 border-b border-gray-300 pb-2"
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
                    className="mt-1 flex flex-row gap-2 border-b border-gray-300 pb-2"
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

export default ViewGovScheme;
