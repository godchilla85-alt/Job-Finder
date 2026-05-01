import { CheckboxGroup, Checkbox, Label } from 'react-aria-components';

export function Experience({ value, onChange }) {
  const safeValue = value || [];

  return (
    <CheckboxGroup 
      value={safeValue} 
      onChange={onChange} 
      className="flex flex-col gap-2"
    >
      <Label className="text-sm font-bold uppercase text-stone-500">Experience</Label>
      
      <div className="flex flex-col gap-2 mt-2">
        <CustomCheckbox value="Entry Level">Entry Level</CustomCheckbox>
        <CustomCheckbox value="Intermediate">Intermediate</CustomCheckbox>
        <CustomCheckbox value="Senior">Senior</CustomCheckbox>
      </div>
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