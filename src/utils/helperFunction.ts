import axios, { AxiosResponse } from "axios";

const BASE_URL: any = "http://localhost:3000/api";

interface UserData {
  userId?: any;
  // Add other user properties as needed
}

interface JobOfferUnapprovedData {
    jobOfferId?: any;
    _id?: any;
    jobTitle?: string;
    jobDescription?: string;
    companyId?: number;
    faculty?: string;
    jobType?: string;
    jobLocation?: string;
    additionalInfos?: string;
    createdAt?: any;
    updatedAt?: any;
    approvalStatus?: any;
    __v?: any;
    // Add other job offer properties as needed
}

interface JobOfferData {
  jobOfferId?: any;
  _id?: any;
  jobTitle?: string;
  jobDescription?: string;
  companyId?: number;
  faculty?: string;
  jobType?: string;
  jobLocation?: string;
  additionalInfos?: string;
  createdAt?: any;
  updatedAt?: any;
  approvalStatus?: any;
  __v?: any;
  // Add other job offer properties as needed
}

interface ApplicationData {
  applicationId?: any;
  // Add other application properties as needed
}

interface InterviewData {
  interviewId?: any;
  // Add other interview properties as needed
}

async function createUser(userData: UserData): Promise<any> {
  try {
    const response: AxiosResponse = await axios.post(
      `${BASE_URL}/users`,
      userData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error creating user:", {
      message: error.message,
      response: error.response
        ? {
            status: error.response.status,
            data: error.response.data,
          }
        : "No response data",
    });
    throw error;
  }
}

async function deleteAllUsers(): Promise<void> {
  try {
    const users: UserData[] = await getAllUsers();
    const deletePromises: Promise<any>[] = users.map((user) => {
      return deleteUserById(user.userId!);
    });
    const results: any[] = await Promise.all(deletePromises);
    console.log("All users deleted:", results);
  } catch (error) {
    console.error("Error deleting all users:", error);
  }
}

async function getAllUsers(): Promise<UserData[]> {
  try {
    const response: AxiosResponse = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching users:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function getUserById(userId: any): Promise<UserData> {
  try {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/users/${userId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function updateUserById(userId: any, userData: UserData): Promise<any> {
  try {
    const response: AxiosResponse = await axios.patch(
      `${BASE_URL}/users/${userId}`,
      userData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function deleteUserById(userId: any): Promise<any> {
  try {
    const response: AxiosResponse = await axios.delete(
      `${BASE_URL}/users/${userId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error deleting user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function createJobOfferUnapproved(jobOfferData: JobOfferUnapprovedData): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(
        `${BASE_URL}/joboffersunapproved`,
        jobOfferData
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating job offer:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

async function createJobOffer(jobOfferData: JobOfferData): Promise<any> {
  try {
    const response: AxiosResponse = await axios.post(
      `${BASE_URL}/joboffers`,
      jobOfferData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating job offer:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function getAllJobOffers(): Promise<JobOfferData[]> {
  try {
    const response: AxiosResponse = await axios.get(`${BASE_URL}/joboffers`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching job offers:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function deleteAllJobOffers(): Promise<void> {
  try {
    const jobs: JobOfferData[] = await getAllJobOffers();
    const deletePromises: Promise<any>[] = jobs.map((job) => {
      return deleteJobOfferById(job.jobOfferId!);
    });
    const results: any[] = await Promise.all(deletePromises);
    console.log("All job offers deleted:", results);
  } catch (error) {
    console.error("Error deleting all job offers:", error);
  }
}

async function getJobOfferById(jobOfferId: any): Promise<JobOfferData> {
  try {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/joboffers/${jobOfferId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching job offer:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function updateJobOfferById(
  jobOfferId: any,
  jobOfferData: JobOfferData
): Promise<any> {
  try {
    const response: AxiosResponse = await axios.patch(
      `${BASE_URL}/joboffers/${jobOfferId}`,
      jobOfferData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating job offer:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function deleteJobOfferById(jobOfferId: any): Promise<any> {
  try {
    const response: AxiosResponse = await axios.delete(
      `${BASE_URL}/joboffers/${jobOfferId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error deleting job offer:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function updateJobOfferApprovalStatus(
  jobOfferId: any,
  approvalStatus: any
): Promise<any> {
  try {
    const response: AxiosResponse = await axios.patch(
      `${BASE_URL}/joboffers/${jobOfferId}/approve`,
      {
        approvalStatus: approvalStatus,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating job offer approval status:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function bulkUpdateJobOfferStatus(
  jobOfferIds: any[],
  approvalStatus: any
): Promise<any[]> {
  try {
    const validStatuses: any[] = ["approved", "rejected"];
    if (!validStatuses.includes(approvalStatus)) {
      throw new Error(
        `Invalid approval status: ${approvalStatus}. Must be 'approved' or 'rejected'.`
      );
    }

    const updatePromises: Promise<any>[] = jobOfferIds.map((jobOfferId) => {
      return updateJobOfferApprovalStatus(jobOfferId, approvalStatus);
    });

    const results: any[] = await Promise.all(updatePromises);
    console.log(
      `${
        approvalStatus.charAt(0).toUpperCase() + approvalStatus.slice(1)
      } job offers:`,
      results
    );
    return results;
  } catch (error: any) {
    console.error(
      `Error bulk ${
        approvalStatus === "approved" ? "approving" : "disapproving"
      } job offers:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function createApplication(
  applicationData: ApplicationData
): Promise<any> {
  try {
    const response: AxiosResponse = await axios.post(
      `${BASE_URL}/applications`,
      applicationData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating application:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function deleteAllApplications(): Promise<void> {
  try {
    const applications: ApplicationData[] = await getAllApplications();
    const deletePromises: Promise<any>[] = applications.map((application) => {
      return deleteApplicationById(application.applicationId!);
    });
    const results: any[] = await Promise.all(deletePromises);
    console.log("All applications deleted:", results);
  } catch (error) {
    console.error("Error deleting all applications:", error);
  }
}

async function getAllApplications(): Promise<ApplicationData[]> {
  try {
    const response: AxiosResponse = await axios.get(`${BASE_URL}/applications`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching applications:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function getApplicationById(
  applicationId: any
): Promise<ApplicationData> {
  try {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/applications/${applicationId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching application:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function updateApplicationById(
  applicationId: any,
  applicationData: ApplicationData
): Promise<any> {
  try {
    const response: AxiosResponse = await axios.patch(
      `${BASE_URL}/applications/${applicationId}`,
      applicationData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating application:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function deleteApplicationById(applicationId: any): Promise<any> {
  try {
    const response: AxiosResponse = await axios.delete(
      `${BASE_URL}/applications/${applicationId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error deleting application:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function updateApplicationApprovalStatus(
  applicationId: any,
  approvalStatus: any
): Promise<any> {
  try {
    const response: AxiosResponse = await axios.patch(
      `${BASE_URL}/applications/${applicationId}/approve`,
      {
        approvalStatus: approvalStatus,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating application approval status:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function bulkUpdateApplicationStatus(
  applicationIds: any[],
  approvalStatus: any
): Promise<any[]> {
  try {
    const validStatuses: any[] = ["approved", "rejected"];
    if (!validStatuses.includes(approvalStatus)) {
      throw new Error(
        `Invalid approval status: ${approvalStatus}. Must be 'approved' or 'rejected'.`
      );
    }

    const updatePromises: Promise<any>[] = applicationIds.map(
      (applicationId) => {
        return updateApplicationApprovalStatus(applicationId, approvalStatus);
      }
    );

    const results: any[] = await Promise.all(updatePromises);
    console.log(
      `${
        approvalStatus.charAt(0).toUpperCase() + approvalStatus.slice(1)
      } applications:`,
      results
    );
    return results;
  } catch (error: any) {
    console.error(
      `Error bulk ${
        approvalStatus === "approved" ? "approving" : "disapproving"
      } applications:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function createInterview(interviewData: InterviewData): Promise<any> {
  try {
    const response: AxiosResponse = await axios.post(
      `${BASE_URL}/interviews`,
      interviewData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating interview:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function getAllInterviews(): Promise<InterviewData[]> {
  try {
    const response: AxiosResponse = await axios.get(`${BASE_URL}/interviews`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching interviews:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function getInterviewById(interviewId: any): Promise<InterviewData> {
  try {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/interviews/${interviewId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching interview:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function updateInterviewById(
  interviewId: any,
  interviewData: InterviewData
): Promise<any> {
  try {
    const response: AxiosResponse = await axios.patch(
      `${BASE_URL}/interviews/${interviewId}`,
      interviewData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating interview:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function deleteInterviewById(interviewId: any): Promise<any> {
  try {
    const response: AxiosResponse = await axios.delete(
      `${BASE_URL}/interviews/${interviewId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error deleting interview:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function getUsersByFaculty(faculty: any): Promise<any[]> {
  try {
    const response: AxiosResponse = await axios.get("/users", {
      params: { faculty },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching users by faculty:", error);
    throw error;
  }
}

async function getJobOffersByFaculty(faculty: any): Promise<any[]> {
  try {
    const response: AxiosResponse = await axios.get("/joboffers", {
      params: { faculty },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching job offers by faculty:", error);
    throw error;
  }
}

async function getApplicationsByFaculty(faculty: any): Promise<any[]> {
  try {
    const response: AxiosResponse = await axios.get("/applications", {
      params: { faculty },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching applications by faculty:", error);
    throw error;
  }
}

async function getInterviewsByFaculty(faculty: any): Promise<any[]> {
  try {
    const response: AxiosResponse = await axios.get("/interviews", {
      params: { faculty },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching interviews by faculty:", error);
    throw error;
  }
}

async function deleteAllInterviews(): Promise<void> {
  try {
    const interviews: InterviewData[] = await getAllInterviews();
    const deletePromises: Promise<any>[] = interviews.map((interview) => {
      return deleteInterviewById(interview.interviewId!);
    });
    const results: any[] = await Promise.all(deletePromises);
    console.log("All interviews deleted:", results);
  } catch (error) {
    console.error("Error deleting all interviews:", error);
  }
}

export {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  deleteAllUsers,
  getUsersByFaculty,
  createJobOffer,
  getAllJobOffers,
  getJobOfferById,
  updateJobOfferById,
  deleteJobOfferById,
  updateJobOfferApprovalStatus,
  bulkUpdateJobOfferStatus,
  deleteAllJobOffers,
  getJobOffersByFaculty,
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationById,
  deleteApplicationById,
  updateApplicationApprovalStatus,
  bulkUpdateApplicationStatus,
  deleteAllApplications,
  getApplicationsByFaculty,
  createInterview,
  getAllInterviews,
  getInterviewById,
  updateInterviewById,
  deleteInterviewById,
  deleteAllInterviews,
  getInterviewsByFaculty,
  createJobOfferUnapproved,
};
