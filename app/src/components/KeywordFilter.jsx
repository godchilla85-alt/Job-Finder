import {
  ComboBox,
  Label,
  Input,
  Button,
  ListBox,
  ListBoxItem,
  Popover,
} from 'react-aria-components';
import { IoIosClose } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { useState } from 'react';

export default function KeywordFilter({ options = [], selectedKeywords = [], onSelectionChange }) {
  const [fieldValue, setFieldValue] = useState('');

  const [resetKey, setResetKey] = useState(0);

  const handleSelection = (key) => {
    if (key) {
      const selectedItem = options.find(opt => String(opt.id) === String(key));
      const keywordToAdd = selectedItem ? selectedItem.name : String(key);

      if (!selectedKeywords.includes(keywordToAdd)) {
        onSelectionChange([...selectedKeywords, keywordToAdd]);
      }

      setFieldValue(''); 
      setResetKey(prev => prev + 1); 
    }
  };

  const removeKeyword = (key) => {
    onSelectionChange(selectedKeywords.filter(k => k !== key));
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
        Search for Keywords
      </Label>

      <ComboBox 
        key={resetKey} 
        onSelectionChange={handleSelection}
        inputValue={fieldValue} 
        onInputChange={setFieldValue}
        className="relative w-full"
      >
        <div className="relative group">
          <Input 
            className="w-full border border-stone-300 rounded-xl p-2.5 pr-10 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 bg-white"
            placeholder="Keywords suchen..." 
          />
          <Button className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 outline-none">
            <FaChevronDown className="text-xs transition-transform duration-200" />
          </Button>
        </div>

        <Popover className="bg-white border border-stone-200 shadow-2xl rounded-xl w-40 z-100 overflow-hidden">
          <ListBox items={options} className="p-1 outline-none max-h-60 overflow-auto">
            {item => (
              <ListBoxItem 
                id={item.id}
                textValue={item.name}
                className="p-2.5 text-sm rounded-lg outline-none cursor-pointer hover:bg-stone-50 flex justify-between items-center"
              >
                {item.name}
                {selectedKeywords.includes(item.name) && <span className="text-cyan-600">✓</span>}
              </ListBoxItem>
            )}
          </ListBox>
        </Popover>
      </ComboBox>

      {selectedKeywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {selectedKeywords.map((kw) => (
            <div 
              key={kw}
              className="flex items-center gap-1.5 bg-stone-800 text-white px-3 py-1.5 rounded-full text-xs font-medium animate-in fade-in zoom-in"
            >
              {kw}
              <button 
                type="button"
                onClick={() => removeKeyword(kw)}
                className="hover:bg-white/20 rounded-full p-0.5 transition outline-none"
              >
                <IoIosClose className="text-lg" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}