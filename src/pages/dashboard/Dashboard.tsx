import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Area, AreaChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import axiosInstance from "../../service/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import axios from "axios";
import { BASE_URL_APP } from "../../utils";

function Dashboard() {
  const [data, setData] = useState<any>([]);
  const [data2, setData2] = useState<any>([]);
  const [data4, setData4] = useState<any>([]);
  const [data5, setData5] = useState<any>([]);

  const [filter, setFilter] = useState<string>("Online");
  const [filter2, setFilter2] = useState<string>("Online");
  const [filter4, setFilter4] = useState<string>("Agricultural Inputs");
  const [filter5, setFilter5] = useState<string>("Online");

  console.log(data5, filter5);

  useEffect(() => {
    axiosInstance
      .post(`/FPOInventoryinstock`, {
        filter_type: filter,
      })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, [filter]);

  useEffect(() => {
    axiosInstance
      .post(`/FPOInventoryoutstock`, {
        filter_type: filter2,
      })
      .then((res) => {
        if (res.status === 200) {
          setData2(res.data);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, [filter2]);


  useEffect(() => {
    axiosInstance
      .post(`/GetTotalSalesByFPOMonth`, {
        filter_type: filter4,
      })
      .then((res) => {
        if (res.status === 200) {
          setData4(res.data);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, [filter4]);

  useEffect(() => {
    axiosInstance
      .post(`/GetTotalSalesByFPO`, {
        filter_type: filter5,
        sales_status: filter4,
      })
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          setData5(res.data);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, [filter4, filter5]);

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "green",
    },
  } satisfies ChartConfig;
  // const chartData = [
  //   { month: "January", desktop: 186 },
  //   { month: "February", desktop: 305 },
  //   { month: "March", desktop: 237 },
  //   { month: "April", desktop: 73 },
  //   { month: "May", desktop: 209 },
  //   { month: "June", desktop: 214 },
  // ];
  function processApiData(apiResponse: any) {
    // Create an object to hold the total amount for each month
    const monthlyTotals: any = {};

    // Process each sale
    apiResponse?.sales?.forEach((sale: any) => {
      // Parse the date
      const date = new Date(sale.sales_date);
      // Get the month name
      const monthName = date.toLocaleString("default", { month: "long" });

      // If this month doesn't exist in our totals yet, initialize it
      if (!monthlyTotals[monthName]) {
        monthlyTotals[monthName] = 0;
      }

      // Add this sale's amount to the month's total
      monthlyTotals[monthName] += sale.total_amount;
    });

    // Convert the monthlyTotals object into an array of objects
    const chartData = Object.entries(monthlyTotals).map(
      ([month, total]: any) => ({
        month: month,
        desktop: Math.round(total), // Rounding to whole numbers, remove if you want decimals
      }),
    );

    return chartData;
  }

  const chartData = processApiData(data4);


  return (
    <Layout>
      <div className="relative grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-12 md:col-span-8">
          <div className="space-y-2 bg-gray-100 p-4">
            <h1 className="text-2xl font-bold">
              Business Performance Dashboard
            </h1>
            <Card>
              <CardHeader className="flex justify-between">
                <div>
                  <CardTitle>Sales Insights</CardTitle>
                
                  <CardDescription className="py-2 flex flex-row justify-between items-center">
                    <Tabs defaultValue="account">
                      <TabsList>
                        <TabsTrigger
                          onClick={() => setFilter4("Agricultural Inputs")}
                          value="account"
                        >
                          Agricultural Inputs
                        </TabsTrigger>
                        <TabsTrigger
                          onClick={() => setFilter4("Crops")}
                          value="password"
                        >
                          Crops
                        </TabsTrigger>
                        <TabsTrigger
                          onClick={() => setFilter4("Finish Goods")}
                          value="regt"
                        >
                          Finished Product
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Tabs defaultValue="account" className="my-2">
                    <TabsList>
                      <TabsTrigger
                        value="account"
                        onClick={() => setFilter5("Online")}
                      >
                        Online
                      </TabsTrigger>
                      <TabsTrigger
                        value="password"
                        onClick={() => setFilter5("Offline")}
                      >
                        Ofline
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center space-x-2">
                    <PackageIcon className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium">Total Sales</p>
                      <p className="text-lg font-bold">
                        {data5?.sales_count} (Units)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSignIcon className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium">Total Sales Amount</p>
                      <p className="text-lg font-bold">
                        ₹{data5?.total_sales_amount}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PieChartIcon className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Total Profit</p>
                      <p className="text-lg font-bold">
                        ₹{data5?.total_profit}
                      </p>
                    </div>
                  </div>
                </div>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <AreaChart
                      accessibilityLayer
                      data={chartData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <YAxis aria-activ />

                      <ChartTooltip
                        cursor={true}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <Area
                        dataKey="desktop"
                        type="natural"
                        fill="var(--color-desktop)"
                        fillOpacity={0.2}
                        stroke="var(--color-desktop)"
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>

                {/* <LinechartChart className="aspect-[4/3] w-full" /> */}
              </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-2 ">
              <Card>
                <CardHeader className="flex justify-between pb-1 pt-4">
                  <div>
                    <CardTitle>In Stock</CardTitle>
                    <CardDescription>
                      <Tabs defaultValue="account" className="my-2">
                        <TabsList>
                          <TabsTrigger
                            value="account"
                            onClick={() => setFilter("Online")}
                          >
                            Online
                          </TabsTrigger>
                          <TabsTrigger
                            value="password"
                            onClick={() => setFilter("Offline")}
                          >
                            Ofline
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="h-[170px] overflow-y-auto">
                  {data?.InStock?.map((item: any) => (
                    <>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {item.productname}
                          </p>
                          <p className="font-medium">{item.stock}</p>
                        </div>
                        <div>
                          <p className="text-right text-sm text-muted-foreground">
                            Ex. Date
                          </p>
                          <p className="font-medium">{item.expiry_date}</p>
                        </div>
                      </div>
                    </>
                  ))}
                </CardContent>
                <CardFooter className="mt-8 flex justify-between  pt-2">
                  <div className="flex items-center space-x-2">
                    <PackageIcon className="h-5 w-5 text-blue-500" />
                    <p className="text-sm font-medium">{data?.InStockTotal}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total Stock In
                  </p>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex justify-between pb-1 pt-4">
                  <div>
                    <CardTitle>Out Stock</CardTitle>
                    <CardDescription>
                      <Tabs defaultValue="account" className="my-2">
                        <TabsList>
                          <TabsTrigger
                            value="account"
                            onClick={() => setFilter2("Online")}
                          >
                            Online
                          </TabsTrigger>
                          <TabsTrigger
                            value="password"
                            onClick={() => setFilter2("Offline")}
                          >
                            Ofline
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="h-[170px] overflow-y-auto">
                  {data2?.OutofStock?.map((item: any) => (
                    <>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {item.productname}
                          </p>
                          <p className="font-medium">{item.stock}</p>
                        </div>
                        <div>
                          <p className="text-right text-sm text-muted-foreground">
                            Ex. Date
                          </p>
                          <p className="font-medium">{item.expiry_date}</p>
                        </div>
                      </div>
                    </>
                  ))}
                </CardContent>
                <CardFooter className="mt-8 flex justify-between  pt-2">
                  <div className="flex items-center space-x-2">
                    <PackageIcon className="h-5 w-5 text-blue-500" />
                    <p className="text-sm font-medium">
                      {data2?.OutStockTotal}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total Stock In
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        <div className="col-span-12 p-4 md:col-span-4">
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;

function DollarSignIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function LinechartChart(props: any) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "#a49d9d",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function PieChartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
