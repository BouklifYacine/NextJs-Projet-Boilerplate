

import { BadgeDelta } from "@/components/ui/badge-delta"

interface Props {
  value : number
}

export function BadgeStatsChiffrePositif({value}: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <BadgeDelta 
        variant="solid"
        deltaType="increase"
        iconStyle="line"
        value={value}
      />
   
    </div>
  )
}