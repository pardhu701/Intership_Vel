// ✅ 1. Register AG Grid Modules
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

// ✅ 2. Import React and AG Grid
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

// ✅ 3. Import AG Grid styles (required)
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const CompanyLogoRenderer = ({ value }) => (
    <span style={{ display: "flex", height: "100%", width: "100%", alignItems: "center" }}>{value && <img alt={`${value} Flag`} src={`https://www.ag-grid.com/example-assets/space-company-logos/${value.toLowerCase()}.png`} style={{display: "block", width: "25px", height: "auto", maxHeight: "50%", marginRight: "12px", filter: "brightness(1.1)"}} />}<p style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{value}</p></span>
);

function Grid() {
  const [rowData,setRowData] = useState([
    { id: "Loading...", name: "Loading...", age: 0 },
    
  ]);

  const [colDefs] = useState([
    { field: "id",
         cellRenderer: CompanyLogoRenderer

     },
    { field: "name",
        fiiter:true
     },

    { field: "age",
        sort:'desc',
    
     },
    
  ]);

  React.useEffect(() => {
    fetch('http://localhost:5000/users') // Fetch data from server
        .then(result => result.json()) // Convert to JSON
        .then(rowData => setRowData(rowData)); // Update state of `rowData`
}, [])

  return (
    <div
      className="ag-theme-quartz" // ✅ Required theme
       // ✅ Set both height and width
       style={{ height: 400 }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={5}
      />
    </div>
  );
}

export default Grid;
