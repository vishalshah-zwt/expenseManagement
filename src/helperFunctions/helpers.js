export const getDataFromLocalStorage = () =>{
    let returnVariable
    returnVariable = JSON.parse(localStorage?.getItem(('users') )) || []
    return returnVariable
}

export const addDataToLocalStorage = (values) =>{
    
    let returnVariable
    returnVariable = getDataFromLocalStorage()
    if(userExists(values))
        {
            let indexVariable = returnVariable?.findIndex((item)=>item?.userName?.toLowerCase()?.replace(/ /g,'')?.trim() == values?.userName?.toLowerCase()?.replace(/ /g,'')?.trim())
            returnVariable[indexVariable] = values 
        }
    else{
        returnVariable?.push(values)
    }
    console.log(returnVariable)
    localStorage.setItem('users',JSON.stringify(returnVariable))
}

export const findUser = (user) =>{
    let returnVariable
    let data = getDataFromLocalStorage()?.filter((item)=>item?.userName?.toLowerCase()?.replace(/ /g,'')?.trim()?.includes(user))

    returnVariable = data
    
    return returnVariable
}

export const userExists = (user) =>{
    let returnVariable = false
    let data = getDataFromLocalStorage()?.filter((item)=>item?.userName?.toLowerCase()?.replace(/ /g,'')?.trim() == user.userName?.toLowerCase()?.replace(/ /g,'')?.trim())
    
    returnVariable = data?.length > 0 ? true : false
    return returnVariable
}


export const showExpenseItems = (values) =>{
    let returnVariable = false

    if(values?.month !== '' && values?.year !== '' && values?.budget !== '' && values?.userName !== '' )
        {
            returnVariable = true
        }
    else{
            returnVariable = false
    }

    return returnVariable
}
export const isAllAmountEmpty = (values) =>{
    let returnVariable = false
   
    values?.map((expense)=>{
        if(expense?.amount == '')
            {
                returnVariable = true
            }
    })
   
    
    return returnVariable
}
