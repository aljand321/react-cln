import  { useEffect,useRef } from 'react'

function useIsMountedRef() {
    const isMountedRef = useRef(null);
    //console.log('esto es use ref')
    useEffect(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false
      };
    });    
    return isMountedRef;
}

export default useIsMountedRef;