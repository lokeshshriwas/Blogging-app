import { Button } from "flowbite-react";
import React from "react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col items-center">
        <h2 className="text-2xl">
            Want to know about me?
        </h2>
        <p className="text-gray-500 my-2">
            Checkout my personal portfolio
        </p>
        <Button gradientDuoTone="greenToBlue" className="rounded-tl-xl rounded-bl-none max-w-56 w-full ">
            <a href="https://portfolio-lokesh-shriwas.netlify.app/" target="_blank" rel="noopener noreferrer">
                Portfolio
            </a>
        </Button>
      </div>
        <div className="p-7 overflow-hidden">
          <img
            src="https://portfolio-lokesh-shriwas.netlify.app/images/photo.png"
            alt="image"
            className="rounded-full max-h-32 w-46 object-cover"
          />
        </div>
    </div>
  );
};

export default CallToAction;
