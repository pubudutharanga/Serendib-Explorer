// src/components/ui/ModernButton.jsx - Light Blue Theme
import { cva } from 'class-variance-authority'
import { motion } from 'framer-motion'
import cn from 'classnames'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background relative overflow-hidden group',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:scale-105',
        outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
        ghost: 'text-slate-600 hover:text-blue-600 hover:bg-blue-50',
        glass: 'glass text-slate-700 hover:bg-white/80',
        premium: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl hover:shadow-2xl'
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        default: 'h-12 px-6',
        lg: 'h-14 px-8 text-base',
        icon: 'h-10 w-10'
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export function ModernButton({ className, variant, size, children, ...props }) {
  return (
    <motion.button
      className={cn(buttonVariants({ variant, size, className }))}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}