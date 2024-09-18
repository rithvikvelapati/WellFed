import Image from "next/image";

const TopBar = () => {
  return (
    <div className="bg-white p-4 h-12 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <span className="text-gray-800 font-medium"></span>
      </div>

      <div className="flex items-center space-x-8">
        <Image src="/Notification.svg" alt="Notification" width={100} height={100} className="w-6 h-6 text-gray-600" />
        <Image src="/Shopping cart.svg" alt="Shopping Cart" width={100} height={100} className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  );
};

export default TopBar;
