import { useEffect ,useState} from "react";

export default function useDebounce(initValue, delay = 1000) {
  const [debounce, setDebounce] = useState(initValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(initValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, initValue]);
  return debounce;
}