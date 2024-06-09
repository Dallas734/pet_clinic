export interface lastPath
{
    name:string,
    path:string
}

export interface navigationSliceProps
{
    historyMap: lastPath[];
    currentUrl: string
}