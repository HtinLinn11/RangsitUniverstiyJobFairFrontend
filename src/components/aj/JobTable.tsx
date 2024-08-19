import React, { useEffect, useState } from "react";
import { Table, Button, Modal, notification } from "antd";
import type { TableColumnsType } from "antd";
import { getAllJobOffersUnapproved, getUsersById, approveJobOfferUnapprovedById } from '../../utils/apiCalls';
import JobOfferForm from '../forms/aj/jobOfferApproval'; // Updated import

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
  faculty?: any;
  username?: string; // Add username field
  number?: any; // Add number field
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
      <JobOfferForm jobOfferData={{ jobTitle: record.jobTitle, faculty: record.faculty, jobDescription: record.jobDescription, jobOfferId: record.jobOfferId }} />
    ),
    width: "15%",
  },
];

const JobTable: React.FC<{ faculty: string }> = ({ faculty }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobOffers = await getAllJobOffersUnapproved();
        
        // Fetch usernames for each job offer
        const jobOffersWithUsernames = await Promise.all(jobOffers.map(async (offer: any, index :number) => {
          const user = await getUsersById(offer.companyId); 
          return {
            ...offer,
            username: user?.username, // Add the username to the job offer data
            number: index+1,
          };
        }));

        // Add a number field for each job offer
        const formattedData = jobOffersWithUsernames.map((item: any, index: number) => ({
          ...item,
          faculty,
          number: index + 1, // Adding index as the number
        }));
        
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching job offers:", error);
      }
    };

    fetchData();
  }, [faculty]);

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
  };

  const handleButtonClick = () => {
    Modal.confirm({
      title: 'Approve All Selected',
      content: 'Are you sure you want to approve all selected job offers?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          // Approve all selected job offers
          await Promise.all(selectedRowKeys.map(async (key: any) => {
            const selectedOffer = data.find(offer => offer._id === key);
            if (selectedOffer) {
              await approveJobOfferUnapprovedById(selectedOffer.jobOfferId, faculty);
            }
          }));

          // Log the list of job offer IDs
          const jobOfferIds = selectedRowKeys.map((key: any) => {
            const selectedOffer = data.find(offer => offer._id === key);
            return selectedOffer?.jobOfferId;
          }).filter((id: any) => id);

          console.log("Approved job offer IDs:", jobOfferIds);

          // Show success notification
          notification.success({
            message: 'Success',
            description: 'Selected job offers have been approved successfully.',
            placement: 'bottomRight',
          });

          // Unselect all rows
          setSelectedRowKeys([]);
        } catch (error) {
          console.error("Error approving job offers:", error);
        }
      },
    });
  };

  return (
    <div className="w-full 2xl:w-[1400px] px-5 hidden lg:block m-auto">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id" // Ensure you have a unique key
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data.length,
          onChange: handleTableChange,
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
      />
      <Button 
        onClick={handleButtonClick}
        className="mb-8 px-6 py-5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        style={{ backgroundColor: '#5A7131' }}
      >
        Approve All Selected
      </Button>
    </div>
  );
};

export default JobTable;
