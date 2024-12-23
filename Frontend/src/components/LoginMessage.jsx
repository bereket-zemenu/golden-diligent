import PageNav from "./PageNav";

function LoginMessage() {
  return (
    <div className="relative">
      <PageNav />
      <p className="text-blue-500 mt-[200px] text-center font-Poppins phone:text-sm tablet:text-3xl laptop:text-3xl m-auto">
        We are reviewing your information
        <br /> please wait patiently
      </p>
    </div>
  );
}

export default LoginMessage;
