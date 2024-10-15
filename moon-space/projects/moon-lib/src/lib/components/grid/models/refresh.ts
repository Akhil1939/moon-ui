
export type RefreshOption = {
    commonGrid: {
        setTableOptions?: boolean,
        setDisplayedItems?: boolean,
        filterDisplayedItems?: string[]
    }
}

const RefreshOption: RefreshOption = {
    commonGrid: {
        setDisplayedItems: false,
        setTableOptions: false,
        filterDisplayedItems: []
    }
};
export const RefreshOptions = Object.freeze(RefreshOption) as Readonly<typeof RefreshOption>;