export const allData = (data) => {
    console.log("allDtaa", data)
    return {
        type: 'FETCHALLDATA',
        payload: {
            data: data
        }
    }
}