let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
let drivers = JSON.parse(localStorage.getItem("drivers")) || [];
let trips = JSON.parse(localStorage.getItem("trips")) || [];
function login(event){

    event.preventDefault();

    let username = document.getElementById("username").value;

    let password = document.getElementById("password").value;

    if(username=="admin" && password=="admin123")
    {
        alert("Login Successful!");

        window.location.href="dashboard.html";
    }
    else
    {
        alert("Invalid Username or Password");
    }

}

function addVehicle(){

let number=document.getElementById("vnumber").value;
let name=document.getElementById("vname").value;
let type=document.getElementById("vtype").value;
let capacity=document.getElementById("vcapacity").value;
let status=document.getElementById("vstatus").value;

if(number=="" || name=="" || type=="" || capacity=="")
{
    alert("Please fill all fields");
    return;
}

let table=document.getElementById("vehicleTable");

let row=table.insertRow();

row.insertCell(0).innerHTML=number;
row.insertCell(1).innerHTML=name;
row.insertCell(2).innerHTML=type;
row.insertCell(3).innerHTML=capacity;
row.insertCell(4).innerHTML=status;

let actionCell=row.insertCell(5);

actionCell.innerHTML =
'<button onclick="deleteVehicle(this)" class="delete-btn">Delete</button>';


let vehicle={
    number:number,
    name:name,
    type:type,
    capacity:capacity,
    status:status
};

vehicles.push(vehicle);

localStorage.setItem("vehicles", JSON.stringify(vehicles));


document.getElementById("vnumber").value="";
document.getElementById("vname").value="";
document.getElementById("vtype").value="";
document.getElementById("vcapacity").value="";

alert("Vehicle Added Successfully!");

}

function deleteVehicle(button){

    let row = button.parentNode.parentNode;

    let vehicleNumber = row.cells[0].innerHTML;

    vehicles = vehicles.filter(function(vehicle){
        return vehicle.number !== vehicleNumber;
    });

    localStorage.setItem("vehicles", JSON.stringify(vehicles));

    row.remove();

    alert("Vehicle Deleted Successfully!");

}

function addDriver(){

let name=document.getElementById("dname").value;
let phone=document.getElementById("dphone").value;
let license=document.getElementById("dlicense").value;
let vehicle=document.getElementById("dvehicle").value;

if(name=="" || phone=="" || license=="" || vehicle==""){
    alert("Please fill all fields");
    return;
}

let driverData = {
    name: name,
    phone: phone,
    license: license,
    vehicle: vehicle
};

drivers.push(driverData);

localStorage.setItem("drivers", JSON.stringify(drivers));

let table=document.getElementById("driverTable");

let row=table.insertRow();

row.insertCell(0).innerHTML=name;
row.insertCell(1).innerHTML=phone;
row.insertCell(2).innerHTML=license;
row.insertCell(3).innerHTML=vehicle;

let action=row.insertCell(4);

action.innerHTML='<button class="delete-btn" onclick="deleteDriver(this)">Delete</button>';

document.getElementById("dname").value="";
document.getElementById("dphone").value="";
document.getElementById("dlicense").value="";
document.getElementById("dvehicle").value="";

alert("Driver Added Successfully!");

}

function deleteDriver(button){

button.parentNode.parentNode.remove();

alert("Driver Deleted Successfully!");

}

function loadDrivers(){

    let table = document.getElementById("driverTable");

    if(!table) return;

    for(let i=0; i<drivers.length; i++){

        let row = table.insertRow();

        row.insertCell(0).innerHTML = drivers[i].name;
        row.insertCell(1).innerHTML = drivers[i].phone;
        row.insertCell(2).innerHTML = drivers[i].license;
        row.insertCell(3).innerHTML = drivers[i].vehicle;

        let action = row.insertCell(4);

        action.innerHTML =
        '<button class="delete-btn" onclick="deleteDriver(this)">Delete</button>';
    }
}

function addTrip(){

let tripid=document.getElementById("tripid").value;
let vehicle=document.getElementById("tripvehicle").value;
let driver=document.getElementById("tripdriver").value;
let source=document.getElementById("source").value;
let destination=document.getElementById("destination").value;

if(tripid=="" || vehicle=="" || driver=="" || source=="" || destination=="")
{
    alert("Please fill all fields");
    return;
}

let tripData = {

tripid: tripid,
vehicle: vehicle,
driver: driver,
source: source,
destination: destination

};

trips.push(tripData);

localStorage.setItem("trips", JSON.stringify(trips));

let table=document.getElementById("tripTable");

let row=table.insertRow();

row.insertCell(0).innerHTML=tripid;
row.insertCell(1).innerHTML=vehicle;
row.insertCell(2).innerHTML=driver;
row.insertCell(3).innerHTML=source;
row.insertCell(4).innerHTML=destination;

let action=row.insertCell(5);

action.innerHTML=
'<button class="delete-btn" onclick="deleteTrip(this)">Delete</button>';

document.getElementById("tripid").value="";
document.getElementById("tripvehicle").value="";
document.getElementById("tripdriver").value="";
document.getElementById("source").value="";
document.getElementById("destination").value="";

alert("Trip Created Successfully!");

}
function deleteTrip(button){

    let row = button.parentNode.parentNode;

    let tripId = row.cells[0].innerHTML;

    trips = trips.filter(function(trip){

        return trip.tripid !== tripId;

    });

    localStorage.setItem("trips", JSON.stringify(trips));

    row.remove();

    alert("Trip Deleted Successfully!");

}

function loadTrips(){

let table=document.getElementById("tripTable");

if(!table) return;

for(let i=0;i<trips.length;i++){

let row=table.insertRow();

row.insertCell(0).innerHTML=trips[i].tripid;
row.insertCell(1).innerHTML=trips[i].vehicle;
row.insertCell(2).innerHTML=trips[i].driver;
row.insertCell(3).innerHTML=trips[i].source;
row.insertCell(4).innerHTML=trips[i].destination;

let action=row.insertCell(5);

action.innerHTML=
'<button class="delete-btn" onclick="deleteTrip(this)">Delete</button>';

}

}

function loadVehicles(){

let table=document.getElementById("vehicleTable");

if(!table) return;

for(let i=0;i<vehicles.length;i++){

let row=table.insertRow();

row.insertCell(0).innerHTML=vehicles[i].number;
row.insertCell(1).innerHTML=vehicles[i].name;
row.insertCell(2).innerHTML=vehicles[i].type;
row.insertCell(3).innerHTML=vehicles[i].capacity;
row.insertCell(4).innerHTML=vehicles[i].status;

let action=row.insertCell(5);

action.innerHTML=
'<button class="delete-btn" onclick="deleteVehicle(this)">Delete</button>';

}
}

window.onload=function(){

loadVehicles();

loadDrivers();

loadTrips();

updateDashboard();

}

function updateDashboard(){

    let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    let drivers = JSON.parse(localStorage.getItem("drivers")) || [];
    let trips = JSON.parse(localStorage.getItem("trips")) || [];

    let vehicleElement = document.getElementById("vehicleCount");
    let driverElement = document.getElementById("driverCount");
    let tripElement = document.getElementById("tripCount");
    let availableElement = document.getElementById("availableVehicleCount");

    if(vehicleElement)
        vehicleElement.innerHTML = vehicles.length;

    if(driverElement)
        driverElement.innerHTML = drivers.length;

    if(tripElement)
        tripElement.innerHTML = trips.length;

    if(availableElement){

        let available = 0;

        for(let i=0;i<vehicles.length;i++){

            if(vehicles[i].status=="Available")
                available++;

        }

        availableElement.innerHTML = available;

    }

}