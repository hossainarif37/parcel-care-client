import { useEffect, useState } from "react";

const useWindowScroll = (threshold = 100) => {
    const [isScrolled, setIsScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > threshold) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      
      // Call once to check initial position
      handleScroll();
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [threshold]);
  
    return isScrolled;
  };

  export default useWindowScroll;