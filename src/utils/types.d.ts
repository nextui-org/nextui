export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends 
    Record<string, unknown> ? DeepPartial<T[P]> : T[P]
}
  