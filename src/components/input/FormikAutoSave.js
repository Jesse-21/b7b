import React from "react";

import { useFormikContext } from "formik";
import debounce from "lodash/debounce";

export const AutoSave = ({ debounceMs = 1000 }) => {
  const formik = useFormikContext();
  const debouncedSubmit = React.useCallback(
    debounce(() => {
      return formik.submitForm();
    }, debounceMs),
    [formik.submitForm, debounceMs]
  );

  React.useEffect(() => debouncedSubmit, [debouncedSubmit, formik.values]);

  return <></>;
};
