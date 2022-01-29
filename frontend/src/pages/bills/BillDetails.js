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
  UncontrolledAlert,
  Alert,
} from "reactstrap"
import Flatpickr from "react-flatpickr"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
import axios from "../../axios/axios"
import Switch from "react-switch"
import { doPut } from "../../axios/restutils"
import SweetAlert from "react-bootstrap-sweetalert"
const GenesGroup = [
  {
    options: [
      { label: "Maize", value: "maize" },
      { label: "Paddy", value: "paddy" },
      { label: "Paddy Sugandh", value: "paddy sugandh" },
      { label: "Paddy Sarbati", value: "paddy sarbati" },
      { label: "Paddy 1509", value: "paddy 1509" },
      { label: "Paddy RS10", value: "paddy RS10" },
      { label: "Paddy 1121", value: "paddy 1121" },
      { label: "Bajra", value: "bajra" },
      { label: "Wheat", value: "wheat" },
      { label: "Mustard Seeds", value: "mustard_seed" },
    ],
  },
]
const StateGroup = [
  {
    options: [
      { label: "Andhra Pradesh", value: 37 },
      { label: "Arunachal Pradesh", value: 12 },
      { label: "Assam", value: 18 },
      { label: "Bihar", value: 10 },
      { label: "Chattisgarh", value: 22 },
      { label: "Delhi", value: 7 },
      { label: "Goa", value: 30 },
      { label: "Gujarat", value: 24 },
      { label: "Haryana", value: 6 },
      { label: "Himachal Pradesh", value: 2 },
      { label: "Jammu and Kashmir", value: 1 },
      { label: "Jharkhand", value: 20 },
      { label: "Karnataka", value: 29 },
      { label: "Kerala", value: 32 },
      { label: "Lakshadweep Islands", value: 31 },
      { label: "Madhya Pradesh", value: 23 },
      { label: "Maharashtra", value: 27 },
      { label: "Manipur", value: 14 },
      { label: "Meghalaya", value: 17 },
      { label: "Mizoram", value: 15 },
      { label: "Nagaland", value: 13 },
      { label: "Odisha", value: 21 },
      { label: "Pondicherry", value: 34 },
      { label: "Punjab", value: 3 },
      { label: "Rajasthan", value: 8 },
      { label: "Sikkim", value: 11 },
      { label: "Tamil Nadu", value: 33 },
      { label: "Telangana", value: 36 },
      { label: "Tripura", value: 16 },
      { label: "Uttar Pradesh", value: 9 },
      { label: "Uttarakhand", value: 5 },
      { label: "West Bengal", value: 19 },
    ],
  },
]
const Offsymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2,
      }}
    >
      {" "}
      B
    </div>
  )
}
const ShipToSame = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 8,
        color: "#fff",
        paddingRight: 2,
      }}
    >
      {" "}
      Same
    </div>
  )
}
const ShipToDifferent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2,
      }}
    >
      {" "}
      Diff
    </div>
  )
}

const OnSymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2,
      }}
    >
      {" "}
      A
    </div>
  )
}
const FormElements = props => {
  const breadcrumbItems = [
    { title: "SKRKMK", link: "#" },
    { title: "Bill Details", link: "#" },
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
  const returnBillitem = billitem => {
    let billitemss = billitem.map(billite => {
      return { ...billite, item: billite.item ? billite.item.value : null }
    })
    console.log(billitemss)
    return billitemss
  }
  const [uomError, setUomError] = useState(null)
  const [rateError, setRateError] = useState(null)
  const [qtyError, setQtyError] = useState(null)
  const [billByError, setBillByError] = useState(null)
  const [billToError, setBillToError] = useState(null)
  const [itemError, setItemError] = useState(null)
  const handleSubmit = () => {
    const bill = {
      date: returnDate(dates),
      bill_to: selectedbillto ? selectedbillto.value : null,
      bill_by: selectedbillby ? selectedbillby.value : null,
      vehicle_no: vehicleNumber,
      remarks: remarks,
      frieght: frieght,
      bw: switch1 ? "A" : "B",
      invoice_no: !switch1 ? invoiceNo : "",
      shipto: shipto,
    }
    const formData = {
      bill: bill,
      billitem: returnBillitem(billitem),
    }
    doPut("api/bill-create", formData)
      .then(response => {
        setUri("http://skrkmk.in" + response.data.invoice)
        setSucess(true)
        setSelectedbillto(null)
        setSelectedbillby(null)
        setVehicleNumber("")
        setRemarks("")
        setswitch1(true)
        setfrieght(0)
        setbillitem([defaultValue])
        setShipto({ name: "", address: "", gstin: "" })
        setSelectedGroup(null)
        setShipdetail(true)
      })
      .catch(function (error) {
        setError(true)
        if (error.response) {
          if (error.response.status === 400) {
            setErrorMessage("Please fill the form correctly")
            if (error.response.data.uom) {
              setUomError(error.response.data.uom[0])
            }
            if (error.response.data.rate) {
              setRateError(error.response.data.rate[0])
            }
            if (error.response.data.qty) {
              setQtyError(error.response.data.qty[0])
            }
            if (error.response.data.bill_by) {
              setBillByError("Please select a company name")
            }
            if (error.response.data.bill_to) {
              setBillToError("Please select a party name")
            }
            if (error.response.data.item) {
              setItemError("Please select genes")
            }
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
  const [shipdetail, setShipdetail] = useState(true)

  const datesss = new Date()
  const [dates, setDates] = useState(datesss)
  const [switch1, setswitch1] = useState(true)
  const [frieght, setfrieght] = useState(0)
  const [selectedbillto, setSelectedbillto] = useState(null)
  const [selectedbillby, setSelectedbillby] = useState(null)
  const [vehicleNumber, setVehicleNumber] = useState("")
  const [uri, setUri] = useState("")
  const [remarks, setRemarks] = useState("")
  const [bilTo, setBillTo] = useState([{ options: [] }])
  const [bilBy, setBillBy] = useState([{ options: [] }])
  const [shipto, setShipto] = useState({ name: "", address: "", gstin: "" })
  const assembleOption = tableCont => {
    let companies = tableCont.map(company => {
      return {
        label: company.name,
        value: company.id,
      }
    })
    return companies
  }
  const [selectedGroup, setSelectedGroup] = useState(null)
  useEffect(() => {
    props.setBreadcrumbItems("Bill Details", breadcrumbItems)
    const getData = async () => {
      const tableCont = await axios.get("api/bill-to-list/all")
      setBillTo([{ options: assembleOption(tableCont.data) }])
      const tableCon = await axios.get("api/bill-by-list/all")
      setBillBy([{ options: assembleOption(tableCon.data) }])
    }
    getData()
  }, [])
  function handleSelectbillto(selectedGroup) {
    setSelectedbillto(selectedGroup)
  }
  function handleSelectGroupstate(selectedGroup) {
    setShipto({
      ...shipto,
      state: selectedGroup.label,
      state_code: selectedGroup.value,
    })
    setSelectedGroup(selectedGroup)
  }
  function handleshipchange(e) {
    setShipto({ ...shipto, [e.target.name]: e.target.value })
  }
  function handleSelectbillby(selectedGroup) {
    setSelectedbillby(selectedGroup)
  }
  const [defaultValue, setDefaultValue] = useState({
    item: null,
    uom: "",
    qty: "",
    rate: "",
    po_number: "",
  })
  const [billitem, setbillitem] = useState([defaultValue])
  const handleAddRow = () => {
    setbillitem([...billitem, defaultValue])
  }
  const handleDeleteRow = () => {
    setbillitem(billitem.slice(0, -1))
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
  const [invoiceNo, setInvoiceNo] = useState("")
  const handlevehicle = e => {
    setVehicleNumber(e.target.value)
  }
  const handlefrieght = e => {
    setfrieght(e.target.value)
  }
  const handleremarks = e => {
    setRemarks(e.target.value)
  }
  const customRow = () => {
    const listItems = billitem.map((cusRow, index) => (
      <div>
        <h5>Bill Item {index + 1}</h5>
        <Row className="mb-4">
          <label
            htmlFor="example-text-input"
            className="col-md-2 col-form-label"
          >
            Genes :
          </label>
          <Select
            className="col-md-3 col-form-control"
            value={cusRow.item}
            name="genes"
            onChange={e => {
              handleBillItemChange(index, e)
            }}
            options={GenesGroup}
            classNamePrefix="select2-selection"
          />
          <label
            htmlFor="example-search-input"
            className="col-md-2 col-form-label"
          >
            UOM :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="number"
              name="uom"
              value={cusRow.uom}
              onChange={e => {
                handleBillItemChange(index, e)
              }}
              id="example-number-input"
            />
          </div>
        </Row>
        <Row className="mb-4">
          <label
            htmlFor="example-text-input"
            className="col-md-2 col-form-label"
          >
            Quantity :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="number"
              name="qty"
              onChange={e => {
                handleBillItemChange(index, e)
              }}
              value={cusRow.qty}
              id="example-number-input"
            />
          </div>
          <label
            htmlFor="example-search-input"
            className="col-md-2 col-form-label"
          >
            Rate :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="number"
              name="rate"
              onChange={e => {
                handleBillItemChange(index, e)
              }}
              value={cusRow.rate}
              id="example-number-input"
            />
          </div>
        </Row>
        <Row className="mb-4">
          <label
            htmlFor="example-text-input"
            className="col-md-2 col-form-label"
          >
            PO Number :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              name="po_number"
              onChange={e => {
                handleBillItemChange(index, e)
              }}
              value={cusRow.po_number}
              id="example-number-input"
            />
          </div>
        </Row>
      </div>
    ))
    return listItems
  }
  const onDismiss = () => {
    setError(false)
  }
  const onDismisssuccess = () => {
    setSucess(false)
  }
  return (
    <React.Fragment>
      <MetaTags>
        <title>Bill Details</title>
      </MetaTags>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle className="h4">Invoice Details</CardTitle>
              <p className="card-title-desc">
                Please Enter the details below to complete the invoice
              </p>
              {sucess ? (
                <SweetAlert
                  title="Bill Created Successfully"
                  success
                  showCancel
                  confirmBtnText="See Bill"
                  cancelBtnText="No"
                  confirmBtnBsStyle="success"
                  cancelBtnBsStyle="warning"
                  onConfirm={() => {
                    window.open(uri)
                    setSucess(false)
                  }}
                  onCancel={() => {
                    setSucess(false)
                  }}
                ></SweetAlert>
              ) : null}
              {error && (
                <SweetAlert
                  title={errorMessage}
                  error
                  timeout={5000}
                  showConfirm={true}
                  onConfirm={() => {
                    setError(false)
                  }}
                >
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
                </SweetAlert>
              )}
              <Row className="mb-3">
                <div className="col-md-2">
                  <Switch
                    uncheckedIcon={<Offsymbol />}
                    checkedIcon={<OnSymbol />}
                    onColor="#626ed4"
                    onChange={() => {
                      setswitch1(!switch1)
                    }}
                    checked={switch1}
                  />
                </div>
                <div className="col-md-3">
                  <Switch
                    uncheckedIcon={<ShipToDifferent />}
                    checkedIcon={<ShipToSame />}
                    onColor="#626ed4"
                    onChange={() => {
                      setShipdetail(!shipdetail)
                    }}
                    checked={shipdetail}
                  />
                </div>
                {!switch1 && (
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Invoice Number :
                  </label>
                )}
                {!switch1 && (
                  <div className="col-md-3">
                    <input
                      className="form-control"
                      type="text"
                      value={invoiceNo}
                      onChange={e => {
                        setInvoiceNo(e.target.value)
                      }}
                      id="example-number-input"
                    />
                  </div>
                )}
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-email-input"
                  className="col-md-2 col-form-label"
                >
                  Date :
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
                  Vehicle Number :
                </label>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="text"
                    value={vehicleNumber}
                    onChange={e => {
                      handlevehicle(e)
                    }}
                    id="example-number-input"
                  />
                </div>
              </Row>
              <Row className="mb-4">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Bill By :
                </label>
                <Select
                  className="col-md-3 col-form-control"
                  value={selectedbillby}
                  onChange={e => {
                    handleSelectbillby(e)
                  }}
                  options={bilBy}
                  classNamePrefix="select2-selection"
                />
                <label
                  htmlFor="example-search-input"
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
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Remarks :
                </label>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="text"
                    value={remarks}
                    onChange={e => {
                      handleremarks(e)
                    }}
                    id="example-number-input"
                  />
                </div>
                <label
                  htmlFor="example-email-input"
                  className="col-md-2 col-form-label"
                >
                  Frieght :
                </label>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="text"
                    value={frieght}
                    onChange={e => {
                      handlefrieght(e)
                    }}
                    id="example-number-input"
                  />
                </div>
              </Row>
              {!shipdetail && (
                <>
                  <h5>Ship To Details</h5>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-email-input"
                      className="col-md-2 col-form-label"
                    >
                      Name :
                    </label>
                    <div className="col-md-3">
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={shipto.name}
                        onChange={e => handleshipchange(e)}
                        id="example-number-input"
                      />
                    </div>
                    <label
                      htmlFor="example-email-input"
                      className="col-md-2 col-form-label"
                    >
                      Address :
                    </label>
                    <div className="col-md-3">
                      <input
                        className="form-control"
                        type="text"
                        name="address"
                        value={shipto.address}
                        onChange={e => handleshipchange(e)}
                        id="example-number-input"
                      />
                    </div>
                  </Row>
                  <Row className="mb-4">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      State :
                    </label>
                    <Select
                      className="col-md-3 col-form-control"
                      value={selectedGroup}
                      onChange={e => {
                        handleSelectGroupstate(e)
                      }}
                      options={StateGroup}
                      classNamePrefix="select2-selection"
                    />
                    <label
                      htmlFor="example-search-input"
                      className="col-md-2 col-form-label"
                    >
                      GSTIN :
                    </label>
                    <div className="col-md-3">
                      <input
                        className="form-control"
                        type="text"
                        name="gstin"
                        value={shipto.gstin}
                        onChange={e => handleshipchange(e)}
                        id="example-number-input"
                      />
                    </div>
                  </Row>
                </>
              )}
              {customRow()}
              <Row>
                <div className="col-2 text-end">
                  <button
                    onClick={() => {
                      handleAddRow()
                    }}
                    className="btn btn-secondary"
                  >
                    Add Row
                  </button>
                </div>
                <div className="col-3 text-end">
                  <button
                    onClick={() => {
                      handleDeleteRow()
                    }}
                    className="btn btn-secondary"
                  >
                    Delete Row
                  </button>
                </div>
                <div className="col-10 text-end">
                  <button
                    className="btn btn-primary w-md waves-effect waves-light"
                    type="submit"
                    onClick={() => {
                      handleSubmit()
                    }}
                  >
                    CREATE BILL
                  </button>
                </div>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(FormElements)
