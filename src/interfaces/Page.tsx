export interface Page {
    name: string,
    relativePath: string,
    element: JSX.Element,
    extra_fn?(): void
}