import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { MDBDataTableV5 } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Button, Modal } from "reactstrap"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
import "./datatables.scss"
import axios from "../../axios/axios"
import { doGet, doPatch, doDelete } from "../../axios/restutils"
import BillDetailModal from "./billdetailmodal"
import SweetAlert from "react-bootstrap-sweetalert"
const DatatableTables = props => {
  const breadcrumbItems = [
    { title: "SKRKMK", link: "#" },
    { title: "Invoices", link: "#" },
    { title: "List", link: "#" },
  ]
  const [modalshow, setModalshow] = useState(false)
  const toggle = () => {
    setModalshow(!modalshow)
  }
  const [change, setChange] = useState(false)

  const ModelContent = () => {
    const [uomError, setUomError] = useState(null)
    const [rateError, setRateError] = useState(null)
    const [qtyError, setQtyError] = useState(null)
    const [billByError, setBillByError] = useState(null)
    const [billToError, setBillToError] = useState(null)
    const [itemError, setItemError] = useState(null)
    const [formData, setFormData] = useState(content)
    const [success_dlg, setsuccess_dlg] = useState(false)
    const [deletebillitem, setDeletebillitem] = useState([])
    const [dynamic_title, setdynamic_title] = useState("")
    const [dynamic_description, setdynamic_description] = useState("")
    const [newbillitem, setNewbillitem] = useState([])
    const [expenseData, setExpenseData] = useState(content.expenses)
    const [billItemData, setBillItemData] = useState(content.bill_items)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const assembleformdata = formData => {
      return {
        bill_by: formData.bill_by,
        bill_to: formData.bill_to,
        bw: formData.bw,
        date: formData.date,
        expenses: expenseData,
        frieght: formData.frieght,
        remarks: formData.remarks,
        vehicle_no: formData.vehicle_no,
        shipto: formData.shipto,
      }
    }
    const assemblebillitems = billItemData => {
      let billitems = billItemData.map(billItem => {
        return {
          ...billItem,
          item: billItem.item.value ? billItem.item.value : billItem.item,
        }
      })
      return billitems
    }
    const handleSubmit = () => {
      const data = {
        bill: assembleformdata(formData),
        billitems: assemblebillitems(billItemData),
        newbillitems: assemblebillitems(newbillitem),
        deletebillitem: deletebillitem,
      }
      doPatch("api/bill-edit/" + content.id, data)
        .then(() => {
          setSuccess(true)
          setSuccessMessage("Updated Successfully!!!")
          seteditable(false)
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
    const handledeleteclick = () => {
      setConfirmDelete(true)
    }
    const deleteclicks = () => {
      doDelete("api/bill-delete/" + content.id)
        .then(response => {
          setConfirmDelete(false)
          setsuccess_dlg(true)
          setdynamic_title("Deleted")
          setdynamic_description("Your file has been deleted.")
        })
        .catch(function (error) {
          setError(true)
          if (error.response) {
            if (error.response.status === 400) {
              setErrorMessage("Something went wrong!!! Please try again later")
            } else if (error.response.status === 500) {
              setErrorMessage("Something went wrong!!! Please try again later")
            }
          } else if (error.request) {
            setErrorMessage("Please check your internet connection")
          } else {
            setErrorMessage("Error", error.message)
          }
        })
    }
    return (
      <Col sm={12} md={3} className="mt-4">
        <Modal
          size="lg"
          isOpen={modalshow}
          toggle={() => {
            toggle()
          }}
          centered={true}
        >
          {success ? (
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
          {success_dlg ? (
            <SweetAlert
              success
              title={dynamic_title}
              onConfirm={() => {
                setsuccess_dlg(false)
                setModalshow(false)
                setChange(!change)
              }}
            >
              {dynamic_description}
            </SweetAlert>
          ) : null}
          {confirmDelete ? (
            <SweetAlert
              title="Are you sure?"
              warning
              showCancel
              confirmButtonText="Yes, delete it!"
              confirmBtnBsStyle="success"
              cancelBtnBsStyle="danger"
              onConfirm={() => {
                deleteclicks()
              }}
              onCancel={() => setConfirmDelete(false)}
            >
              Do you really want to delete this file? This can't be revert back.
              Please think again
            </SweetAlert>
          ) : null}
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myLargeModalLabel">
              {content.company_name.toUpperCase() +
                " TO " +
                content.party_name.toUpperCase()}
            </h5>
            <button
              onClick={() => {
                toggle()
              }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <BillDetailModal
              setFormData={setFormData}
              setExpenseData={setExpenseData}
              setBillItemData={setBillItemData}
              expenseData={expenseData}
              setDeletebillitem={setDeletebillitem}
              deletebillitem={deletebillitem}
              setNewbillitem={setNewbillitem}
              newbillitem={newbillitem}
              billItemData={billItemData}
              formData={formData}
            />
          </div>
          <div className="modal-footer">
            <div className="col-1 text-end">
              <button
                type="submit"
                className="btn btn-danger w-md waves-effect waves-light"
                onClick={() => {
                  handledeleteclick()
                }}
              >
                DELETE
              </button>
            </div>
            <div className="col-9 text-end">
              <button
                className="btn btn-success w-md waves-effect waves-light"
                type="submit"
                onClick={() => {
                  handleSubmit()
                }}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </Modal>
      </Col>
    )
  }
  const [content, setContent] = useState({})

  const sumqty = items => {
    let qty = items.map(company => {
      return company.qty
    })
    let sum = 0
    for (let i = 0; i < qty.length; i++) {
      sum += qty[i]
    }
    return sum.toFixed(2)
  }
  const sumuom = items => {
    let qty = items.map(company => {
      return company.uom
    })
    let sum = 0
    for (let i = 0; i < qty.length; i++) {
      sum += qty[i]
    }
    return sum.toFixed(2)
  }
  const calcamount = items => {
    let qty = items.map(company => {
      return company.rate * company.qty
    })
    let sum = 0
    for (let i = 0; i < qty.length; i++) {
      sum += qty[i]
    }
    return sum.toFixed(2)
  }
  const handlebuttonclick = idx => {
    doGet("api/bill-get/" + idx)
      .then(response => {
        window.open("http://skrkmk.in" + response.data.invoice)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const handleeditclick = company => {
    setModalshow(true)
    setContent(company)
  }
  const assembleCompany = tableCont => {
    let companies = tableCont.map((company, index) => {
      return {
        id: company.id,
        date: company.date,
        vehicle_no: company.vehicle_no,
        company_name: company.company_name,
        party_name: company.party_name,
        invoice_no: company.invoice_no,
        bill_items: company.bill_items,
        qty: sumqty(company.bill_items),
        uom: sumuom(company.bill_items),
        amount: calcamount(company.bill_items),
        get_bill: (
          <Button
            className="btn btn-info outline"
            onClick={e => {
              handlebuttonclick(company.id)
            }}
          >
            <i className="mdi mdi-cloud-print"></i>
          </Button>
        ),
        edit_bill: (
          <Button
            className="btn btn-dark outline"
            onClick={e => {
              handleeditclick(company)
            }}
          >
            <i className="mdi mdi-grease-pencil"></i>
          </Button>
        ),
      }
    })
    return companies
  }
  useEffect(() => {
    props.setBreadcrumbItems("Company List", breadcrumbItems)
    const getData = async () => {
      const tableCont = await axios.get("api/bill-detail-list/all")
      setData({ ...data, rows: assembleCompany(tableCont.data) })
    }
    getData()
  }, [change])

  const [data, setData] = useState({
    columns: [
      {
        label: "Invoice Number",
        field: "invoice_no",
        width: 0,
      },
      {
        label: "Date",
        field: "date",
        width: 0,
      },
      {
        label: "Vehicle No",
        field: "vehicle_no",
        width: 0,
      },
      {
        label: "Company Name",
        field: "company_name",
        width: 0,
      },
      {
        label: "Party Name",
        field: "party_name",
        width: 0,
      },
      {
        label: "UOM",
        field: "uom",
        width: 0,
      },
      {
        label: "Qty",
        field: "qty",
        width: 0,
      },
      {
        label: "Get Bill",
        field: "get_bill",
        width: 0,
      },
      {
        label: "Edit Bill",
        field: "edit_bill",
        width: 0,
      },
    ],
    rows: [],
  })
  return (
    <React.Fragment>
      <MetaTags>
        <title>Company List</title>
      </MetaTags>
      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
              <CardTitle className="h4">Company List </CardTitle>
              <br></br>
              <MDBDataTableV5
                responsive
                hover
                bordered
                data={data}
                filter="company_name"
                searchBottom={false}
                searchTop
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {modalshow ? <ModelContent /> : null}
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(DatatableTables)
