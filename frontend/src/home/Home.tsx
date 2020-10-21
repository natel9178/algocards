import React from "react";
import { useLocation } from "react-router-dom";
import { useQueryParam, BooleanParam } from "use-query-params";
import Browse from "../browse/Browse";
import Presenter from "../presenter/Presenter";

export default function Home() {
  const location = useLocation();
  const [fromFileUpload] = useQueryParam("fromFileUpload", BooleanParam);

  if (fromFileUpload || location.pathname.includes("github.com")) {
    return <Presenter />;
  } else {
    return <Browse />;
  }
}
