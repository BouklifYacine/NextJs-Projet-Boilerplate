

import { BadgeDelta } from "@/components/ui/badge-delta"

interface Props {
  value : number
}

export function BadgeStatsChiffreNegatif({value}: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
     <BadgeDelta 
        variant="solid"
        deltaType="decrease"
        iconStyle="line"
        value={value}
      />
   
    </div>
  )
}