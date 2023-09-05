const data = []

const allData = (state =data, action) => {
    console.log("yesssssssssssssssssss")
    switch(action.type) {
        case 'FETCHALLDATA': {
            console.log(action.payload.data )
            return {
                data : [
                    action.payload.data 
                ]
            }
        }
        default : 
            return state
        
    }
}

export default allData