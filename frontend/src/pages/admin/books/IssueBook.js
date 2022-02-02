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
import { setBreadcrumbItems } from "../../../store/actions"
import Switch from "react-switch"
import { doGet, doPut } from "../../../axios/restutils"
import SweetAlert from "react-bootstrap-sweetalert"
const FormElements = props => {
  const breadcrumbItems = [
    { title: "Jaypee Library", link: "#" },
    { title: "Issue Book", link: "#" },
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
  const [selectedbook, setselectedbook] = useState(null)
  const [selecteduser, setselecteduser] = useState(null)
  const [vehicleNumber, setVehicleNumber] = useState("")
  const [uri, setUri] = useState("")
  const [remarks, setRemarks] = useState("")
  const [user, setUser] = useState([{ options: [] }])
  const [book, setBook] = useState([{ options: [] }])
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
    props.setBreadcrumbItems("Issue Book", breadcrumbItems)
    const getData = async () => {
      const tableCont = await doGet("book-list/all")
      setUser([{ options: assembleOption(tableCont.data) }])
      const tableCon = await doGet("book-list/all")
      setBook([{ options: assembleOption(tableCon.data) }])
    }
    getData()
  }, [])
  function handleSelectBook(selectedGroup) {
    setselectedbook(selectedGroup)
  }
  function handleSelectUser(selectedGroup) {
    setselecteduser(selectedGroup)
  }
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [invoiceNo, setInvoiceNo] = useState("")
  return (
    <React.Fragment>
      <MetaTags>
        <title>Issue Book</title>
      </MetaTags>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle className="h4">Issue Book</CardTitle>
              <p className="card-title-desc">
                Enter Following Details to Issue Book
              </p>
              <Row className="mb-4">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Book :
                </label>
                <Select
                  className="col-md-3 col-form-control"
                  value={selectedbook}
                  onChange={e => {
                    handleSelectBook(e)
                  }}
                  options={book}
                  classNamePrefix="select2-selection"
                />
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                  Student :
                </label>
                <Select
                  className="col-md-3 col-form-control"
                  value={selecteduser}
                  onChange={e => {
                    handleSelectUser(e)
                  }}
                  options={user}
                  classNamePrefix="select2-selection"
                />
              </Row>
              <Row>
                <div className="col-10 text-end">
                  <button
                    className="btn btn-primary w-md waves-effect waves-light"
                    type="submit"
                    onClick={() => {
                      handleSubmit()
                    }}
                  >
                    Issue Book
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
