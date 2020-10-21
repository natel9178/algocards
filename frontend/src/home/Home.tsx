import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import React from "react";
import { useLocation } from "react-router-dom";
import { useQueryParam, BooleanParam } from "use-query-params";
import Browse from "../browse/Browse";
import Presenter from "../presenter/Presenter";

export default function Home() {
  const location = useLocation();
  const [fromFileUpload] = useQueryParam("fromFileUpload", BooleanParam);

  return (
    <AnimateSharedLayout type="crossfade">
      {fromFileUpload || location.pathname.includes("github.com") ? (
        <Presenter />
      ) : (
        <Browse />
      )}
    </AnimateSharedLayout>
  );
}
