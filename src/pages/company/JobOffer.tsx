import JobOfferSubmissionForm from "../../components/forms/company/jobOfferSubmission";
import JobSubmissionTablebyCompany from "../../components/company/JobSubmissionTablebyCompany.tsx"
const JobSubmissionTable = () => {
  return (
    <div className="w-full h-dvh px-16 pt-24">
      
        <JobOfferSubmissionForm companyId={1} />
      <h2 className="text-slate-500 font-semibold text-2xl">
        <JobSubmissionTablebyCompany companyId={1} />
      </h2>
    </div>
  );
};

export default JobSubmissionTable;
