import React, { useEffect, useState } from 'react'
import { findUser } from '../helperFunctions/helpers';
const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
];
function AutocompleteComponent({ values, setFieldValue, handleChange ,validateForm ,setIsUserSelected}) {
    // const [searchActive, setSearchActive] = useState(false)
    const [dataItems, setDataItems] = useState()
    const [showDropDown,setShowDropDown] = useState(false)
    
  

    const handleUserName = (userName) => {
        setShowDropDown(true)
        let name = userName?.toLowerCase()?.replace(/ /g, '')?.trim()
        setFieldValue('userName', userName)
        setDataItems(findUser(name))
        setIsUserSelected(false)
    }

    const handleItem = (e, index) => {
        let valuesVariable = dataItems?.[index]
        let userName = valuesVariable?.userName
        let year = valuesVariable?.year
        let month = valuesVariable?.month
        let budget = valuesVariable?.budget
        let expenseItems= valuesVariable?.expenseItems
        setShowDropDown(false)
        setFieldValue('userName',userName)
        setFieldValue('year',year)
        setFieldValue('month',month)
        setFieldValue('budget',budget)
        setFieldValue('expenseItems',[...expenseItems])
        setIsUserSelected(true)
       
    }

    useEffect(()=>{
        window.addEventListener('click',()=>{
            setShowDropDown(false)
        })
        validateForm()
    },[values?.year])
    return (
        <>
            <input
                type='text'
                className='border h-[3rem] w-full rounded-[2rem] p-4'
                onChange={(e) => handleUserName(e.target.value)}
                value={values?.userName}
                placeholder='Enter UserName'
            />
            {   
                dataItems?.length > 0 && values?.userName?.toLowerCase()?.replace(/ /g, '')?.trim()?.length > 2  && showDropDown ? 
                <div className='container border px-4 mt-[-8px] bg-slate-300 w-[90%] mx-auto'>
                    {
                        dataItems?.map((item, index) => {
                            return <div
                                key={index}
                                onClick={(e) => handleItem(e, index)}
                                className=' cursor-pointer my-2 hover:bg-slate-200'
                            >
                                {item?.userName}
                            </div>
                        })
                    }
                </div>
                :
                ''
            }


        </>

    )
}

export default AutocompleteComponent