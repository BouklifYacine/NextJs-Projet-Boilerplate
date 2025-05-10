

import { BadgeDelta } from "@/components/ui/badge-delta"

export function BadgeStatsChiffreNormal() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
    <BadgeDelta 
        variant="solid"
        deltaType="neutral"
        iconStyle="line"
        value="0.6%"
      />
   
    </div>
  )
}