import InterviewTable from "../../components/forms/ad/createUserForm"
const Interview = () => {
  return (
    <div className="w-full h-dvh px-16 pt-24">
      <h2 className="text-slate-500 font-semibold text-2xl">
        <InterviewTable userData_usertype={"admin"} />
      </h2>
    </div>
  );
};

export default Interview;

