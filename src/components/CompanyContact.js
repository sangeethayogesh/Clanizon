import React from 'react';
import DataGrid, { Column, Editing, Summary, TotalItem,Lookup } from 'devextreme-react/data-grid';
import service from './data.js';
import {  users} from './data.js';


class CompanyContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = { events: [] };
    this.logEvent = this.logEvent.bind(this);
    this.onEditingStart = this.logEvent.bind(this, 'EditingStart');
    this.onInitNewRow = this.logEvent.bind(this, 'InitNewRow');
    this.onRowInserting = this.logEvent.bind(this, 'RowInserting');
    this.onRowInserted = this.logEvent.bind(this, 'RowInserted');
    this.onRowUpdating = this.logEvent.bind(this, 'RowUpdating');
    this.onRowUpdated = this.logEvent.bind(this, 'RowUpdated');
    this.onRowRemoving = this.logEvent.bind(this, 'RowRemoving');
    this.onRowRemoved = this.logEvent.bind(this, 'RowRemoved');

    
    
  }
  logEvent(eventName) {
     if(eventName!=null && (eventName=='RowInserted'||eventName=='RowRemoved' ||eventName=='RowUpdated')){
      this.props.onDataChange(this.props.contact);
     }  
    }      
  render() {
    return (
      <React.Fragment>
        <DataGrid
          id="gridContainer"
          dataSource={this.props.contact}
          keyExpr="ID"
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
            mode="batch"
            allowAdding={true}
            allowUpdating={true}
            allowDeleting={true}
            useIcons={true}>
          </Editing>
          <Column dataField="userFname" caption="Name" width={125}/>         
          <Column dataField="userMobile" caption="Mobile" />
          <Column dataField="userEmailid" caption="E-mail ID" />
          <Column dataField="branch" caption="Branch" />
          <Column dataField="department" caption="Department" />
            
        
         
          
        </DataGrid>
      </React.Fragment>
    );
  }
}

export default CompanyContact;