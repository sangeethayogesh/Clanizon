
import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Card, CardContent, Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import { List, MenuItem } from "material-ui";
import Select from '@material-ui/core/Select';

function Footer(props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <div className="sum_part">Sum:<span class="price_amt">{props.grandTotal.toString()}</span></div>
      </CardContent>
    </Card>
  )
}
function ProductLead(props) {
  const [data, setData] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [productList, setProductList] = useState([]);
  const [businessId, setBusinessId] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productModel, setProductModel] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);
  //method 1

  const calculateGrandTotal = () => {
    var gtotal = 0;
    if (data.length > 0) {
      var gtotal = data.reduce(function (prev, cur) {
        return parseFloat(prev) + parseFloat(cur.total);
      }, 0);
    }
    setGrandTotal(gtotal)
  }


  //method2
  useEffect(() => {
    calculateGrandTotal()
  }, [data])
  //this function triggers each time whenever data is changed

  const getData = () => {
    var productList = JSON.parse(localStorage.productList);
    setProductList(productList);
    // this.defaultSetCellValue(rowData,value)
    console.log(productList);
  }
  useEffect(() => {
    getData()

  }, [])

  return (
    <div className="product_table">
      <MaterialTable

        columns={[
          {
            title: "Business",
            field: "businessName",
            editComponent: editProps => (
              <Select value={businessId} onChange={(e) => {
                setBusinessId(e.target.value)
                editProps.onChange(e.target.value)
              }
              }>
                {props.refdata.businesstype.map((item, index) => {
                  return (
                    <option key={index} value={item.key}>{item.value}</option>
                  )
                })}

              </Select>
            )
          },
          {
            title: "Model", field: "productModel",
            editComponent: editProps => (
              <Select value={productModel} onChange={(e) => {
                setProductModel(e.target.value)
                var productDesc = productList.filter((product) => (product.productModel == e.target.value))
                setProductDescription(productDesc[0].productDescription)
                setUnitPrice(productDesc[0].unitPrice)
                console.log(productDesc)
                editProps.onChange(e.target.value)
              }}>
                {productList.filter(product => product.businessId == businessId).map((product, index) => {
                  return (<option key={index} value={product.productModel}>{product.productModel}</option>)
                })}

              </Select>
            )
          },
          {
            title: "Description", field: "productDescription", editComponent: (editProps) => (
              <Input
                defaultValue={productDescription}
                onChange={(e) => editProps.onChange(e.target.value)
                }
              />
            )
          },
          {
            title: "Unit Price", field: "unitPrice", editComponent: (editProps) => (
              <Input
                defaultValue={unitPrice}
                onChange={(e) => editProps.onChange(e.target.value)
                } />)
          },
          { title: "Qty", field: "qty", type: 'numeric', validate: rowData => rowData.qty < 1 ? 'Qty must be Greater than 0' : '', },
          {
            title: "Sub Total", field: "total",
            render: (rowData) => {
              return (
                rowData.unitPrice * rowData.qty
              )
            }
          }
        ]}

        data={data}
        components={{ Pagination: () => <Footer grandTotal={grandTotal}></Footer> }}
        icons={{
          Add: props => <AddIcon />,
          Edit: props => <EditIcon />,
          Delete: props => <DeleteIcon />,
          Clear: props => <DeleteIcon />,
          Check: props => <CheckIcon />,

        }}
        options={{
          actionsColumnIndex: -1,
          showTitle: false,
          search: false,

        }}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {

                var business = props.refdata.businesstype.filter((business) => business.key == businessId)
                newData.businessName = business[0].value
                newData.businessId = business[0].key
                newData.productDescription = productDescription
                newData.unitPrice = parseFloat(unitPrice)
                newData.total = newData.unitPrice * parseFloat(newData.qty);
                setData([...data, newData]);
                debugger;

                setBusinessId('');
                setProductDescription('');
                setUnitPrice(0);
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve();
              }, 1000);
            })
        }}
      />
    </div>

  );
}

export default ProductLead
