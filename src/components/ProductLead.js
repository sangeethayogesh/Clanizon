import React from 'react';
import DataGrid, { Column, Editing, Summary, TotalItem,Lookup } from 'devextreme-react/data-grid';
import service from './data.js';
import {  business,orders ,model} from './data.js';


class ProductLead extends React.Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <React.Fragment>
        <DataGrid
          id="gridContainer"
          dataSource={orders}
          keyExpr="ID"
          repaintChangesOnly={true}
          showBorders={true}>
          <Editing
            mode="batch"
            allowAdding={true}
            allowUpdating={true}
            allowDeleting={true}>
          </Editing>
          <Column dataField="serviceId" caption="Business" width={125}>
            <Lookup dataSource={business} valueExpr="ID" displayExpr="Name" />
          </Column>
          <Column dataField="ModelId" caption="Model" width={125}>
            <Lookup dataSource={model} valueExpr="ID" displayExpr="Name" />
          </Column>
          <Column dataField="Description" />
         
          <Column dataField="unitPrice" Caption="Unit price" alignment="right" format="currency" editorOptions={{ format: 'currency' }} />
          <Column dataField="qty" caption="Qty" />
          <Column dataField="TotalPrice" caption="Total Price"  alignment="right" format="currency" editorOptions={{ format: 'currency' }} />
          <Summary recalculateWhileEditing={true}>
            <TotalItem
              column="service"
              summaryType="count" />
               <TotalItem
              column="qty"
              summaryType="sum" 
             />
            <TotalItem
              column="TotalPrice"
              summaryType="sum"
              valueFormat="currency" />
          </Summary>
        </DataGrid>
      </React.Fragment>
    );
  }
}

export default ProductLead;