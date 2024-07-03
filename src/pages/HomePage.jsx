import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import AutocompleteComponent from '../components/AutocompleteComponent'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import months from '../data/months.json'
import formValidation from '../schema/validationSchema'
import { addDataToLocalStorage, findUser, isAllAmountEmpty, showExpenseItems, userExists } from '../helperFunctions/helpers'
import Select from 'react-select';
function HomePage() {
    const initialValues = {
        userName: '',
        year: '',
        month: '',
        budget: '',
        expenseItems: [
            {
                spendType: '',
                date: '',
                amount: ''
            }
        ]
    }

    const { values, setFieldValue, handleSubmit, handleChange, errors, resetForm, touched, validateForm } = useFormik({
        initialValues,
        validationSchema: formValidation,
        validateOnMount: true,
        onSubmit: () => {
            if (userExists(values) && (isUserSelected == false)) {
                alert("User Name already Exists..!")
            }
            else {
                addDataToLocalStorage(values)
                resetForm()
                console.log("Hi")
            }
        }
    })

    const expenseTypeOptions = ["Rent", "Loan", "Shopping", "Food", "Travelling", "StudyFees"]
    const selectOptions = months?.map((item)=>({label:item,value:item}))
    const [isUserSelected,setIsUserSelected] = useState()
    let autocompleteProps = { values, setFieldValue, handleChange, validateForm , setIsUserSelected }
    
    const addExpense = () => {
        let expenseItemsVariable = values?.expenseItems
        expenseItemsVariable?.push({
            spendType: '',
            date: '',
            amount: ''
        })
        setFieldValue('expenseItems', [...expenseItemsVariable])

    }


    const removeExpense = () => {
        let expenseItemsVariable = values?.expenseItems
        if (values?.expenseItems?.length > 1) {
            expenseItemsVariable?.pop({
                spendType: '',
                date: '',
                amount: ''
            })
            setFieldValue('expenseItems', [...expenseItemsVariable])
        }
        else {
            setFieldValue('expenseItems', [
                {
                    spendType: '',
                    date: '',
                    amount: ''
                }
            ])
        }

    }

    const handleDateChange = (date, index) => {
        let expenseItemsVariable = values?.expenseItems
        expenseItemsVariable[index].date = date
        setFieldValue('expenseItems', expenseItemsVariable)
    }

    const handleAmountChange = (e, index) => {
        let expenseItemsVariable = values?.expenseItems
        expenseItemsVariable[index].amount = Number(e.target.value)
        setFieldValue('expenseItems', expenseItemsVariable)
        let totalAmountVariable = values?.expenseItems?.reduce((acc, curr) => acc + curr?.amount, 0)
        /*  if (totalAmountVariable > values?.budget) {
            expenseItemsVariable[expenseItemsVariable?.length - 1].amount = ''
            setFieldValue('expenseItems', expenseItemsVariable)
            setTimeout(() => {
                alert("Enter Expense within Budget")
            }, 1000)
        } */
    }

    const handleBudget = (e) =>{
        setFieldValue('budget',e.target.value)
        setFieldValue('expenseItems',[
            {
                spendType: '',
                date: '',
                amount: ''
            }
        ])
    }
    console.log(errors)
    return (
        <>
            <form className='border container mx-auto w-[60%] my-8' onSubmit={handleSubmit}>
                <AutocompleteComponent {...autocompleteProps} />
                {
                    errors?.userName && touched?.userName ?
                        <div className='text-orange-600 text-sm'>{errors?.userName}</div>
                        :
                        ''
                }
                <div className='flex gap-4 '>
                    <DatePicker
                        selected={values?.year}
                        className='border my-4 p-2'
                        name='year'
                        placeholderText='Select Year'
                        onChange={(date) => setFieldValue('year', date)}
                        showYearPicker
                        minDate={new Date()}
                        dateFormat="yyyy"
                    />
                    {
                        errors?.year && touched?.year ?
                            <div className='text-orange-600 text-sm'>{errors?.year}</div>
                            :
                            ''
                    }

                    <Select
                        className='w-[20%] my-4'
                        name='month'
                        value={{label:values?.month,value:values?.month}}
                        onChange={(e)=>{setFieldValue('month',e?.label)}}
                        options={selectOptions}
                    />
                    {
                        errors?.month && touched?.month ?
                            <div className='text-orange-600 text-sm'>{errors?.month}</div>
                            :
                            ''
                    }
                    <input
                        className='border my-4'
                        type="number"
                        min="0"
                        name='budget'
                        value={values?.budget}
                        onChange={(e)=>handleBudget(e)}
                        placeholder='Set Budget'
                    />
                    {
                        errors?.budget && touched?.budget ?
                            <div className='text-orange-600 text-sm'>{errors?.budget}</div>
                            :
                            ''
                    }
                </div>

                {
                    showExpenseItems(values) ?
                        <div className='Expenseitems'>
                            {
                                values?.expenseItems?.map((expense, index) => {
                                    return <div className='border flex p-4 gap-4' key={index}>
                                        <div className='flex gap-4'>
                                            <label htmlFor="">Spend Type: </label>
                                            <select
                                                className='border '
                                                name={`expenseItems.${[index]}.spendType`}
                                                value={values?.expenseItems?.[index]?.spendType}
                                                onChange={handleChange}
                                            >
                                                <option value=""></option>
                                                {
                                                    expenseTypeOptions?.map((type) => {
                                                        return <option value={type}>{type}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        {
                                            errors?.expenseItems?.[index]?.spendType && touched?.expenseItems?.[index]?.spendType ?
                                                <div className='text-orange-600 text-sm'>{errors?.expenseItems?.[index]?.spendType}</div>
                                                :
                                                ''
                                        }

                                        <div className='flex gap-4'>
                                            <label htmlFor={`expenseItems.${[index]}.date`}>Spend Date: </label>
                                            <DatePicker
                                                selected={values?.expenseItems?.[index]?.date}
                                                name={`expenseItems.${[index]}.date`}
                                                value={new Date(values?.expenseItems?.[index]?.date)}
                                                id={`expenseItems.${[index]}.date`}
                                                onChange={(e) => handleDateChange(e, index)}
                                                className='border'
                                            />
                                        </div>
                                        {
                                            errors?.expenseItems?.[index]?.date && touched?.expenseItems?.[index]?.date ?
                                                <div className='text-orange-600 text-sm'>{errors?.expenseItems?.[index]?.date}</div>
                                                :
                                                ''
                                        }
                                        <div className='flex gap-4'>
                                            <label htmlFor={`expenseItems.${[index]}`}>Amount: </label>
                                            <input
                                                type='number'
                                                name={`expenseItems.${[index]}.amount`}
                                                value={values?.expenseItems?.[index]?.amount}
                                                id={`expenseItems.${[index]}.amount`}
                                                onChange={(e) => { handleAmountChange(e, index) }}
                                                className='border'
                                                min={0}
                                            />
                                        </div>
                                        {
                                            errors?.expenseItems?.[index]?.amount !== "Budget exceeded..!"
                                            ?
                                            errors?.expenseItems?.[index]?.amount && touched?.expenseItems?.[index]?.amount ?
                                                <div className='text-orange-600 text-sm'>{errors?.expenseItems?.[index]?.amount}</div>
                                                :
                                                ''
                                            :
                                            ''
                                        }
                                    </div>
                                })
                            }
                            <button type='button' className='border my-2 mx-4 px-4' onClick={addExpense} disabled={errors?.expenseItems}>
                                Add
                            </button>
                            <button type='button' className='border my-2 mx-4 px-4' onClick={removeExpense}>
                                Remove
                            </button>
                            <br />
                        </div>
                        
                        :
                        ''
                }
                {
                    errors?.expenseItems?.[0]?.amount == "Budget exceeded..!" ?
                    errors?.expenseItems?.[0]?.amount && (Boolean(isAllAmountEmpty(values?.expenseItems)) == false) ? 
                        <div className='text-orange-600 text-sm text-center'>{errors?.expenseItems?.[0]?.amount}</div>
                        :
                        ''
                    :
                    ''
                }
                <button type='submit' className='border my-2 mx-4'>
                    Save
                </button>
            </form>
        </>
    )
}

export default HomePage
