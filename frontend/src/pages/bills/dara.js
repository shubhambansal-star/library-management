import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import Select from "react-select"
import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  InputGroup,
  Table,
  Alert,
} from "reactstrap"
import Flatpickr from "react-flatpickr"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
import axios from "../../axios/axios"
import { doPut } from "../../axios/restutils"

const FormElements = props => {
  const breadcrumbItems = [
    { title: "SKRKMK", link: "#" },
    { title: "Dara", link: "#" },
  ]
  const returnDate = dates => {
    try {
      var dd = String(dates.getDate()).padStart(2, "0")
      var mm = String(dates.getMonth() + 1).padStart(2, "0")
      var yyyy = dates.getFullYear()
      var today = yyyy + "-" + mm + "-" + dd
    } catch (e) {
      var dd = String(dates[0].getDate()).padStart(2, "0")
      var mm = String(dates[0].getMonth() + 1).padStart(2, "0")
      var yyyy = dates[0].getFullYear()
      var today = yyyy + "-" + mm + "-" + dd
    }
    return today
  }
  const handledara = billitem => {
    let dara = billitem.map(bill => {
      return {
        weightperbag: bill.bagspbag,
        bags: bill.bags,
        rate: bill.rate,
      }
    })
    return dara
  }
  const handleSubmit = () => {
    const formData = {
      purchase_date: returnDate(dates),
      loading_date: returnDate(loadingdates),
      bill_to: selectedbillto ? selectedbillto.value : null,
      vehicle_no: vehicleNumber,
      weight: actweight,
      rate: avgerate,
      dara: handledara(billitem),
    }
    console.log(formData)
    doPut("api/dara/0", formData)
      .then(response => {
        console.log(response)
      })
      .catch(function (error) {
        setError(true)
        if (error.response) {
          if (error.response.status === 400) {
            setErrorMessage("Please fill the form correctly")
          } else if (error.response.status === 500) {
            setErrorMessage("Internal Server Error")
          }
        } else if (error.request) {
          setErrorMessage("Please check your internet connection")
        } else {
          setErrorMessage("Error", error.message)
        }
      })
  }
  const datesss = new Date()
  const [dates, setDates] = useState(datesss)
  const [loadingdates, setLoadingDates] = useState(datesss)
  const [selectedbillto, setSelectedbillto] = useState(null)
  const [vehicleNumber, setVehicleNumber] = useState("")
  const [actweight, setActWeight] = useState("")
  const [avgerate, setAvgerate] = useState("")
  const [bilTo, setBillTo] = useState([{ options: [] }])
  const assembleOption = tableCont => {
    let companies = tableCont.map(company => {
      return {
        label: company.name,
        value: company.id,
      }
    })
    return companies
  }
  useEffect(() => {
    props.setBreadcrumbItems("Dara", breadcrumbItems)
    const getData = async () => {
      const tableCon = await axios.get("api/bill-to-list/all")
      setBillTo([{ options: assembleOption(tableCon.data) }])
    }
    getData()
  }, [])
  function handleSelectbillto(selectedGroup) {
    setSelectedbillto(selectedGroup)
  }
  const [defaultValue, setDefaultValue] = useState({
    bagspbag: 0.6,
    bags: 0,
    weight: 0,
    rate: 0,
    amount: 0,
  })
  const [billitem, setbillitem] = useState([defaultValue])
  const handleAddRow = () => {
    setbillitem([...billitem, defaultValue])
  }
  const handleDeletethisRow = index => {
    const rows = [...billitem]
    rows.splice(index, 1)
    setbillitem(rows)
  }
  const handleBillItemChange = (index, e) => {
    const rows = [...billitem]
    const { name, value } = e.target ? e.target : { name: "item", value: e }
    rows[index] = { ...rows[index], [name]: value }
    setbillitem(rows)
  }
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const onDismiss = () => {
    setError(false)
  }
  const onDismisssuccess = () => {
    setSucess(false)
  }
  const totalbags = () => {
    return billitem.reduce(function (prev, current) {
      return prev + +current.bags
    }, 0)
  }
  const totalweight = () => {
    return billitem.reduce(function (prev, current) {
      return prev + +current.bags * current.bagspbag
    }, 0)
  }
  const avgrate = () => {
    return totalweight() ? totalamount() / totalweight() : 0
  }
  const totalamount = () => {
    return billitem.reduce(function (prev, current) {
      return prev + +current.bags * current.bagspbag * current.rate
    }, 0)
  }
  const checkweight = () => {
    let flag = true
    flag = (parseFloat(actweight) - totalweight()).toFixed(2) > 0 ? true : false
    return flag
  }
  const checkamount = () => {
    let flag = true
    flag =
      (parseFloat(avgerate) * parseFloat(actweight) - totalamount()).toFixed(
        2
      ) > 5
        ? true
        : false
    return flag
  }
  return (
    <React.Fragment>
      <MetaTags>
        <title>Dara</title>
      </MetaTags>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle className="h4">Dara</CardTitle>
              <br></br>
              {error && (
                <Alert color="danger" isOpen={error} toggle={onDismiss}>
                  {errorMessage}
                  {billByError ? <br></br> : <></>}
                  {billByError ? "Bill By : " + billByError : ""}
                  {billToError ? <br></br> : <></>}
                  {billToError ? "Bill To : " + billToError : ""}
                  {itemError ? <br></br> : <></>}
                  {itemError ? "Item : " + itemError : ""}
                  {uomError ? <br></br> : <></>}
                  {uomError ? "UOM : " + uomError : ""}
                  {qtyError ? <br></br> : <></>}
                  {qtyError ? "QTY : " + qtyError : ""}
                  {rateError ? <br></br> : <></>}
                  {rateError ? "Rate : " + rateError : ""}
                </Alert>
              )}
              {sucess && (
                <Alert
                  color="success"
                  isOpen={sucess}
                  toggle={onDismisssuccess}
                >
                  Dara Created Successfully!!!
                </Alert>
              )}
              <Row className="mb-4">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Bill To :
                </label>
                <Select
                  className="col-md-3 col-form-control"
                  value={selectedbillto}
                  onChange={e => {
                    handleSelectbillto(e)
                  }}
                  options={bilTo}
                  classNamePrefix="select2-selection"
                />
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                  Vehicle No :
                </label>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="text"
                    value={vehicleNumber}
                    onChange={e => {
                      setVehicleNumber(e.target.value)
                    }}
                    id="example-number-input"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-email-input"
                  className="col-md-2 col-form-label"
                >
                  Purchase Date :
                </label>
                <div className="col-md-3">
                  <InputGroup>
                    <Flatpickr
                      className="col-md-3 form-control"
                      value={dates}
                      options={{
                        enableTime: false,
                        altInput: true,
                        altFormat: "F j, Y",
                        dateFormat: "y-m-d",
                      }}
                      onChange={date => {
                        setDates(date)
                      }}
                    />
                  </InputGroup>
                </div>
                <label
                  htmlFor="example-email-input"
                  className="col-md-2 col-form-label"
                >
                  Loading Date :
                </label>
                <div className="col-md-3">
                  <InputGroup>
                    <Flatpickr
                      className="col-md-3 form-control"
                      value={loadingdates}
                      options={{
                        enableTime: false,
                        altInput: true,
                        altFormat: "F j, Y",
                        dateFormat: "y-m-d",
                      }}
                      onChange={date => {
                        setLoadingDates(date)
                      }}
                    />
                  </InputGroup>
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-email-input"
                  className="col-md-2 col-form-label"
                >
                  Actual Weight :
                </label>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="number"
                    name="rate"
                    value={actweight}
                    onChange={e => {
                      setActWeight(e.target.value)
                    }}
                    id="example-number-input"
                  />
                </div>
                <label
                  htmlFor="example-email-input"
                  className="col-md-2 col-form-label"
                >
                  Average Rate :
                </label>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="number"
                    name="rate"
                    value={avgerate}
                    onChange={e => {
                      setAvgerate(e.target.value)
                    }}
                    id="example-number-input"
                  />
                </div>
              </Row>
              <Row className="mb-3"></Row>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Weight Per Bag</th>
                      <th>Bags</th>
                      <th>Weight</th>
                      <th>Rate</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {billitem.map((data, index) => {
                      return (
                        <tr>
                          <th>{index + 1}</th>
                          <td>
                            <input
                              className="form-control"
                              type="number"
                              name="bagspbag"
                              value={data.bagspbag}
                              onChange={e => {
                                handleBillItemChange(index, e)
                              }}
                              id="example-number-input"
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="number"
                              name="bags"
                              min="0"
                              value={data.bags}
                              onChange={e => {
                                handleBillItemChange(index, e)
                              }}
                              id="example-number-input"
                            />
                          </td>
                          <td>{(data.bagspbag * data.bags).toFixed(2)}</td>
                          <td>
                            <input
                              className="form-control"
                              type="number"
                              name="rate"
                              value={data.rate}
                              onChange={e => {
                                handleBillItemChange(index, e)
                              }}
                              id="example-number-input"
                            />
                          </td>
                          <td>
                            {(data.rate * data.bagspbag * data.bags).toFixed(2)}
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                handleDeletethisRow(index)
                              }}
                              className="btn btn-danger"
                            >
                              <i className="mdi mdi-18px mdi-delete-circle-outline"></i>
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                    <tr className="table-warning">
                      <th>TOTAL</th>
                      <th></th>
                      <th>{totalbags().toFixed(0)}</th>
                      <th>{totalweight().toFixed(2)}</th>
                      <th>{avgrate().toFixed(2)}</th>
                      <th>{totalamount().toFixed(2)}</th>
                      <th>
                        <button
                          onClick={() => {
                            handleAddRow()
                          }}
                          className="btn btn-success"
                        >
                          <i className="fas fa-lg fa-plus-circle"></i>
                        </button>
                      </th>
                    </tr>
                    <tr className="table-danger">
                      <th>DIFFERENCE</th>
                      <th></th>
                      <th></th>
                      <th>
                        {parseFloat(actweight)
                          ? (parseFloat(actweight) - totalweight()).toFixed(2)
                          : 0}
                      </th>
                      <th>
                        {parseFloat(avgerate)
                          ? (parseFloat(avgerate) - avgrate()).toFixed(2)
                          : 0}
                      </th>
                      <th>
                        {parseFloat(avgerate)
                          ? (
                              parseFloat(avgerate) * parseFloat(actweight) -
                              totalamount()
                            ).toFixed(2)
                          : 0}
                      </th>
                      <th>
                        <button
                          className="btn btn-info waves-effect waves-light"
                          type="submit"
                          disabled={checkweight() || checkamount()}
                          onClick={() => {
                            handleSubmit()
                          }}
                        >
                          <i className="mdi mdi-24px mdi-cloud-print"></i>
                        </button>
                      </th>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(FormElements)
