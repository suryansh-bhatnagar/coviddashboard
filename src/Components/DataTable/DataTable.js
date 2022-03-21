import React from "react";
import  './index.css'

const DataTable = (props) => {
//
const searchFun = ()=>{
    let filter = document.getElementById('searchInput').value.toUpperCase();
    let myTable = document.getElementById('myTable');
    let tr = Array.from(myTable.getElementsByTagName('tr'));
    let notfound = true;

    for (let i = 0; i < tr.length; i++) {
      
        let td = tr[i].getElementsByTagName('td')[0];
        if(td){
            let textValue = td.textContent || td.innerHTML;
            if(textValue.toUpperCase().indexOf(filter) > -1){
                tr[i].style.display = '';
                notfound = false
            }else{
                tr[i].style.display = 'none';
            }
        }
    }
    if(notfound){
        document.getElementById('notFound').innerText = 'Oops , No result found  😵';
        notfound = false;
    }else{
        document.getElementById('notFound').innerText = '';
    }
    
    

}
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="main-Heading">
          <h1 className="mb-5">
            {" "}
            <span className="font-weight-bold">COVID-19</span> Country 
            Wise Data{" "}
          </h1>
        </div>
        <input type="text" id="searchInput" placeholder="Search for country..." onKeyUp={searchFun}/>
        <div className="table-responsive">
          <table className="table table-hover" id="myTable">
            <thead className="thead-dark">
              <tr>
                <th>Country</th>
                <th>TotalConfirmed</th>
                <th>TotalRecovered</th>
                <th>TotalDeaths</th>
              </tr>
            </thead>
            <tbody>
              { props.tableData && props.tableData.map((curElem, ind) => {
                return (
                  <tr key={ind}>
                    <td>{curElem.Country}</td>
                    <td>{curElem.TotalConfirmed}</td>
                    <td>{curElem.TotalRecovered}</td>
                    <td>{curElem.TotalDeaths}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p id="notFound" style={{'fontWeight':'bold'}}></p>
        </div>
      </div>
    </>
  );
};

export default DataTable;
