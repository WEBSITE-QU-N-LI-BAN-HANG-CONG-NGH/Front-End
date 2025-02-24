import React from "react";

function BenefitsSection() {
  const benefits = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/496b1ec1b29a4d7ab62e6343656956da/48247e8a3684f71c5a5c5b3c651bdc6e6415f1a371b1d27d7808cab1b57bc377",
      title: "Product Support",
      description:
        "Up to 3 years on-site warranty available for your peace of mind.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/496b1ec1b29a4d7ab62e6343656956da/1e836c10e68d5fc4f8e07ee8380941cd052096a9e5a303878a827c88b257df36",
      title: "Personal Account",
      description:
        "With big discounts, free delivery and a dedicated support specialist.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/496b1ec1b29a4d7ab62e6343656956da/5963c41a850cda2e33964125f420ed2fc3eb454879b99cd77fd59f2e7b227dec",
      title: "Amazing Savings",
      description:
        "Up to 70% off new Products, you can be sure of the best price.",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center px-16 py-14 mt-14 w-full bg-violet-50 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="max-w-full w-[1055px]">
        <div className="flex gap-5 max-md:flex-col">
          {benefits.map((benefit, index) => (
            <div key={index} className="w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-center text-center text-black max-md:mt-10">
                <img
                  loading="lazy"
                  src={benefit.icon}
                  className="object-contain aspect-[0.96] w-[65px]"
                  alt={benefit.title}
                />
                <div className="flex flex-col items-center mt-6 max-w-full w-[265px]">
                  <h3 className="text-lg font-bold leading-none">
                    {benefit.title}
                  </h3>
                  <p className="mt-3.5 text-sm leading-5">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BenefitsSection;
