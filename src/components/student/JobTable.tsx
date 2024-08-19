import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { getJobOffersByFaculty, getUsersById } from '../../utils/apiCalls';
import ApplicationButton from "../forms/student/applyJob";

interface DataType {
  jobOfferId?: any;
  _id?: any;
  jobTitle?: string;
  jobDescription?: string;
  jobType?: string;
  jobLocation?: string;
  additionalInfos?: string;
  createdAt?: any;
  updatedAt?: any;
  approvalStatus?: any;
  __v?: any;
  // Add other job offer properties as needed
  number?: any; // Add number field
  faculty?: any;
  studenttId?: any;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "No.",
    dataIndex: "number",
    key: "number",
    width: "5%",
  },
  {
    title: "Company Name",
    dataIndex: "username",
    key: "username",
    width: "15%",
  },
  {
    title: "Title",
    dataIndex: "jobTitle",
    key: "jobTitle",
    width: "20%",
  },
  {
    title: "Type",
    dataIndex: "jobType",
    key: "jobType",
    width: "15%",
  },
  {
    title: "Location",
    dataIndex: "jobLocation",
    key: "jobLocation",
    width: "15%",
  },
  {
    title: "Description",
    dataIndex: "jobDescription",
    key: "jobDescription",
    width: "25%",
  },
  {
    title: "Info",
    dataIndex: "additionalInfos",
    key: "additionalInfos",
    width: "10%",
  },
  {
    title: "Action",
    key: "action",
    render: (_text: any, record: DataType) => (
      <ApplicationButton jobOfferId={record.jobOfferId} studentId={record.studenttId} faculty={record.faculty} />
    ),
    width: "15%",
  },
];

const JobTable: React.FC<{ faculty: any, studentId: number }> = ({ faculty, studentId }) => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getJobOffersByFaculty(faculty);
        // Add a number field for each job offer

        const jobOffersWithUsernames = await Promise.all(result.map(async (offer: any, index :number) => {
          const user = await getUsersById(offer.companyId); 
          return {
            ...offer,
            username: user?.username, // Add the username to the job offer data
            studenttId: studentId,
            number: index+1,
          };
        }));
        setData(jobOffersWithUsernames);
      } catch (error) {
        console.error("Error fetching job offers:", error);
      }
    };

    fetchData();
  }, [faculty]);

  return (
    <div className="w-full 2xl:w-[1400px] px-5 hidden lg:block m-auto">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id" // Ensure you have a unique key
      />
    </div>
  );
};

export default JobTable;
