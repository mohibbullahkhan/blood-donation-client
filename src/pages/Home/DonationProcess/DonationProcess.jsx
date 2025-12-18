import React from "react";

const DonationProcess = () => {
  
  const processSteps = [
    {
      step: 1,
      title: "REGISTRATION",
      description:
        "You need to complete a very simple registration form. Which contains all required contact information to enter in the donation process.",
      imageUrl:
        "https://templates.bwlthemes.com/blood_donation/v_2/images/process_1.jpg", 
    },
    {
      step: 2,
      title: "SCREENING",
      description:
        "A drop of blood from your finger will take for simple test to ensure that your blood iron levels are proper enough for donation process.",
      imageUrl:
        "https://templates.bwlthemes.com/blood_donation/v_2/images/process_2.jpg", 
    {
      step: 3,
      title: "DONATION",
      description:
        "After ensuring and passed screening test successfully you will be directed to a donor bed for donation. It will take only 8-10 minutes.",
      imageUrl:
        "https://templates.bwlthemes.com/blood_donation/v_2/images/process_3.jpg", 
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
       
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-wide mb-2">
            DONATION PROCESS
          </h2>
          
          <div className="w-12 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The donation process from the time you arrive center until the time
            you leave
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {processSteps.map((item) => (
            <div
              key={item.step}
              className="flex flex-col items-center text-center rounded-xl border-t-4 border-red-600"
            >
            
              <div className="relative w-full overflow-hidden rounded-lg shadow-xl mb-6 aspect-[4/3]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                <div
                  className="absolute bottom-0 right-0 h-1/3 w-1/3 bg-red-600 flex items-center justify-center text-white 
                             text-4xl font-extrabold shadow-lg"
                  style={{
                    
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
                  }}
                >
                  {item.step}
                </div>
              </div>

             
              <h3 className="text-xl font-bold text-gray-800 mb-2 tracking-wider">
                {item.title}
              </h3>

              
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationProcess;
