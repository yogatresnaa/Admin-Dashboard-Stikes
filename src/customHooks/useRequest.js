import { useCallback, useContext, useEffect, useState } from 'react'
import { requestWrapper } from '../utils/helper'
import { toast } from 'react-toastify'
import { functionType } from '../utils/CONSTANT'
import { LoadingContext } from '../context/LoadingContext'

export default function useRequest(isGenerate = false) {
    const { isLoading, setIsLoading } = useContext(LoadingContext)
    const [isLoadingGenerate, setIsLoadingGenerate] = useState(false)
    const [isLoadingSendData, setIsLoadingSendData] = useState(false)
    const [data, setData] = useState({ data: [], filter: [] })
    const [dataDetail, setDataDetail] = useState(null)
    const [filterText, setFilterText] = useState('')
    const onChangeFilterText = (e) => {
        setFilterText(e.target.value)
    }

    const getData = async (fn) => {
        try {
            if (!isGenerate) {
                setIsLoading(true)
            } else {
                setIsLoadingGenerate(true)
            }

            const response = await fn()
            console.log(response)
            if (response.data.status == 200 || response.data.status == 201) {
                setData((prevState) => ({
                    ...prevState,
                    data: response.data.data,
                }))
            }
        } catch (error) {
            if (error) {
                console.log(error)

                if (error.response?.status == 500) {
                    toast.error(error.response.statusText, {
                        theme: 'colored',
                    })
                } else if (error.response?.status < 500) {
                    toast.error(error.response.data.message, {
                        theme: 'colored',
                    })
                } else {
                    console.log(error)
                    toast.error('Oops Something wrong', {
                        theme: 'colored',
                    })
                }
            }
        } finally {
            if (!isGenerate) setIsLoading(false)
            else setIsLoadingGenerate(false)
        }
    }

    const sendData = async (fn, callback = null, navigate = null) => {
        try {
            //rerender
            setIsLoadingSendData(true)
            console.log(isLoadingSendData)
            const response = await fn()

            if (response.data.status == 200 || response.data.status == 201) {
                toast.success(response.data.message, {
                    theme: 'colored',
                })
                //callback getdata again after post / put
                if (callback != null) {
                    //rerender
                    await callback()
                }
            }
            if (navigate !== null) {
                navigate()
            }
        } catch (error) {
            if (error) {
                console.log(error)

                if (error.response?.status == 500) {
                    toast.error(error.response.statusText, {
                        theme: 'colored',
                    })
                } else if (error.response?.status < 500) {
                    toast.error(error.response.data.message, {
                        theme: 'colored',
                    })
                } else {
                    toast.error('Oops Something wrong', {
                        theme: 'colored',
                    })
                }
            }
        } finally {
            setIsLoadingSendData(false)
        }
    }

    return {
        isLoading,
        setIsLoading,
        sendData,
        getData,
        data,
        setData,
        filterText,
        setFilterText,
        dataDetail,
        setDataDetail,
        isLoadingSendData,
        isLoadingGenerate,
        setIsLoadingGenerate,
        onChangeFilterText,
    }
}
