export type TailwindColor = 
  | 'text-gray-900' 
  | 'text-blue-500' 
  | 'text-red-500' 
  | 'text-green-500'
  | 'bg-white'
  | 'bg-blue-100'
  | 'bg-red-100'
  | 'bg-green-100';

export interface Theme {
  textColor: TailwindColor;
  containerColor: TailwindColor;
}
