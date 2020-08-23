import React from 'react';
import DataGrid, { Column, Editing, Summary, TotalItem,Lookup } from 'devextreme-react/data-grid';
import service from './data.js';
import {  orders} from './data.js';


class ProductLead extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { events: [],productList:this.props.productList };
    
    this.logEvent = this.logEvent.bind(this);
    this.onEditingStart = this.logEvent.bind(this, 'EditingStart');
    this.onInitNewRow = this.logEvent.bind(this, 'InitNewRow');
    this.onRowInserting = this.logEvent.bind(this, 'RowInserting');
    this.onRowInserted = this.logEvent.bind(this, 'RowInserted');
    this.onRowUpdating = this.logEvent.bind(this, 'RowUpdating');
    this.onRowUpdated = this.logEvent.bind(this, 'RowUpdated');
    this.onRowRemoving = this.logEvent.bind(this, 'RowRemoving');
    this.onRowRemoved = this.logEvent.bind(this, 'RowRemoved');

    
    window.productList =this.props.productList;
  }
  logEvent(eventName) {
    console.log(orders);
    orders.push()
     if(eventName!=null && (eventName=='RowInserted'||eventName=='RowRemoved' ||eventName=='RowUpdated')){
      this.props.onDataChange(orders);
     }  
    }   
    calculateSalesAmount(rowData) {
      if(rowData.unitPrice!=null&&rowData.qty!=null)
      return rowData.unitPrice * rowData.qty;
      else
      return 0;
  }
    setModelValue(rowData, value) {           
      var productList= JSON.parse(localStorage.productList);
       if(productList!=null && productList.length>0){
         productList.map((product) => {
                 if(product.productModel==value){
                  rowData.productDescription=product.productDescription;
                  rowData.unitprice=product.unitprice;
                  rowData.productModel=product.productModel;
                  rowData.productId=product.productId;
                  rowData.productName=product.productName;
                 }
       })
      }
      this.defaultSetCellValue(rowData,value)
      
    }
  
  render() {
    return (
      <React.Fragment>
        <DataGrid
          id="gridContainer"
          dataSource={orders}
          keyExpr="productid"
          repaintChangesOnly={true}
          showBorders={true}
          onEditingStart={this.onEditingStart}
          onInitNewRow={this.onInitNewRow}
          onRowInserting={this.onRowInserting}
          onRowInserted={this.onRowInserted}
          onRowUpdating={this.onRowUpdating}
          onRowUpdated={this.onRowUpdated}
          onRowRemoving={this.onRowRemoving}
          onRowRemoved={this.onRowRemoved}>
          <Editing
            mode="row"
            allowAdding={true}
            allowUpdating={true}
            allowDeleting={true}>
          </Editing>
          <Column dataField="key" caption="Business" width={125}  >
            <Lookup dataSource={this.props.refdata.businesstype} valueExpr="key" displayExpr="value" />
          </Column>
          <Column dataField="productModel" caption="Model" setCellValue={this.setModelValue} width={125} >
            <Lookup dataSource={this.props.productList} valueExpr="productModel"  displayExpr="productModel" />
          </Column>
          <Column dataField="productDescription" caption="Description"/>
         
          <Column dataField="unitprice" Caption="Unit price" alignment="right" format="currency" editorOptions={{ format: 'currency' }} />
          <Column dataField="qty" caption="Qty"  />
          <Column dataField="leadItemPrice" 
          calculateCellValue={this.calculateSalesAmount} caption="Total Price"  alignment="right" format="currency" editorOptions={{ format: 'currency' }} />
          <Summary recalculateWhileEditing={true}>
            <TotalItem
              column="businessid"
              summaryType="count" />
               <TotalItem
              column="qty"
              summaryType="sum" 
             />
            <TotalItem
              column="leadItemPrice"
              summaryType="sum"
              valueFormat="currency" />
          </Summary>
            
        
         
          
        </DataGrid>
      </React.Fragment>
    );
  }
}

export default ProductLead;