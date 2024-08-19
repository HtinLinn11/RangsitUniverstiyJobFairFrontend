import InterviewTable from "../../components/company/InterviewTable.tsx"
const Interview = () => {
  return (
    <div className="w-full h-dvh px-16 pt-24">
      <h2 className="text-slate-500 font-semibold text-2xl">
        <InterviewTable companyId={1} />
      </h2>
    </div>
  );
};

export default Interview;
