import React, { useEffect, useMemo, useState } from 'react'
import {
    Link,
    createSearchParams,
    useLocation,
    useNavigate,
} from 'react-router-dom'
import { Col, Input, Row, FormGroup, Button } from 'reactstrap'
import CustomSelect from '../../../../component/Select/CustomSelect'
import ErrorComponent from '../../../../component/Form/ErrorComponent'
import { alertType, payType } from '../../../../utils/CONSTANT'
import {
    AiOutlineRollback,
    AiOutlinePlusCircle,
    AiFillEdit,
} from 'react-icons/ai'
import './styles/style.css'
import useRequest from '../../../../customHooks/useRequest'
import { useSelector } from 'react-redux'
import {
    deletePaymentRate,
    getAllKelas,
    getAllPaymentRateByPayment,
} from '../../../../utils/http'
import TableTarifTagihan from './components/TableTarifTagihan'
import useTable from '../../../../customHooks/useTable'
import SearchInput from '../../../../component/ActionButton/SearchInput'
import { alertConfirmation } from '../../../../component/Alert/swalConfirmation'

import queryString from 'query-string'
import ActionButton from './components/ActionButton'
import { ToastContainer } from 'react-toastify'
export default function PageTarifTagihan() {
    const location = useLocation()
    const { data } = location.state
    const navigate = useNavigate()
    const {
        data: dataPaymentRate,
        setData: setDataPaymentRate,
        sendData: sendDataPaymentRate,
        setDataDetail: setDataDetailPaymentRate,
        dataDetail: dataDetailPaymentRate,
        getData: getDataPaymentRate,
        isLoading: isLoadingPaymentRate,
        setIsLoading: setIsLoadingPaymentRate,
        isLoadingSendData: isLoadingSendDataPaymentRate,
        filterText,
        onChangeFilterText,
    } = useRequest()

    const {
        setIsOpenModalTambah,
        isOpenModalEdit,
        isOpenModalTambah,
        resetPaginationToggle,
        setResetPaginationToggle,
        setIsOpenModalEdit,
        isOpenModalForm,
        setIsOpenModalForm,
        isEdit,
        setIsEdit,
    } = useTable()
    const {
        data: dataKelas,
        setData: setDataKelas,
        getData: getDataKelas,
    } = useRequest()
    const dataUser = useSelector(({ authState }) => authState.data)
    const [queryFilter, setQueryFilter] = useState({
        class_id: '',
        period: `${data.period_start}/${data.period_end}`,
    })

    const subHeaderComponent = useMemo(() => {
        const onClearHandler = () => {
            if (filterText) {
                onChangeFilterText('')
                setResetPaginationToggle(!resetPaginationToggle)
            }
        }

        return (
            <SearchInput
                filterText={filterText}
                setFilterText={onChangeFilterText}
            />
        )
    }, [
        filterText,
        onChangeFilterText,
        resetPaginationToggle,
        setResetPaginationToggle,
    ])

    useEffect(() => {
        getDataKelas(() => getAllKelas(dataUser.token))
        console.log(queryFilter)
        console.log(data)
        getDataPaymentRate(() =>
            getAllPaymentRateByPayment(
                queryString.stringify(queryFilter),
                data.payment_id,
                dataUser.token
            )
        )
    }, [])

    const onDeleteClickHandler = async (formBody) => {
        alertConfirmation(alertType.delete, async () => {
            await sendDataPaymentRate(
                () =>
                    deletePaymentRate(formBody.payment_rate_id, dataUser.token),
                () =>
                    getDataPaymentRate(() =>
                        getAllPaymentRateByPayment(
                            queryString.stringify(queryFilter),
                            data.payment_id,
                            dataUser.token
                        )
                    ),
                null
            )
        })
    }

    const onClickEditByStudentHandler = (row) => {
        // console.log(row)
        // navigate({
        //   pathname: `/admin/tarif-tagihan/${data.payment_id}/tambah`, search: createSearchParams({
        //     type: "edit-siswa",
        //   })
        // }, { state: row }
        // )
    }
    const dataFiltered = useMemo(
        () =>
            dataPaymentRate.data.filter(
                (item) =>
                    item.class_name
                        .toString()
                        .toLowerCase()
                        .includes(filterText.toLocaleLowerCase()) ||
                    item.student_full_name
                        .toString()
                        .toLowerCase()
                        .includes(filterText.toLocaleLowerCase()) ||
                    item.period_start
                        .toString()
                        .toLowerCase()
                        .includes(filterText.toLocaleLowerCase()) ||
                    item.period_end
                        .toString()
                        .toLowerCase()
                        .includes(filterText.toLocaleLowerCase()) ||
                    item.pos_pay_name
                        .toString()
                        .toLowerCase()
                        .includes(filterText.toLocaleLowerCase()) ||
                    item.payment_type
                        .toString()
                        .toLowerCase()
                        .includes(filterText.toLocaleLowerCase())
            ),
        [filterText, dataPaymentRate.data]
    )

    const onBackHandler = () => {
        navigate(-1)
    }
    return (
        <>
            <div className="page-content">
                <ToastContainer />
                <h3>
                    Tarif Tagihan{' '}
                    <span style={{ fontSize: '0.8em', color: 'gray' }}>
                        Detail
                    </span>
                </h3>

                <div className="table-content d-flex flex-column gap-3">
                    <h4 style={{ fontSize: '1.1rem' }}>
                        Tarif -{' '}
                        <span
                            style={{ fontSize: '0.9em', color: 'gray' }}
                        >{`${data.pos_pay_name} - T.A ${data.period_start} / ${data.period_end}`}</span>
                    </h4>
                    <Row md={4} noGutters className="gap-3">
                        <Row md={1} noGutters>
                            <Col
                                md={3}
                                className="justify-content-center align-items-center d-flex"
                            >
                                <h5 className="section-title">Tahun</h5>
                            </Col>
                            <Col md={9}>
                                <Input
                                    style={{
                                        fontSize: '0.8rem',
                                        height: '100%',
                                    }}
                                    value={`${data.period_start} / ${data.period_end}`}
                                    disabled
                                />
                            </Col>
                        </Row>
                        <Row md={1} noGutters>
                            <Col
                                md={3}
                                className="justify-content-center align-items-center d-flex"
                            >
                                <h5 className="section-title">Kelas</h5>
                            </Col>
                            <Col md={9}>
                                <CustomSelect
                                    data={dataKelas.data}
                                    labelName="Kelas"
                                    optionName="class_name"
                                    optionValue={'class_id'}
                                    symbol="/"
                                    includeAll={true}
                                    withLabel={false}
                                    onChange={(e) =>
                                        setQueryFilter((prevState) => ({
                                            ...prevState,
                                            class_id: e.target.value,
                                        }))
                                    }
                                    value={queryFilter.class_id}
                                    name="class_id"
                                />
                            </Col>
                        </Row>
                        <Row md={1} noGutters>
                            <Col
                                md={8}
                                className="justify-content-center align-items-center d-flex"
                            >
                                <Button
                                    color="success"
                                    onClick={() =>
                                        getDataPaymentRate(() =>
                                            getAllPaymentRateByPayment(
                                                queryString.stringify(
                                                    queryFilter
                                                ),
                                                data.payment_id
                                            )
                                        )
                                    }
                                >
                                    Cari / tampilkan
                                </Button>
                            </Col>
                        </Row>
                    </Row>
                    <div style={{ borderBottom: '0.5px solid gray' }} />
                    <ActionButton onBackHandler={onBackHandler} data={data} />
                </div>
                <div className="table-content d-flex flex-column gap-3 mt-4">
                    <TableTarifTagihan
                        subHeaderComponent={subHeaderComponent}
                        onClickDeleteHandler={onDeleteClickHandler}
                        data={dataFiltered}
                        isLoading={isLoadingPaymentRate}
                        onClickEditHandler={onClickEditByStudentHandler}
                    />
                </div>
            </div>
        </>
    )
}
