import { Component, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllUsers, selectLoading } from '../../Store/user.selector';
import { deleteUser, loadUsers } from '../../Store/user.actions';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    RouterModule,
    CommonModule]

  ,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  displayedColumns: string[] = ['name', 'email', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  searchTerm = '';

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  users$: Observable<User[]|[]>;
  loading$: Observable<boolean>;

  userId: number|undefined=undefined;
  constructor(private store: Store) {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectLoading);
    this.users$.subscribe(users => {
      this.dataSource.data = users; // עדכון dataSource עם המשתמשים
    });
   
    
  }
  ngOnInit() {
    
    this.store.dispatch(loadUsers());       
    this.users$ = this.store.select(selectAllUsers);
  
  };
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
    
    // if (this.roleFilter) {
      this.dataSource.filterPredicate = (data: User, filter: string) => {
        
        const searchMatch = !filter || 
        data.firstName.toLowerCase().includes(filter) || 
        data.lastName.toLowerCase().includes(filter) || 
          data.email.toLowerCase().includes(filter);
     
        return searchMatch ;
      // };
    }
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
     this.store.dispatch(deleteUser({UserId:+id}))
    }
  }

  getRoleClass(role: string): string {
    switch (role) {
      case 'admin': return 'role-admin';
      case 'manager': return 'role-manager';
      case 'user': return 'role-user';
      default: return '';
    }
  }

  getStatusClass(active: boolean): string {
    return active ? 'status-active' : 'status-inactive';
  }
}