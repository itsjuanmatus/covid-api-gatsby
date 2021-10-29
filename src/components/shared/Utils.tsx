import * as React from 'react'

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
