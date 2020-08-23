import React from 'react';
import DataGrid, { Column, Editing, Summary, TotalItem,Lookup } from 'devextreme-react/data-grid';
import service from './data.js';
import {  users} from './data.js';


class CompanyContact extends React.Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <React.Fragment>
        <DataGrid
          id="gridContainer"
          dataSource={users}
          keyExpr="ID"
          repaintChangesOnly={true}
          showBorders={true}>
          <Editing
            mode="batch"
            allowAdding={true}
            allowUpdating={true}
            allowDeleting={true}>
          </Editing>
          <Column dataField="name" caption="Name" width={125}/>         
          <Column dataField="mobile" caption="Mobile" />
          <Column dataField="emailId" caption="E-mail ID" />
          <Column dataField="branch" caption="Branch" />
          <Column dataField="department" caption="Department" />
            
        
         
          
        </DataGrid>
      </React.Fragment>
    );
  }
}

export default CompanyContact;