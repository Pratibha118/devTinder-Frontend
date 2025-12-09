import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: 'connections',
    initialState: [],
    reducers: {
        getConnections: (state, action) => {
            return action.payload
        },
        removeConnections: () => null
    }
})

export const { getConnections } = connectionSlice.actions
export default connectionSlice.reducer