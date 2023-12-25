function storeendpoint() {
    let endPoint = document.getElementById('endpoint').value;
      
     localStorage.setItem('endPoint', endPoint)
     showEndPoint()
  }
  
  let endPointvar = localStorage.getItem('endPoint');
  // console.log(endPointvar)
 
  function showEndPoint(){
    let parent = document.getElementById('div')
    let showdata = document.createElement('h4')
    showdata.textContent = endPointvar;
    showdata.id = 'endpointDisplay';
    parent.appendChild(showdata)
    // console.log(showdata) 
  }

  function deleteEndPoint(){
    endPointvar = localStorage.clear()

    let endpointElement = document.getElementById('endpointDisplay');
    if (endpointElement) {
        endpointElement.remove();
    }
    
  }
 
    
function AddItem(event) {
    event.preventDefault();
    let category_table = document.getElementById("category").value;
    let description = document.getElementById("desc").value;
    let Quantity = document.getElementById("number").value;
    let price = document.getElementById("price").value;

    let Data = {
      category_table,
      description,
      Quantity,
      price,
    };

    AddDataItem(Data);

async function AddDataItem(Data) {
       
     try {
          let res = await axios.post(`https://crudcrud.com/api/${endPointvar}/data`,Data)
            ShowAddedData(res.data) //when you get the http request data then promise(await) is res
          } catch (error) {
            console.log(error)          
          } 
      }
  }

  window.addEventListener("DOMContentLoaded", async() => {
   
   try{
    let res = await axios.get(`https://crudcrud.com/api/${endPointvar}/data`)
    showEndPoint()
    for (let i = 0; i < res.data.length; i++) {
          ShowAddedData(res.data[i]);
        }
      }
      catch(err) { 
        alert('enter the endpoint')
        console.log('network error')
      }
  });

  function ShowAddedData(obj) {

      let newRow = document.createElement("tr");

      let categoryCell = document.createElement("td");
      categoryCell.textContent = obj.category_table;
      newRow.appendChild(categoryCell);

      let descriptionCell = document.createElement("td");           
      descriptionCell.textContent = obj.description;
      newRow.appendChild(descriptionCell);

      let quantityCell = document.createElement("td");
      quantityCell.textContent = obj.Quantity;
      newRow.appendChild(quantityCell);

      let priceCell = document.createElement("td");
      priceCell.textContent = obj.price;
      newRow.appendChild(priceCell);

      let table = document.getElementById("inventoryTable");
      table.appendChild(newRow);

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = " btn btn-danger btn-sm  delete";
      deleteButton.onclick = function () {
        deleteData(obj._id);
        newRow.remove();
      };
      newRow.appendChild(deleteButton);
     
      let buy1Button = document.createElement("button");
      buy1Button.textContent = "Buy 1";
      buy1Button.className = "btn btn-primary btn-sm  Buy 1";

      buy1Button.onclick = function () {
        // when click Decrease quantity by 1
        obj.Quantity = parseInt(obj.Quantity) - 1;
        console.log("decrease by 1", obj.Quantity);
        PUtData(obj._id, obj.category_table, obj.description, obj.Quantity, obj.price);
        quantityCell.textContent = obj.Quantity;
      };
      newRow.appendChild(buy1Button);
      
      
      let buy2Button = document.createElement("button");
      buy2Button.textContent = "Buy 2";
      buy2Button.className = "btn btn-success btn-sm  Buy 2";

      buy2Button.onclick = function () {
        // when click Increase quantity by 1
        obj.Quantity = parseInt(obj.Quantity) - 2 ;
        console.log("decrease by 2", obj.Quantity);
        PUtData(obj._id, obj.category_table, obj.description, obj.Quantity, obj.price);
        quantityCell.textContent = obj.Quantity;
      };
      newRow.appendChild(buy2Button);

      let buy3Button = document.createElement("button");
      buy3Button.textContent = "Buy 3";
      buy3Button.className = "btn btn-success btn-sm  Buy 3";

      buy3Button.onclick = function () {
        // when click decrease quantity by 3
        obj.Quantity = parseInt(obj.Quantity) - 3;
        console.log("decrease by 3", obj.Quantity);
        PUtData(obj._id, obj.category_table, obj.description, obj.Quantity, obj.price);
        quantityCell.textContent = obj.Quantity;
      };
      newRow.appendChild(buy3Button);
    }

    async function deleteData(UserId) {
      try {
          let res = await axios.delete(`https://crudcrud.com/api/${endPointvar}/data/${UserId}`);
          console.log('when promise is res deletedata', UserId, res);
      } catch (err) {
          console.log(err);
      }
  }
  
  async function PUtData(UserId, category_table, description, updatedQuantity, updatedPrice) {
      try {
          let res = await axios.put(`https://crudcrud.com/api/${endPointvar}/data/${UserId}`, {
              category_table: category_table,
              description: description,
              Quantity: updatedQuantity,
              price: updatedPrice,
          });
          console.log('when put request success, promise is res', res);
      } catch (err) {
          console.log(err);
      }
  }
  
  