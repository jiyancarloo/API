import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

import {
  CircleCheck,
  TriangleAlert,
  Info,
  CircleX,
  Loader2,
} from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      icons={{
        success: <CircleCheck className="size-6" />,

        error: <CircleX className="size-6" />,

        warning: <TriangleAlert className="size-6" />,

        info: <Info className="size-5" />,

        loading: <Loader2 className="size-6 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: `
            font-sans
            rounded-full
          `,
          title: `
            px-2
            text-sm
            font-bold
          `,
          description: `
            px-2
            text-xs
            opacity-80
          `,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
