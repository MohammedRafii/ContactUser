import { useEffect, useState } from "react"

const useDebounce = (value:string,delay=250)=>{
  let name = value.charAt(0).toUpperCase();
  const [debounceValue, setDebounceValue] = useState(name)
  useEffect(() => {
    const handler = setTimeout(()=>setDebounceValue(name),delay)
    
    return () => {
      clearTimeout(handler)
    }
  }, [value,delay])

  return debounceValue
}
export const debounceColor = (value:string, delay: number)=>{
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  if(randomColor!=="#000000" || randomColor!=="#000000"){

  
  const [debounceValue, setDebounceValue] = useState(randomColor)
  useEffect(() => {
    
    const handler = setTimeout(()=>setDebounceValue(randomColor),delay)
    
    return () => {
      clearTimeout(handler)
    }
  }, [value,delay])

  return debounceValue
}
}
export default useDebounce;