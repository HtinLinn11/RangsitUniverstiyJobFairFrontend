import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { getInterviewsByStudentId, getUsersById, getApplicationsById, getJobOffersUnapprovedById } from '../../utils/apiCalls';

interface DataType {
  _id?: any;
  companyId?: any;
  applicationId?: any;
  studentId?: any;
  interviewTime?: any;
  interviewLocation?: any;
  faculty?: any;
  status?: any;
  createdAt?: any;
  updatedAt?: any;
  interviewId?: any;
  __v?: any;
  number?: any; // Add number field
  username?: string; // Add username field
  jobTitle?: string; // Add job title field
  jobDescription?: string; // Add job description field
}

const columns: TableColumnsType<DataType> = [
  {
    title: "No.",
    dataIndex: "number",
    key: "number",
    width: "5%",
  },
  {
    title: "Job Title",
    dataIndex: "jobTitle",
    key: "jobTitle",
    width: "20%",
  },
  {
    title: "Company Name",
    dataIndex: "username",
    key: "username",
    width: "20%",
  },
  {
    title: "Interview Time",
    dataIndex: "interviewTime",
    key: "interviewTime",
    width: "20%",
  },
  {
    title: "Interview Location",
    dataIndex: "interviewLocation",
    key: "interviewLocation",
    render: (text: any, record: DataType) => (
      record.status === "scheduled" ? text : "Coming Soon"
    ),
    width: "20%",
  },
  {
    title: "Faculty",
    dataIndex: "faculty",
    key: "faculty",
    width: "15%",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "scheduled" ? "green" : "orange"}>
        {status === "scheduled" ? "Scheduled" : "Processing"}
      </Tag>
    ),
    width: "15%",
  },
];

const InterviewTable: React.FC<{ studentId: number }> = ({ studentId }) => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const interviews = await getInterviewsByStudentId(studentId);

        // Fetch additional data for each interview
        const enrichedData = await Promise.all(
          interviews.map(async (interview: DataType) => {
            const user = await getUsersById(interview.companyId);
            const application = await getApplicationsById(interview.applicationId);
            const jobOffer = application ? await getJobOffersUnapprovedById(application.jobOfferId) : {jobTitle: "Unavailable"};
            
            return {
              ...interview,
              username: user?.username, // Add username to the interview data
              jobTitle: jobOffer?.jobTitle, // Add job title from job offer
              number: interviews.indexOf(interview) + 1, // Adding index as the number
            };
          })
        );

        setData(enrichedData);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };

    fetchData();
  }, [studentId]);

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

export default InterviewTable;
