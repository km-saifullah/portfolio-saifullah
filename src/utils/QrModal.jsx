import React from "react";
import whatsAppQrCode from "../assets/whatsAppQrCode.svg";
import Image from "./Image";

const QrModal = ({ handleCloseModal }) => {
  return (
    <div className="p-5 h-[270px] w-[270px] bg-heading absolute top-[160px] left-[400px] transition-all ease-linear duration-300 transition-opacity-1">
      <div className="flex items-end justify-end">
        <button
          onClick={handleCloseModal}
          className="text-white font-bold font-roboto text-base transition-all ease-linear duration-300 hover:bg-primary px-3 py-2 rounded-[8px]"
        >
          Close
        </button>
      </div>
      <div className="w-[320px] h-[250px] overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          imgSrc={whatsAppQrCode}
          altText="qrcode"
        />
      </div>
    </div>
  );
};

export default QrModal;
