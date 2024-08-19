import InterviewTable from "../../components/student/JobTable"
const Interview = () => {
  return (
    <div className="w-full h-dvh px-16 pt-24">
      <h2 className="text-slate-500 font-semibold text-2xl">
        <InterviewTable faculty={"OFFICE_OF_ALUMNI_AND_COMMUNITY_RELATIONS"} studentId={1} />
      </h2>
    </div>
  );
};

export default Interview;
