"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";
import React, { useContext, useEffect, useState } from "react";

function Provider({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const { data: sessionData } = await supabase.auth.getUser();


    if (!sessionData?.user?.email) {
      console.log("User session NOT ready yet");
      setUser(null);
      return;
    }

    const sessionUser = sessionData.user;


    const { data: Users, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", sessionUser.email);

    if (error) {
      console.error("Supabase error:", error);
      return;
    }


    if (!Users || Users.length === 0) {
      const { data, error } = await supabase
        .from("Users")
        .insert([
          {
            name: sessionUser.user_metadata?.name,
            email: sessionUser.email,
            picture: sessionUser.user_metadata?.picture,
          },
        ])
        .select();

      if (!error) setUser(data[0]);
      return;
    }

    setUser(Users[0]);
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
