"use client";

import { useCallback, useEffect, useState } from "react";

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "scroll";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLocked]);
}

export function useControlledBooleanState<
  T extends {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  },
>(props: T) {
  const [internalOpen, setInternalOpen] = useState(props.defaultOpen ?? false);

  const isOpen = props.open ?? internalOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (props.open === undefined) {
        setInternalOpen(nextOpen);
      }

      props.onOpenChange?.(nextOpen);
    },
    [props.onOpenChange, props.open],
  );

  return [isOpen, setOpen] as const;
}
