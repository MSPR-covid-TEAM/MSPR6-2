import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  rowData: any[] = [];
  columnDefs: ColDef[] = [
    { field: 'id_user', headerName: 'ID', editable: false },
    { field: 'nom', headerName: 'Nom', editable: true },
    { field: 'prenom', headerName: 'Prénom', editable: true },
    { field: 'email', headerName: 'Email', editable: true },
    { field: 'password', headerName: 'Mot de passe', editable: true }
  ];
  defaultColDef = { flex: 1, minWidth: 120, resizable: true };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>('/user').subscribe(users => this.rowData = users);
  }

  onCellValueChanged(event: any) {
    const user = event.data;
    this.http.put(`/user/${user.id_user}`, user).subscribe(() => this.loadUsers());
  }

  onDelete() {
    const selected = this.agGrid.api.getSelectedRows();
    if (selected.length && confirm('Supprimer cet utilisateur ?')) {
      this.http.delete(`/user/${selected[0].id_user}`).subscribe(() => this.loadUsers());
    }
  }

  onAdd() {
    const newUser = { nom: '', prenom: '', email: '', password: '' };
    this.http.post('/user', newUser).subscribe(() => this.loadUsers());
  }
}