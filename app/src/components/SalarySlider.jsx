import { Slider, SliderTrack, SliderThumb, Label, SliderOutput } from 'react-aria-components';

export function SalaryRangeSlider({ onChange }) {
  return (
    <Slider 

      defaultValue={[45, 120]} 
      minValue={30} 
      maxValue={200} 
      onChange={onChange}
      className="w-full flex flex-col gap-2 p-4"
    >
      <div className="flex justify-between items-center">
        <Label className="text-sm font-bold text-stone-700 uppercase">Salary</Label>

        <SliderOutput className="text-sm font-bold text-sky-600">
          {({ state }) => `${state.values[0]}k - ${state.values[1]}k`}
        </SliderOutput>
      </div>

      <SliderTrack className="relative w-full h-7 flex items-center">
        {({ state }) => (
          <>

            <div className="w-full h-2 bg-stone-400 rounded-full" />
            

            <div 
              className="absolute h-2 bg-sky-600 rounded-full"
              style={{
                left: `${state.getThumbPercent(0) * 100}%`,
                right: `${100 - state.getThumbPercent(1) * 100}%`
              }}
            />
            
   
            <SliderThumb index={0} className="w-5 h-5 bg-sky-600 rounded-full shadow-md outline-none focus-visible:ring-2 top-3.5" />
            <SliderThumb index={1} className="w-5 h-5 bg-sky-600 rounded-full shadow-md outline-none focus-visible:ring-2 top-3.5" />
          </>
        )}
      </SliderTrack>
    </Slider>
  );
}