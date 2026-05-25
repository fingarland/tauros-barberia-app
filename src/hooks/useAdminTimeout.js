import {
  useEffect,
  useRef,
  useCallback,
} from "react";

const INACTIVITY_TIME =
  180000;

export default function
useAdminTimeout(
  navigation
) {

  const timerRef =
    useRef(null);

  const resetTimer =
    useCallback(() => {

      // limpiar timer anterior
      if (
        timerRef.current
      ) {

        clearTimeout(
          timerRef.current
        );

      }

      // crear nuevo timer
      timerRef.current =
        setTimeout(() => {

          alert(
            "Sesión cerrada por inactividad"
          );

          navigation.replace(
            "AdminLogin"
          );

        }, INACTIVITY_TIME);

    }, [navigation]);

  useEffect(() => {

    resetTimer();

    return () => {

      if (
        timerRef.current
      ) {

        clearTimeout(
          timerRef.current
        );

      }

    };

  }, [resetTimer]);

  return {
    resetTimer,
  };
}