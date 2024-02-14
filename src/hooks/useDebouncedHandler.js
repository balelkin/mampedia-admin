import { useEffect, useMemo } from 'react';
import { debounce } from 'lodash';

export default function useDebouncedHandler(handler, timeout = 300) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandler = useMemo(() => debounce(handler, timeout), []);

  useEffect(() => {
    return () => {
      debouncedHandler.cancel();
    };
  }, [debouncedHandler]);

  return { debouncedHandler };
}
