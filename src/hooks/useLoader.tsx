import React from "react";

export default function useLoader() {
  const [loading, setLoading] = React.useState(false);

  const showLoader = () => {
    setLoading(true);
  };

  const hideLoader = () => {
    setLoading(false);
  };

  return { loading, showLoader, hideLoader };
}
