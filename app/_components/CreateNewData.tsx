"use client";

import { useEffect, useTransition } from "react";
import { createUserIdCookie } from "../_actions/initialDataActions/createUserIdCookie";
// import Loader from "./Loader";
import InitialData from "./InitialData";

function CreateNewData() {
  // Setting cookies must be in client

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function createCookie() {
      await createUserIdCookie();
    }
    startTransition(async () => {
      await createCookie();
    });
  }, []);
  // return <>{isPending ? <Loader isInitData={true} /> : null}</>;
  return <>{isPending ? <InitialData /> : null}</>;
}

export default CreateNewData;
