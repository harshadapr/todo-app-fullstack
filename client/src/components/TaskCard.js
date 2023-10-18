import {MdOutlineDeleteOutline, MdOutlineEdit} from "react-icons/md";

export default function TaskCard({id, text, completed}) {
  return (
    <div className={`flex flex-col gap-2 w-full p-4 rounded-md ${completed?"bg-green-50":"bg-gray-100"}`}>
      <h1 className={`text-lg font-medium break-all ${completed?"text-gray-500":"text-black"}`}>
        {text}
      </h1>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Status: {completed?"Complete":"Pending"}</p>
        <div className="flex">
          <span className="text-red-500">
            <MdOutlineDeleteOutline size="24" />
          </span>
          <span className="text-red-500">
            <MdOutlineEdit size="24" />
          </span>
        </div>
      </div>
    </div>
  );
}
