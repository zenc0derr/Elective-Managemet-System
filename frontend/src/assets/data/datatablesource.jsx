export const studentColumns = [
    { field: "id", headerName: "ID", width: 350 },
    {
      field: "name",
      headerName: "Student",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 350,
    },
  
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={`p-1 rounded ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];
  
  //temporary data
  export const studentRows = [
   
    
  ];



  