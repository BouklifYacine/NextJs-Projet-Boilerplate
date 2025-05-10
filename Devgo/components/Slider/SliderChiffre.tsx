'use client';
import { SlidingNumber } from '@/components/ui/sliding-number';
import { useState } from 'react';

export function SliderChiffre() {
  const [value, setValue] = useState(100);
  const [width, setWidth] = useState(0);

  return (
    <div className='flex flex-col items-start gap-0'>
      <div className='flex items-center gap-2 font-mono'>Current ARR:</div>
      <div className='inline-flex items-center gap-1 font-mono leading-none'>
        $<SlidingNumber value={value} />
      </div>
      <input
        type='range'
        value={value}
        min={0}
        max={500}
        step={1}
        onChange={(e) => setValue(+e.target.value)}
        className='mt-2 accent-indigo-950'
      />
    </div>
  );
}
