import { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

interface SelectInputProps {
  setShowAddInvoice?: any;
  placeholder?: string;
  onSelect?: any;
  inputData?: any;
  disabled?: any;
  getSelectedSector?: any;
}

export const Select = ({
  onSelect,
  inputData,
  getSelectedSector,
  disabled,
  placeholder,
}: SelectInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside the select component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item: any) => {
    if (item.name.toLowerCase() !== selected.toLowerCase()) {
      setSelected(item.name);
      setOpen(false);
      setInputValue("");
      onSelect ? onSelect(item) : null;
    }
  };

  return (
    <div className="text-sm space-y-3">
      <div
        ref={dropdownRef}
        className="font-medium relative mt-4 border-[1.3px] border-[#6C748B] rounded-lg cursor-pointer"
      >
        <div
          onClick={() => !disabled && setOpen(!open)}
          className={`bg-white mt-1 pt-1 w-full  px-4 pb-3 rounded-lg flex items-center justify-between input-default ${
            !selected && "text-gray-400"
          }`}
        >
          <input
            type="text"
            value={
              selected
                ? selected.length > 25
                  ? selected.substring(0, 25) + "..."
                  : selected
                : getSelectedSector
                ? getSelectedSector
                : ""
            }
            placeholder={placeholder}
            className="w-full text-[#575D72] focus:outline-none bg-white"
            readOnly
          />
          <RiArrowDownSLine
            size={24}
            className={` text-[#575D72] font-extrabold ${open && "rotate-180"}`}
          />
        </div>

        <ul
          className={`shadow-md shadow-gray-400 bg-white mt-2 overflow-y-auto w-full font-normal cursor-pointer ${
            open ? "max-h-36" : "max-h-0"
          } absolute top-full w-full z-50`}
        >
          {inputData?.map((item: any, index: number) => (
            <li
              key={index}
              className={`p-4 text-accent text-sm hover:hover:bg-gray-200 cursor-pointer hover:text-accent
              ${item?.name?.toLowerCase() === selected?.toLowerCase() && ""}
              ${
                item?.name?.toLowerCase().startsWith(inputValue)
                  ? "block"
                  : "hidden"
              }`}
              onClick={() => handleSelect(item)}
            >
              {item?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
