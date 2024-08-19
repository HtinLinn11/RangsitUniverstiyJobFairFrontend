import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { getJobOffersUnapprovedByCompanyId, getApplicationsByJobOfferId, getJobOffersUnapprovedById, getUsersById } from '../../utils/apiCalls';
import InterviewForm from "../forms/company/interviewSubmission";

interface DataType {
  _id?: any;
  jobOfferId?: any;
  studentId?: any;
  resumeURL?: any;
  faculty?: any;
  approvalStatus?: any;
  createdAt?: any;
  updatedAt?: any;
  applicationId?: any;
  __v?: any;
  number?: any; // Add number field
  jobTitle?: string; // Add job title field
  username?: string; // Add username field
  companyId?: any;
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
    title: "Student Name",
    dataIndex: "username",
    key: "username",
    width: "15%",
  },
  {
    title: "Faculty",
    dataIndex: "faculty",
    key: "faculty",
    width: "15%",
  },
  {
    title: "Resume URL",
    dataIndex: "resumeURL",
    key: "resumeURL",
    width: "25%",
    render: (url: string) => (
      url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Click to View Resume
        </a>
      ) : (
        'No Resume Available'
      )
    ),
  },
  {
    title: "Interview Status",
    dataIndex: "approvalStatus",
    key: "approvalStatus",
    width: "15%",
    render: (status: string) => (
      <Tag color={status === "approved" ? "green" : "orange"}>
        {status === "approved" ? "Scheduled" : "Processing"}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_text: any, record: DataType) => (
      <InterviewForm
        interviewData={{
          companyId: record.companyId,
          applicationId: record.applicationId,
          studentId: record.studentId,
          faculty: record.faculty,
          username: record.username,
          jobTitle: record.jobTitle,
        }}
      />
    ),
    width: "15%",
  },
];

const JobTable: React.FC<{ companyId: number }> = ({ companyId }) => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch job offers by company ID
        const jobOffers = await getJobOffersUnapprovedByCompanyId(companyId);
        const jobOfferIds = jobOffers.map((offer: any) => offer.jobOfferId);

        // Fetch applications and enrich with job title and username
        const applications = await Promise.all(
          jobOfferIds.map(async (jobOfferId: any) => {
            const applicationsForOffer = await getApplicationsByJobOfferId(jobOfferId);
            const jobOffer = await getJobOffersUnapprovedById(jobOfferId);
            const jobTitle = jobOffer?.jobTitle;
            const companyId = jobOffer?.companyId;

            return Promise.all(
              applicationsForOffer.map(async (application: any) => {
                const user = await getUsersById(application.studentId);
                const username = user?.username;
                const faculty = user?.faculty; // Fetch faculty for each application

                return {
                  ...application,
                  jobTitle,
                  username,
                  faculty,
                  companyId,
                };
              })
            );
          })
        );

        // Flatten the array of application lists
        const flattenedApplications = applications.flat();

        // Add a number field for each application
        const formattedData = flattenedApplications.map((item, index) => ({
          ...item,
          number: index + 1,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching job offers and applications:", error);
      }
    };

    fetchData();
  }, [companyId]);

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
