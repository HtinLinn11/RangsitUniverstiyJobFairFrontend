import JobApplicationForm from "../../components/company/JobApplicationTable";
const JobApprove = () => {
  return (
    
    <div className="w-full h-dvh px-16 pt-24">
      <h2 className="text-slate-500 font-semibold text-2xl">
        <JobApplicationForm companyId={1}/>
      </h2>
    </div>
  );
};

export default JobApprove;

