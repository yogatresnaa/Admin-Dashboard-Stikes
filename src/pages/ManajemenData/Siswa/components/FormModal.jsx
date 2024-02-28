import { Form, Formik } from 'formik'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import FormComponent from '../../../../component/Form/FormComponent'
import { useState } from 'react'
import FormInputSiswa from './FormInputSiswa'
import FormInputSekolah from './FormInputSekolah'
import TabComponent from './TabComponent'

export default function ModalForm({
    isOpen,
    toggle,
    initialValues,
    onSubmitHandler,
    schema,
    dataProdi,
    dataKelas,
    dataUnit,
    btnName,
    headerName,
    isLoadingSendData,
}) {
    const tabArr = [
        {
            id: 0,
            name: 'Data Siswa',
            component: (props) => <FormInputSiswa {...props} />,
        },
        {
            id: 1,
            name: 'Data Sekolah',
            component: (props) => <FormInputSekolah {...props} />,
        },
    ]
    const [tab, setTab] = useState(0)
    console.log(initialValues)
    return (
        <>
            <Formik
                enableReinitialize
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={initialValues}
                onSubmit={onSubmitHandler}
                validationSchema={schema}
            >
                {({
                    handleChange,
                    handleSubmit,

                    setFieldValue,
                    handleReset,
                    values,
                    errors,
                }) => (
                    <Modal
                        isOpen={isOpen}
                        toggle={() => {
                            toggle()
                            handleReset()
                        }}
                        onClosed={() => handleReset()}
                    >
                        <ModalHeader toggle={toggle}>{headerName}</ModalHeader>
                        <ModalBody>
                            <TabComponent
                                setTab={setTab}
                                tabValue={tab}
                                tabArray={tabArr}
                            />
                            {tabArr
                                .filter((item) => item.id == tab)[0]
                                .component({
                                    btnName: btnName,
                                    errors: errors,
                                    values: values,
                                    isLoadingSendData: isLoadingSendData,
                                    handleChange: handleChange,
                                    dataProdi,
                                    dataKelas,
                                    dataUnit,
                                    handleSubmit: handleSubmit,
                                })}

                            {/* <FormInput
                btnName={btnName}
                errors={errors}
                values={values}
                isLoadingSendData={isLoadingSendData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              /> */}
                        </ModalBody>
                    </Modal>
                )}
            </Formik>
        </>
    )
}
