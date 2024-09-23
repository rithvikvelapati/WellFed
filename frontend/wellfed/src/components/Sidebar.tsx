import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="bg-white h-full w-12 flex flex-col items-center py-4">
      {/* Logo */}
      <div className="mb-10">
        <Image src="/Logo.svg" alt="Logo" width={100} height={100} className="w-12 h-12 logo" />
      </div>
      {/* Icons */}
      <nav className="flex flex-col space-y-6">
        <Image src="/Home.svg" alt="Home" width={100} height={100} className="w-6 h-6 text-gray-600" />
        <Image src="/Add user.svg" alt="AddUser" width={100} height={100} className="w-6 h-6 text-gray-600" />
        <Image src="/Message.svg" alt="Messages" width={100} height={100} className="w-6 h-6 text-gray-600" />
        <Image src="/Calendar.svg" alt="Calendar" width={100} height={100} className="w-6 h-6 text-gray-600" />
        <Image src="/Groups.svg" alt="UserGroup" width={100} height={100} className="w-6 h-6 text-gray-600" />
        <Image src="/Ticket.svg" alt="Ticket" width={100} height={100} className="w-6 h-6 text-gray-600" />
        <Image src="/Food.svg" alt="Food" width={100} height={100} className="w-6 h-6 text-gray-600" />
      </nav>
      <div className="mt-auto">
      <Image src="/Cog.svg" alt="Cog" width={100} height={100} className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  );
};

export default Sidebar;