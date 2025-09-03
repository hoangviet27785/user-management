import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { getRoleName } from 'src/app/utils/form-utils';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';
  isUser: boolean = false;
  getRoleName = getRoleName;

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = '';
    this.isUser = this.authService.isUser();
    this.userService.getUsers().subscribe(response => {
      if (response) {
        this.users = response;
        this.loading = false;
      } else {
        this.error = 'Tải danh sách người dùng bị lỗi.';
        this.loading = false;
      }
    });
  }

  isSelf(user: User): boolean {
    return user.self;
  }

  deleteUser(user: User): void {
    if (!user.id) return;
    Swal.fire({
      title: `Xóa user "${user.username}" này?`,
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#198754',
      cancelButtonColor: '#dc3545',
      customClass: {
          title: 'my-swal-title'
        }
    }).then((result) => {
      if (result.isConfirmed && user.id !== undefined) {
        this.userService.deleteUser(user.id).subscribe({
          next: () => this.loadUsers(),
          error: err => { this.error = 'Lỗi khi xóa user.'; console.error(err); }
        });
      }
    });
  }
}
