declare global {
  type ReactNode =
    | React.ReactElement<unknown>
    | FunctionComponent<unknown>
    | React.ComponentClass<unknown>
    | null
}

export {}
