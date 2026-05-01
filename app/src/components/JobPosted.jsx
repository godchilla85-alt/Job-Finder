import { ComboBox, Label, Button, Input, ListBox, ListBoxItem, Popover } from "react-aria-components";
import { FaChevronDown } from "react-icons/fa";


export default function JobPosted({ value, onChange }) {
  const options = [
    { id: '0', name: 'Heute' },
    { id: '7', name: 'Letzte 7 Tage' },
    { id: '14', name: 'Letzte 14 Tage' },
    { id: '30', name: 'Letzte 30 Tage' },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
     <Label className="text-xs font-bold uppercase text-stone-500 tracking-wider">Gepostet am</Label>
      <ComboBox 
        selectedKey={value} 
      onSelectionChange={(key) => {

        if (typeof onChange === 'function') {
          onChange(key);
        }
      }}
      className="relative w-full"
    >
       
        
        <div className="relative flex bg-white border border-stone-300 rounded-xl focus-within:ring-2 ring-cyan-500 transition shadow-sm">
          <Input 
            className="w-full border border-stone-300 rounded-xl p-2.5 pr-10 text-sm outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 bg-white"
            placeholder="Choose timeframe..."
          />
          <Button className="absolute right-0 top-2.5 px-2 flex items-center justify-center text-stone-400 border-none bg-transparent outline-none cursor-pointer">
            <FaChevronDown size={18} />
          </Button>
        </div>

        <Popover className="w-40 overflow-auto rounded-xl bg-white shadow-xl border border-stone-200">
          <ListBox items={options} className="p-1 outline-none">
            {(item) => (
              <ListBoxItem 
                id={item.id} 
                className="px-3 py-2 text-sm rounded-lg cursor-pointer outline-none hover:bg-cyan-50 focus:bg-cyan-100 selected:bg-cyan-500 selected:text-white"
              >
                {item.name}
              </ListBoxItem>
            )}
          </ListBox>
        </Popover>
      </ComboBox>
    </div>
  );
}