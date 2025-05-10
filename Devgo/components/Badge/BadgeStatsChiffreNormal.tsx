

import { BadgeDelta } from "@/components/ui/badge-delta"

interface Props {
  value : number
}

export function BadgeStatsChiffreNormal({value}: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
    <BadgeDelta 
        variant="solid"
        deltaType="neutral"
        iconStyle="line"
        value={value}
      />
   
    </div>
  )
}