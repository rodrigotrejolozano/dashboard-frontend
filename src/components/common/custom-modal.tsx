import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { PlusIcon } from '../icon/PlusIcon'

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  closeOnBackdropClick?: boolean
  isBlur?: boolean
  className?: string
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnBackdropClick = true,
  isBlur = true,
  className = ''
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose()
    }
  }

  if (!isOpen) return null

  return ReactDOM.createPortal(
        <div
            className={`
                ${isBlur ? 'backdrop-blur-[2px] bg-[#6868682f]' : 'bg-[#aaaaaa56] '}
                 fixed inset-0 z-50 flex items-center justify-center bg-opacity-50
                `}
            onClick={handleBackdropClick}
        >
            <div className={`
            flex overflow-auto max-h-full flex-col bg-white rounded-lg shadow-lg max-w-full w-lg 
                ${className && ' ' + className + ' '}`}>
                {title && (
                    <div className="flex justify-between items-center px-2 pt-1">
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <button
                            onClick={onClose} className="text-gray-500 hover:text-gray-700 text-[30px]"
                        >
                            <PlusIcon
                                className="rotate-45 hover:fill-black"
                                width="24" height="24" fill="#424242" />
                        </button>
                    </div>
                )}
                <div className="p-2 flex-grow">
                    {children}
                </div>
                {footer && (
                    <div className=" border-t p-2 mt-auto">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
  )
}

export default CustomModal
