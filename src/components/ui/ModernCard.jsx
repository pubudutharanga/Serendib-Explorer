// src/components/ui/ModernCard.jsx - Light Blue Theme
import { cva } from 'class-variance-authority'
import { motion } from 'framer-motion'
import cn from 'classnames'

const cardVariants = cva(
  'rounded-2xl border bg-card text-card-foreground shadow-lg overflow-hidden group',
  {
    variants: {
      variant: {
        default: 'bg-white border-blue-100',
        glass: 'glass border-blue-100',
        gradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100',
        interactive: 'cursor-pointer hover:shadow-xl transition-all duration-300 border-blue-200 bg-white'
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export function ModernCard({ className, variant, children, ...props }) {
  return (
    <motion.div
      className={cn(cardVariants({ variant, className }))}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -4, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}