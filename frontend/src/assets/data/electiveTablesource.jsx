export const electiveColumns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "elective",
      headerName: "Elective",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "faculty",
      headerName: "Lecturer",
      width: 200,
    },
  
    {
      field: "type",
      headerName: "Type",
      width: 200,
    },
    {
      field: "credit",
      headerName: "Credits",
      width: 100,
    },

    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        const status=(params.row.remaining_seats<params.row.total_seats?"not filled":"filled")
        return (
          <div className={`cellWithStatus ${status}`}>
            {status}
          </div>
        );
      },
    },
    
  ];
  
  //temporary data
  export const electiveRows = [
    
  ];