import { CheckboxGroup, Checkbox, Label } from 'react-aria-components';

export function WorkTypeFilter({ value = [], onChange }) {
  const safeValue = Array.isArray(value) ? value : [];
  return (
    <CheckboxGroup 
      value={value} 
      onChange={onChange}
      className="flex flex-col gap-2"
    >
      <Label className="text-sm font-bold uppercase text-stone-500">
        Anstellungsart
      </Label>
      
      <CustomCheckbox value="full time">Fulltime</CustomCheckbox>
      <CustomCheckbox value="part time">Parttime</CustomCheckbox>
    </CheckboxGroup>
  );
}

function CustomCheckbox({ children, value }) {
  return (
    <Checkbox value={value} className="group flex items-center gap-2 cursor-pointer outline-none">
      {({ isSelected }) => (
        <>
          <div className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center
            ${isSelected ? 'bg-cyan-500 border-cyan-500' : 'bg-white border-stone-300 group-hover:border-stone-400'}`}>
            {isSelected && <div className="w-2 h-3 border-r-2 border-b-2 border-white rotate-45 mb-1" />}
          </div>
          <span className={`text-sm ${isSelected ? 'text-stone-900 font-medium' : 'text-stone-600'}`}>
            {children}
          </span>
        </>
      )}
    </Checkbox>
  );
}