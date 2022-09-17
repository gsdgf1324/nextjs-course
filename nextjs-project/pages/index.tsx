import { useEffect, useCallback } from "react";
import { Button } from "../components/btn";

export default function Home() {
  const getLocation = useCallback(() => {
    if (window.navigator.geolocation) {
      // GPS를 지원하면
      window.navigator.geolocation.getCurrentPosition(
        /*
         latitude(위도), 
         longitude(경도),
         speed(속도), 
         altitude(고도), 
         accuracy(정확도)
        */
        function (position) {
          alert(position.coords.latitude + " " + position.coords.longitude);
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  return <div></div>;
}
