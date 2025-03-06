import { Button } from "@/components/ui/button"
import { PlayCircle, PauseCircle, RefreshCw, Trash2 } from "lucide-react"

interface StrategyActionsProps {
  status: string
}

export default function StrategyActions({ status }: StrategyActionsProps) {
  return (
    <div className="flex space-x-2">
      {status === "Active" ? (
        <Button variant="outline" size="sm">
          <PauseCircle className="mr-2 h-4 w-4" />
          Pause
        </Button>
      ) : (
        <Button variant="outline" size="sm">
          <PlayCircle className="mr-2 h-4 w-4" />
          Start
        </Button>
      )}
      <Button variant="outline" size="sm">
        <RefreshCw className="mr-2 h-4 w-4" />
        Restart
      </Button>
      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  )
}

