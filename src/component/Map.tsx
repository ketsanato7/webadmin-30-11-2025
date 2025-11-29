import React from 'react';
import {
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  Marker,
  useMarkerRef
} from '@vis.gl/react-google-maps';



const App = () => {
 const [markerRef, marker] = useMarkerRef();

  React.useEffect(() => {
    if (!marker) {
      return;
    }

    // do something with marker instance here
  }, [marker]);
 return ( 
 <APIProvider apiKey={import.meta.env.VITE_API_MAP_GOOGLE} onLoad={() => console.log('Maps API has loaded.')}>

   <Map
   
      style={{width:500, height:500}}
      defaultCenter={{lat: 22.54992, lng: 0}}
      defaultZoom={3}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
>
     <MapControl position={ControlPosition.TOP_LEFT}>
        .. any component here will be added to the control-containers of the
        google map instance ..
      </MapControl>
      
        <Marker ref={markerRef} position={{lat: 53.54992, lng: 10.00678}} />
        
      </Map>

  </APIProvider>

 )
}


export default App