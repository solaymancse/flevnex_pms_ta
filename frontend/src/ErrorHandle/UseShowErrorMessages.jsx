import { array } from "prop-types";

const UseShowErrorMessages = ({ errorMessages }) => {
  return (
    <>
      {errorMessages?.map((errorMessage, index) => (
        <div
          key={index}
          className="my-5 mx-4 px-4 rounded-md border-l-4 border-red-500 bg-[#fff3ee] md:max-w-2xl md:mx-auto md:px-8"
        >
          <div className="flex justify-between py-3">
            <div className="flex">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="self-center ml-3">
                <span className="text-red-600 font-semibold">Error</span>
                <p className="text-red-600 mt-1">{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

UseShowErrorMessages.propTypes = {
  errorMessages: array,
};

export default UseShowErrorMessages;
