
import { Component,AfterViewInit } from '@angular/core';
import { DataService } from './data.service';


//import {  AfterViewInit } from '@angular/core';



// @Component({
//   selector: 'my-app',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
interface Location {
  Lat: number;
  Lng: number;
  panel_name: string;
  mac_id: string;
  r_volt_status: number;
  r_load_status: number;
  r_mcb_status: number;
  r_pf_status: number;
}

interface Voltage {
  r_volt_status: number;
  r_load_status: number;
  r_mcb_status: number;
  r_pf_status: number;
}



@Component({
  selector: 'my-app',
  template: `
    <div class="logo">
        <img src="https://utopiatech.in/wp-content/uploads/2022/09/Logo_Colour-1-e1668588273582-300x111.png" alt="Logo">
      </div>
    <div class="url-input">
      <div class="data-section">
        <div class="url-input">
      <input type="text" [(ngModel)]="apiUrl" placeholder="Enter API URL">
      <button (click)="getData(apiUrl)">Fetch Data</button>
    </div>
    <div class="new">
    <table>
      <thead>
        <tr>
          <th>Panel name</th>
            <th>Mac id</th>
          <th>Latitude</th>
          <th>Longitude</th>
           <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let location of locations">
          
          <td><a (click)="showDetails(location)" class="panel-link">
            {{ location.panel_name }}
          </a></td>
          <td>{{ location.mac_id }}</td>
          <td>{{ location.Lat }}</td>
          <td>{{ location.Lng }}</td>
          
           <td><a [href]="getMapUrl(location.Lat, location.Lng)" target="_blank"><i class="fas fa-map-marker-alt"></i></a></td>
<!-- <td><a href="#" (click)="openMapSidebar(location.Lat, location.Lng)">
  <i class="fas fa-map-marker-alt"></i>
</a></td> -->
        </tr>
      </tbody>
    </table>
    </div>
    
   
    <!-- <button class="collapse-button" (click)="toggleSidebar()">
              {{ sidebarOpen ? 'Collapse' : 'Expand' }}
            </button> -->
        
          <div class="details-container" [ngClass]="{'details-open': showTable}">
            <div class="details-header">
              <h2>Details</h2>
              <button class="close-button" (click)="closeDetails()">
                <i class="fas fa-times"></i>
              </button>
            </div>
    <div class="details-table" *ngIf="selectedLocation && showTable">
     
      <table>
        <thead>
           <tr>
            <th>Parameters</th>
             <th>R phase</th>
             </tr>
          <tr>
            <td>Voltage Status</td>
             <td>{{ selectedLocation.r_volt_status }}</td>
             </tr>
             <tr>
            <td>MCB Status</td>
             <td>{{ selectedLocation.r_mcb_status }}</td>
            </tr>
            <tr>
             <td>Load Status</td>
               <td>{{ selectedLocation.r_load_status }}</td>
             </tr>
             <tr>
            <td>PF Status</td>
             <td>{{ selectedLocation.r_pf_status }}</td>
             </tr>
        
        </thead>
       
      </table>
    </div>
<div class="details-container" [ngClass]="{'details-open': mapSidebarOpen}">
            <div class="details-header">
              <h2>Details</h2>
              <button class="close-button" (click)="closeDetails()">
                <i class="fas fa-times"></i>
              </button>
            </div>
    <div class="details-table" *ngIf="mapSidebarOpen">
     
      <table>
        <thead>
           <tr>
            <th>Parameters</th>
             <th>R phase</th>
             </tr>
          <tr>
            <td>Voltage Status</td>
             <td>{{ selectedLocation.r_volt_status }}</td>
             </tr>
             <tr>
            <td>MCB Status</td>
             <td>{{ selectedLocation.r_mcb_status }}</td>
            </tr>
            <tr>
             <td>Load Status</td>
               <td>{{ selectedLocation.r_load_status }}</td>
             </tr>
             <tr>
            <td>PF Status</td>
             <td>{{ selectedLocation.r_pf_status }}</td>
             </tr>
        
        </thead>
       
      </table>
    </div>
  `,
 styles: [`
    /* Main container */
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: #f5f5f5;
      font-family: Arial, sans-serif;
    }

    /* Data section */
    .data-section {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .data-section h1 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    /* URL input */
    .url-input {
      display: flex;
      margin-bottom: 10px;
    }

    .url-input input[type="text"] {
      flex: 1;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #cccccc;
      margin-right: 10px;
    }

    .url-input button {
      padding: 8px 20px;
      background-color: #3498db;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .url-input button:hover {
      background-color: #1f77d0;
    }

    /* Content */
    .content {
      display: flex;
      position: relative;
    }

    /* Sidebar */
    .sidebar {
      width: 200px;
      background-color: #ffffff;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 10px;
      margin-right: 20px;
      transition: width 0.3s;
      overflow: hidden;
      display: none;
    }

    .sidebar ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .sidebar li {
      margin-bottom: 10px;
    }

    .panel-link {
      cursor: pointer;
      font-weight: bold;
      text-decoration: none;
      color: #333333;
      transition: color 0.3s;
    }

    .panel-link:hover {
      color: #3498db;
    }

    .sidebar-show {
      width: 200px;
      padding: 10px;
      display: block;
    }

    .collapse-button {
      padding: 5px 10px;
      background-color: transparent;
      border: none;
      color: #3498db;
      cursor: pointer;
    }

    .collapse-button:hover {
      color: #1f77d0;
    }

    /* Details container */
    .details-container {
      position: absolute;
      top: 0;
      left: -300px;
      width: 300px;
      height: 100%;
      background-color: #ffffff;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: left 0.3s;
    }

    .details-open {
      left: 0;
    }

    .details-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      background-color: #3498db;
      color: #ffffff;
    }

    .details-header h2 {
      font-size: 20px;
      margin: 0;
    }

    .close-button {
      background-color: transparent;
      border: none;
      color: #ffffff;
      cursor: pointer;
    }

    .details-table {
      padding: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 10px;
      border-bottom: 1px solid #cccccc;
    }

    th {
      background-color: #3498db;
      color: #ffffff;
      text-align: left;
    }

    td {
      color: #333333;
    }
    .map-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px; /* Adjust the width as needed */
  height: 100vh; /* Adjust the height as needed */
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  padding: 20px;
  overflow-y: auto; /* Enable vertical scroll if needed */
  transition: transform 0.3s ease-in-out;
  transform: translateX(-100%); /* Hide the sidebar by default */
}

.map-sidebar.open {
  transform: translateX(0); /* Show the sidebar when open */
}

.map-sidebar h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.map-container {
  width: 100%;
  height: calc(100% - 40px); /* Adjust the height based on header size */
}

.map-container iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

  `]
})


export class AppComponent {
  apiUrl: string = '';
  locations: Location[];
  voltages: Voltage[];
  showTable: boolean = false;
  sidebarOpen = false;
  selectedLocation: Location | null = null;
  mapSidebarOpen: boolean = false;
  mapUrl: string = '';
  constructor(private dataService: DataService) {}

 
    
    getData(url: string) {
    //const url = 'https://uat.utopiatech.in:4520/panel/gettestlist?org_id=3'; // Replace with your desired URL
    this.dataService.getData(url).subscribe(response => {
      const result = response.result as Location[];
      const result1 = response.result as Voltage[];
      this.locations = result.map(item => ({panel_name:item.panel_name,mac_id:item.mac_id, Lat: item.Lat, Lng: item.Lng, r_volt_status:item.r_volt_status,r_load_status:item.r_load_status, r_mcb_status:item.r_mcb_status, r_pf_status: item.r_pf_status }));
       this.voltages = result1.map(item => ({r_volt_status:item.r_volt_status, r_load_status:item. r_load_status, r_mcb_status: item.r_mcb_status, r_pf_status: item.r_pf_status }));
    });
  }
  
   getMapUrl(lat: number, lng: number): string {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
     
  }
  showDetails(location: Location) {
    this.showTable = true;
    this.selectedLocation = location;
  }
  closeDetails() {
    this.selectedLocation = null;
    this.showTable= false;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
 openMapSidebar(lat: number, lng: number) {
  this.mapSidebarOpen = true;
  this.mapUrl = this.getMapUrl(lat, lng);

  // Create a new side bar element
  
}

closeMapSidebar() {
  this.mapSidebarOpen = false;

}
}









