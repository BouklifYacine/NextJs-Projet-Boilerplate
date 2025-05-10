

import { BadgeDelta } from "@/components/ui/badge-delta"

export function BadgeStatsChiffreNegatif() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
     <BadgeDelta 
        variant="solid"
        deltaType="decrease"
        iconStyle="line"
        value="1.9%"
      />
   
    </div>
  )
}