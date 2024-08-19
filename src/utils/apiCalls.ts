import axios, { AxiosResponse } from "axios";

const BASE_URL: any = "https://rangsituniversityjobfair.onrender.com/api";

interface UserData {
    userId?: any; // Changed to number type
    _id?: any;
    userType?: string; // New field
    username?: string; // New field
    password?: string; // New field
    email?: string; // New field
    faculty?: string;
    createdAt?: any;
    updatedAt?: any;
    studentId?: any;
    __v?: any;
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
    connectedId?: any;
    __v?: any;
  // Add other job offer properties as needed
}

interface ApplicationData {
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
}

interface InterviewData {
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

async function createApplication(applicationData: ApplicationData): Promise<any> {
    try {
      console.log("SJDFLSadsfdsafddsafsafdDJF", applicationData)
      const response: AxiosResponse = await axios.post(
        `${BASE_URL}/applications`,
        applicationData
      );
      console.log("SJDFLSDJF", applicationData)
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating application:",
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

async function getUsersById(id: number | string): Promise<UserData> {
    try {
      const response: AxiosResponse<UserData> = await axios.get(`${BASE_URL}/users/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching users:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

async function getApplicationsByJobOfferId(jobOfferId: number): Promise<JobOfferData[]> {
    try {
      const response: AxiosResponse<JobOfferData[]> = await axios.get(`${BASE_URL}/applications`, {
        params: { jobOfferId },
      });
      const filteredData = response.data.filter(offer => offer.jobOfferId === jobOfferId);
      return filteredData;
    } catch (error: any) {
      console.error(
        "Error fetching job offers:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

async function getApplicationsById(id: number | string): Promise<ApplicationData> {
    try {
      const response: AxiosResponse<ApplicationData> = await axios.get(`${BASE_URL}/applications/${id}`);
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
    partialData: any
  ): Promise<any> {
    try {
      // Fetch the current application data
      const currentApplication = await axios.get(`${BASE_URL}/applications/${applicationId}`);
      
      // Merge the current data with the partial update
      const applicationData = {
        ...currentApplication.data,
        ...partialData,
      };
  
      // Now make the PATCH request with all required fields
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
  
async function approveApplicationById(applicationId: number | string, interviewData: any): Promise<InterviewData> {
    try {
        // Update the approval status of the unapproved job offer
        await updateApplicationById(applicationId, { approvalStatus: 'approved' });

        const newInterview: InterviewData = {

            companyId: interviewData.companyId,
            applicationId: interviewData.applicationId,
            studentId: interviewData.studentId,
            interviewTime: interviewData.interviewTime,
            interviewLocation: 'Coming Soon',
            faculty: interviewData.faculty,
            status: 'pending'
        };

        // Create a new interview with the updated data
        const response2: AxiosResponse<InterviewData> = await createInterview(newInterview);

        // Return the newly created interview data
        return response2.data;

    } catch (error: any) {
        console.error('Error processing job offer approval:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function getAllJobOffersUnapproved(): Promise<JobOfferData[]> {
    try {
      const response: AxiosResponse = await axios.get(`${BASE_URL}/joboffersunapproved`);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching job offers:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

async function getJobOffersUnapprovedById(id: number | string): Promise<JobOfferData> {
    try {
      const response: AxiosResponse<JobOfferData> = await axios.get(`${BASE_URL}/joboffersunapproved/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching job offers:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

async function getJobOffersUnapprovedByCompanyId(companyId: number): Promise<JobOfferData[]> {
    try {
      const response: AxiosResponse<JobOfferData[]> = await axios.get(`${BASE_URL}/joboffersunapproved`, {
        params: { companyId },
      });
      const filteredData = response.data.filter(offer => offer.companyId === companyId);
      return filteredData;
    } catch (error: any) {
      console.error(
        "Error fetching job offers:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

async function updateJobOfferUnapprovedById(
    jobOfferId: any,
    partialData: any
  ): Promise<any> {
    try {
      // Fetch the current application data
      const currentApplication = await axios.get(`${BASE_URL}/joboffersunapproved/${jobOfferId}`);
      
      // Merge the current data with the partial update
      const applicationData = {
        ...currentApplication.data,
        ...partialData,
      };
  
      // Now make the PATCH request with all required fields
      const response: AxiosResponse = await axios.patch(
        `${BASE_URL}/joboffersunapproved/${jobOfferId}`,
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

async function approveJobOfferUnapprovedById(jobOfferId: number | string, faculty: string): Promise<JobOfferData> {
    try {
        // Fetch the unapproved job offer by ID
        const response: AxiosResponse<JobOfferUnapprovedData> = await axios.get(`${BASE_URL}/joboffersunapproved/${jobOfferId}`);

        // Update the approval status of the unapproved job offer
        await updateJobOfferUnapprovedById(jobOfferId, { approvalStatus: 'approved' });

        const newJobOffer: JobOfferData = {
            jobTitle: response.data.jobTitle,
            jobDescription: response.data.jobDescription,
            faculty: faculty,
            jobType: response.data.jobType,
            jobLocation: response.data.jobLocation,
            companyId: response.data.companyId,
            approvalStatus: 'approved',
            additionalInfos: response.data.additionalInfos,
            connectedId: jobOfferId,
        };

        // Create a new job offer with the updated data
        const response2: AxiosResponse<JobOfferData> = await createJobOffer(newJobOffer);

        // Return the newly created job offer data
        return response2.data;

    } catch (error: any) {
        console.error('Error processing job offer approval:', error.response ? error.response.data : error.message);
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

async function getJobOffersByFaculty(faculty: string): Promise<JobOfferData[]> {
    try {
      const response: AxiosResponse<JobOfferData[]> = await axios.get(`${BASE_URL}/joboffers`, {
        params: { faculty },
      });
      console.log(response)
      const filteredData = response.data.filter(offer => offer.faculty === faculty);
      return filteredData;
    } catch (error: any) {
      console.error(
        "Error fetching job offers:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

async function getJobOffersById(id: number | string): Promise<JobOfferData> {
    try {
      const response: AxiosResponse<JobOfferData> = await axios.get(`${BASE_URL}/joboffers/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching job offers:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

async function getJobOffersByCompanyId(companyId: number): Promise<JobOfferData[]> {
    try {
      const response: AxiosResponse<JobOfferData[]> = await axios.get(`${BASE_URL}/joboffers`, {
        params: { companyId }
      });
      const filteredData = response.data.filter(offer => offer.companyId === companyId);
      return filteredData;
    } catch (error: any) {
      console.error(
        "Error fetching job offers:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

async function getInterviewById(id: number | string): Promise<InterviewData> {
    try {
      const response: AxiosResponse<JobOfferData> = await axios.get(`${BASE_URL}/interviews/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching interviews:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

async function getInterviewsByCompanyId(companyId: number): Promise<InterviewData[]> {
    try {
      const response: AxiosResponse<InterviewData[]> = await axios.get(`${BASE_URL}/interviews`, {
        params: { companyId },
      });
      const filteredData = response.data.filter(offer => offer.companyId === companyId);
      return filteredData;
    } catch (error: any) {
      console.error(
        "Error fetching interview:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

async function getInterviewsByFaculty(faculty: string): Promise<InterviewData[]> {
    try {
      const response: AxiosResponse<InterviewData[]> = await axios.get(`${BASE_URL}/interviews`, {
        params: { faculty },
      });
      const filteredData = response.data.filter(offer => offer.faculty === faculty);
      return filteredData;
    } catch (error: any) {
      console.error(
        "Error fetching interview:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

async function getInterviewsByStudentId(studentId: number): Promise<InterviewData[]> {
    try {
      const response: AxiosResponse<InterviewData[]> = await axios.get(`${BASE_URL}/interviews`, {
        params: { studentId },
      });
      const filteredData = response.data.filter(offer => offer.studentId === studentId);
      return filteredData;
    } catch (error: any) {
      console.error(
        "Error fetching interview:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

export {
  createUser,
  createJobOfferUnapproved,
  createJobOffer,
  createApplication,
  createInterview,

  getUsersById,

  getAllJobOffersUnapproved,
  getJobOffersUnapprovedById,
  getJobOffersUnapprovedByCompanyId,
  updateJobOfferUnapprovedById,
  approveJobOfferUnapprovedById,

  getApplicationsByJobOfferId,
  getApplicationsById,
  approveApplicationById,

  getAllJobOffers,
  getJobOffersById,
  getJobOffersByCompanyId,
  getJobOffersByFaculty,

  getInterviewById,
  getInterviewsByCompanyId, getInterviewsByFaculty, getInterviewsByStudentId,
};