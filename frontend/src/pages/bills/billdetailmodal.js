import React, { useEffect, useState } from "react"
import Select from "react-select"
import axios from "../../axios/axios"
import Switch from "react-switch"
import { Col, Row, InputGroup } from "reactstrap"
import Flatpickr from "react-flatpickr"
import Expense from "./expense"
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
const assembleOption = tableCont => {
  let companies = tableCont.map(company => {
    return {
      label: company.name,
      value: company.id,
    }
  })
  return companies
}
const BillModal = ({
  setFormData,
  setExpenseData,
  setBillItemData,
  expenseData,
  setDeletebillitem,
  deletebillitem,
  billItemData,
  formData,
  setNewbillitem,
  newbillitem,
}) => {
  useEffect(() => {
    const getData = async () => {
      const tableCont = await axios.get("api/bill-to-list/all")
      setBillTo([{ options: assembleOption(tableCont.data) }])
    }
    getData()
  }, [])
  function handledate(selectedGroup) {
    setFormData({
      ...formData,
      date: returnDate(selectedGroup),
    })
    setDates(selectedGroup)
  }
  function handleSelectGroupstate(selectedGroup) {
    setFormData({
      ...formData,
      shipto: {
        ...shipto,
        state: selectedGroup.label,
        state_code: selectedGroup.value,
      },
    })
    setSelectedGroup(selectedGroup)
  }
  function handleSelectGroup(selectedGroup) {
    setFormData({
      ...formData,
      bill_to: selectedGroup.value,
    })
    setSelectedbillto(selectedGroup)
  }
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
  const handleBillItemChange = (index, e) => {
    const rows = [...billItemData]
    const { name, value } = e.target ? e.target : { name: "item", value: e }
    rows[index] = { ...rows[index], [name]: value }
    setBillItemData(rows)
  }
  const handleNewBillItemChange = (index, e) => {
    const rows = [...newbillitem]
    const { name, value } = e.target ? e.target : { name: "item", value: e }
    rows[index] = { ...rows[index], [name]: value }
    setNewbillitem(rows)
  }
  const [defaultValue, setDefaultValue] = useState({
    item: null,
    uom: "",
    qty: "",
    rate: "",
    po_number: "",
  })
  const handleAddRow = () => {
    setNewbillitem([...newbillitem, defaultValue])
  }
  const handleDeleteRow = () => {
    setNewbillitem(newbillitem.slice(0, -1))
  }
  const deletethisrow = (row, e) => {
    billItemData.splice(
      billItemData.findIndex(i => i.id === row.id),
      1
    )
    setDeletebillitem([...deletebillitem, row.id])
  }
  const handlechange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleshipchange = e => {
    setFormData({
      ...formData,
      shipto: { ...shipto, [e.target.name]: e.target.value },
    })
    setShipto({ ...shipto, [e.target.name]: e.target.value })
  }
  const customRowAdded = billItemData => {
    const listItems = billItemData.map((cusRow, index) => (
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
            value={{
              label: cusRow.item
                ? cusRow.item.label
                  ? cusRow.item.label
                  : cusRow.item.charAt(0).toUpperCase() + cusRow.item.slice(1)
                : null,
              value: cusRow.item
                ? cusRow.item.value
                  ? cusRow.item.value
                  : cusRow.item
                : null,
            }}
            name="genes"
            options={GenesGroup}
            classNamePrefix="select2-selection"
            onChange={e => {
              handleBillItemChange(index, e)
            }}
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
              id="example-number-input"
              onChange={e => {
                handleBillItemChange(index, e)
              }}
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
              value={cusRow.qty}
              id="example-number-input"
              onChange={e => {
                handleBillItemChange(index, e)
              }}
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
              value={cusRow.rate}
              id="example-number-input"
              onChange={e => {
                handleBillItemChange(index, e)
              }}
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
              value={cusRow.po_number}
              id="example-number-input"
              onChange={e => {
                handleBillItemChange(index, e)
              }}
            />
          </div>
          {billItemData.length > 1 ? (
            <>
              <div className="col-3 text-end">
                <button
                  onClick={e => {
                    deletethisrow(cusRow, e)
                  }}
                  className="btn btn-warning"
                >
                  Delete this item
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </Row>
      </div>
    ))
    return listItems
  }
  const customRow = billitem => {
    const listItems = billitem.map((cusRow, index) => (
      <div>
        <h5>Bill Item {index + billItemData.length + 1}</h5>
        <Row className="mb-4">
          <label
            htmlFor="example-text-input"
            className="col-md-2 col-form-label"
          >
            Genes :
          </label>
          <Select
            className="col-md-3 col-form-control"
            value={{
              label: cusRow.item
                ? cusRow.item.label
                  ? cusRow.item.label
                  : cusRow.item.charAt(0).toUpperCase() + cusRow.item.slice(1)
                : null,
              value: cusRow.item
                ? cusRow.item.value
                  ? cusRow.item.value
                  : cusRow.item
                : null,
            }}
            name="genes"
            options={GenesGroup}
            classNamePrefix="select2-selection"
            onChange={e => {
              handleNewBillItemChange(index, e)
            }}
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
              id="example-number-input"
              onChange={e => {
                handleNewBillItemChange(index, e)
              }}
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
              value={cusRow.qty}
              id="example-number-input"
              onChange={e => {
                handleNewBillItemChange(index, e)
              }}
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
              value={cusRow.rate}
              id="example-number-input"
              onChange={e => {
                handleNewBillItemChange(index, e)
              }}
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
              value={cusRow.po_number}
              id="example-number-input"
              onChange={e => {
                handleNewBillItemChange(index, e)
              }}
            />
          </div>
        </Row>
      </div>
    ))
    return listItems
  }
  const [bilTo, setBillTo] = useState([{ options: [] }])
  const [bilBy, setBillBy] = useState([{ options: [] }])
  const [shipdetail, setShipdetail] = useState(formData.shipto ? false : true)
  const [shipto, setShipto] = useState(
    formData.shipto ? formData.shipto : { name: "", address: "", gstin: "" }
  )
  const [selectedGroup, setSelectedGroup] = useState(
    formData.shipto
      ? { label: formData.shipto.state, value: formData.shipto.state_code }
      : null
  )
  var parts = formData.date.split("-")
  var mydate = new Date(parts[0], parts[1] - 1, parts[2])
  const [dates, setDates] = useState(mydate)
  const [changeexpense, setChangeexpense] = useState(false)
  const [selectedbillto, setSelectedbillto] = useState({
    label: formData.party_name,
    value: formData.bill_to,
  })
  const [selectedbillby, setSelectedbillby] = useState({
    label: formData.company_name,
    value: formData.bill_by,
  })

  return (
    <Row>
      <Col>
        <Row className="mb-3">
          <div className="col-md-5">
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
          <label
            htmlFor="example-text-input"
            className="col-md-3 col-form-label"
          >
            Invoice Number :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              value={formData.invoice_no}
              readOnly={true}
              id="example-number-input"
            />
          </div>
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
                  handledate(date)
                }}
              />
            </InputGroup>
          </div>
          <label
            htmlFor="example-email-input"
            className="col-md-3 col-form-label"
          >
            Vehicle Number :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              name="vehicle_no"
              value={formData.vehicle_no}
              onChange={e => {
                handlechange(e)
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
            isDisabled={true}
            options={bilBy}
            classNamePrefix="select2-selection"
          />
          <label
            htmlFor="example-search-input"
            className="col-md-3 col-form-label"
          >
            Bill To :
          </label>
          <Select
            className="col-md-3 col-form-control"
            value={selectedbillto}
            onChange={e => {
              handleSelectGroup(e)
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
              value={formData.remarks}
              name="remarks"
              onChange={e => {
                handlechange(e)
              }}
              id="example-number-input"
            />
          </div>
          <label
            htmlFor="example-email-input"
            className="col-md-3 col-form-label"
          >
            Frieght :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              name="frieght"
              value={formData.frieght}
              onChange={e => {
                handlechange(e)
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
                className="col-md-3 col-form-label"
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
                className="col-md-3 col-form-label"
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
        {expenseData && changeexpense && (
          <Expense
            formExpense={expenseData}
            setFormExpense={setExpenseData}
            editable={true}
          />
        )}
        {customRowAdded(billItemData)}
        {customRow(newbillitem)}
        <Row>
          <div className="col-2 text-end">
            <button
              onClick={() => {
                handleAddRow()
              }}
              className="btn btn-info"
            >
              Add Row
            </button>
          </div>
          <div className="col-3 text-end">
            <button
              disabled={!newbillitem.length}
              onClick={e => {
                handleDeleteRow()
              }}
              className="btn btn-info"
            >
              Delete Row
            </button>
          </div>
          <div className="col-3 text-end">
            <button
              onClick={() => {
                setChangeexpense(!changeexpense)
              }}
              className="btn btn-secondary"
            >
              {!changeexpense ? <>Edit Expense </> : <>Discard</>}
            </button>
          </div>
        </Row>
      </Col>
    </Row>
  )
}

export default BillModal
