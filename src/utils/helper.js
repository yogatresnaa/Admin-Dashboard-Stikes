import { functionType } from './CONSTANT'

/*
export const    requestWrapper=(fn,toast,navigate=null)=>async()=>{
    try {
       const response= await fn();
       
       if(response.data.status==200 ||response.data.status==201 )
       toast.success(response.data.message,{
            theme:'colored'
       })
       if(navigate!==null){
        navigate()
       }
   } catch (error) {
 
        toast.error(error.response.data.message,{
            theme:'colored'
        })
        
    }

}
*/
export const requestWrapper = async (
    fn,
    callback = null,
    type,
    toast,
    navigate = null
) => {
    try {
        console.log(callback)
        const response = await fn()

        if (response.data?.status == 200 || response.data?.status == 201) {
            if (type == functionType.POST) {
                toast.success(response.data.message, {
                    theme: 'colored',
                })
                //callback getdata again after post / put
                if (callback != null) {
                    await callback()
                }
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
                toast.error(error.response?.data?.message, {
                    theme: 'colored',
                })
            } else {
                toast.error('Oops Something wrong', {
                    theme: 'colored',
                })
            }
        }
    }
}

export const requestOnlyWrapper =
    (fn, toast, navigate = null) =>
        async () => {
            try {
                const response = await fn()
            } catch (error) {
                toast.error(error.response.data.message, {
                    theme: 'colored',
                })
            }
        }

export const dateConvert = (data) => {
    const date = new Date(data)
    return `${date.getDate()} ${date.toLocaleString('id', {
        month: 'long',
    })} ${date.getFullYear()}`
}
export const dateConvertForDb = (data) => {
    const date = new Date(data)
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().length < 2
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1
        }-${date.getDate()}`
}
export const rupiahConvert = (data) => {
    return `${data.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
    })}`
}
export const currencyFormatter = (value) => {
    if (value.length === 1) {
        return value
    }
    let result = value?.toString().replace(/\D/g, '').toString() // Remove no
    result = result?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    result = result?.replace(/^0/g, '')
    return result
}
export const upperCaseFirstChar = (word) => {
    return word
        .split('')
        .map((item, index) => (index == 0 ? item : item.toLowerCase()))
        .join('')
}

export const downloadDocument = (dokumen, documentName) => {
    const url = window.URL.createObjectURL(
        new Blob([new Uint8Array(dokumen).buffer], {
            type: 'application/pdf',
        })
    )
    var link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${documentName}.pdf`)
    document.body.appendChild(link)
    link.click()
}
export const convertArrayOfObjectsToCSV = array => {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';

    // Collect all unique keys across all objects in the array
    const keys = array.reduce((allKeys, obj) => {
        Object.keys(obj).forEach(key => {
            if (!allKeys.includes(key)) {
                allKeys.push(key);
            }
        });
        return allKeys;
    }, []);

    // Create the header row with all keys
    result = keys.join(columnDelimiter);
    result += lineDelimiter;

    // Create a row for each object, using all keys and handling missing keys
    array.forEach(item => {
        let ctr = 0;
        keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter;

            // Check if the key exists in the current item, if not, use an empty string
            result += item[key] !== undefined ? item[key] : '';

            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

export const downloadCSV = (array, fileName) => {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    // const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `${fileName}.csv`);
    link.click();
}

