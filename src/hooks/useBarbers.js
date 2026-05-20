import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function useBarbers() {

  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    fetchBarbers();
  }, []);

  const fetchBarbers = async () => {

    const { data, error } = await supabase
      .from("barbers")
      .select("*");

    if (error) {
      console.log("Error obteniendo barberos:", error);
      return;
    }
    console.log("BARBERS:", data);
    setBarbers(data);
  };

  return {
    barbers,
  };
}