import {
  useEffect,
  useRef,
} from "react";

const INACTIVITY_TIME =
  180000;

export default function
useAdminTimeout(
  navigation
) {

  const timerRef =
    useRef(null);

  const resetTimer = () => {

    if (timerRef.current) {

      clearTimeout(
        timerRef.current
      );

    }

    timerRef.current =
      setTimeout(() => {

        alert(
          "Sesión cerrada por inactividad"
        );

        navigation.replace(
          "AdminLogin"
        );

      }, INACTIVITY_TIME);

  };

  useEffect(() => {

    resetTimer();

    return () => {

      if (timerRef.current) {

        clearTimeout(
          timerRef.current
        );

      }

    };

  }, []);

  return {
    resetTimer,
  };
}