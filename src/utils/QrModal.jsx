import React from "react";
import whatsAppQrCode from "../assets/whatsAppQrCode.svg";
import Image from "./Image";

const QrModal = ({ handleCloseModal }) => {
  return (
    <div className="p-2 h-[260px] w-[270px] rounded-lg bg-whatsApp absolute top-[160px] left-[400px]">
      <div className="w-[100%] h-[200px] overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          imgSrc={whatsAppQrCode}
          altText="qrcode"
        />
      </div>
      <div className="flex items-start justify-start">
        <button
          onClick={handleCloseModal}
          className="text-white font-bold font-roboto text-base transition-all ease-linear duration-300 hover:bg-primary px-3 py-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QrModal;
