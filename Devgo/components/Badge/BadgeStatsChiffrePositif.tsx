

import { BadgeDelta } from "@/components/ui/badge-delta"

export function BadgeStatsChiffrePositif() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <BadgeDelta 
        variant="solid"
        deltaType="increase"
        iconStyle="line"
        value="9.3%"
      />
   
    </div>
  )
}