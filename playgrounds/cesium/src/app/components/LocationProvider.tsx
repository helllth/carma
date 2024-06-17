import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '../store/slices/location';

/*
 * This component is used to set the location in the store based on the hash in the URL.
 * This is used to keep track of the current location in the store.
 * Only should get Initial location from the URL.
 * TODO not yet used for any functional stuff.
 */

export function LocationProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('HOOK: LocationProvider', window.location.hash);
    dispatch(setLocation(window.location.hash));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  console.log('RENDER LocationProvider');
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export default LocationProvider;
