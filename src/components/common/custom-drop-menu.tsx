import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface CustomDropMenuProps {
  trigger: ReactNode;
  children: ReactNode;
}

const CustomDropMenu = ({ trigger, children }: CustomDropMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const toggleMenu = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
      });
    }
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScrollOrResize = () => {
      if (isOpen && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setMenuPosition({
          top: rect.bottom + window.scrollY + 5,
          left: rect.left + window.scrollX,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScrollOrResize);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen]);

  return (
    <div ref={triggerRef} className="inline-block relative">
      <div onClick={toggleMenu} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "absolute",
              top: menuPosition.top,
              left: menuPosition.left,
              minWidth: "160px",
              backgroundColor: "white",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
              borderRadius: "8px",
              padding: "8px 0",
              zIndex: 50,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "scale(1)" : "scale(0.95)",
              transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
            }}
            className="absolute z-50 bg-white shadow-lg rounded-md border border-gray-200"
          >
            <ul className="p-2">{children}</ul>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CustomDropMenu;
