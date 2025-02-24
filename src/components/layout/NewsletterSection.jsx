import React, { useState } from "react";

function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
  };

  return (
    <div className="flex flex-col items-center px-20 pt-12 pb-4 w-full bg-black max-md:px-5 max-md:max-w-full">
      <div className="w-full max-w-[1400px] max-md:max-w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-5 justify-between w-full text-white max-md:max-w-full"
        >
          <div className="flex flex-col leading-none max-md:max-w-full">
            <h2 className="text-4xl font-medium max-md:max-w-full">
              Sign Up To Our Newsletter.
            </h2>
            <p className="self-start mt-2.5 text-base font-light text-center">
              Be the first to hear about the latest offers.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 self-end mt-6 text-sm text-center max-md:max-w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="grow shrink-0 px-3.5 py-5 font-light leading-none bg-black rounded border-2 border-white border-solid basis-0 w-fit max-md:pr-5"
            />
            <button
              type="submit"
              className="px-10 py-5 font-semibold whitespace-nowrap bg-blue-600 rounded-[50px] max-md:px-5"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewsletterSection;
