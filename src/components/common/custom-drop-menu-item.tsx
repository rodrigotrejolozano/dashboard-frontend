import { type ReactNode } from 'react'

interface CustomDropMenuItemProps {
  onClick: () => void
  icon: ReactNode
  label: string
}

const CustomDropMenuItem = ({ onClick, icon, label }: CustomDropMenuItemProps) => (
  <li
    onClick={onClick}
    className="
      flex items-center p-2 cursor-pointer rounded-md
      text-gray-800 hover:text-gray-800
      hover:bg-gray-100 transition-colors duration-200
    "
  >
    <span className="mr-2 flex items-center">{icon}</span>
    <span className="font-medium">{label}</span>
  </li>
)

export default CustomDropMenuItem
