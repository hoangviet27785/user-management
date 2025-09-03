import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { ROLE_LIST } from '../../constants/app.constants';
import { getRoleName } from '../../utils/form-utils';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  mode: 'create' | 'edit' | 'view' = 'create';
  model: User = { username: '', fullname: '', password: '', role: '', self: false };
  roles: string[] = [];
  title = 'Thêm người dùng';
  submitting = false;
  usernameExists = false;
  id?: number;
  getRoleName = getRoleName;
  errorMessage: string = '';

  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('fullnameInput') fullnameInput!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.roles = ROLE_LIST;
    this.model.role = this.roles[0];
    const currentUrl = this.router.url;
    if (currentUrl.includes('/view')) {
      this.mode = 'view';
      this.title = 'Thông tin người dùng';
    } else if (currentUrl.includes('/edit')) {
      this.mode = 'edit';
      this.title = 'Cập nhật thông tin người dùng';
    } else {
        this.model = {
        username: '',
        fullname: '',
        password: '',
        role: '',
        self: false
      };
      this.mode = 'create';
      this.title = 'Thêm mới người dùng';
    }
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.userService.getById(this.id).subscribe({
        next: (u) => {
          this.model = u;
          this.model.password = '';
        },
        error: (e) => console.error('Load user failed', e)
      });
    }
  }

  checkUsername() {
    if (!this.model.username) return;
    
    this.userService.checkUsername(this.model.username).subscribe({
      next: (exists) => {
        this.usernameExists = exists;
      },
      error: (err) => console.error(err)
    });
  }

  submit(form: NgForm) {
    this.errorMessage = '';
    if (form.invalid) return;
    this.userService.checkUsername(this.model.username).subscribe({
    next: (exists) => {
      if (exists && !this.id) {
        this.usernameExists = true;
        this.errorMessage = 'Tên đăng nhập đã tồn tại.';
        return;
      }

      this.usernameExists = false;
      this.submitting = true;

      const payload = { username: this.model.username, fullname: this.model.fullname, password: this.model.password, role: this.model.role, self: this.model.self };

      const obs = this.id
        ? this.userService.update(this.id, payload)
        : this.userService.createUser(payload);

      obs.subscribe({
        next: () => this.router.navigate(['/users']),
        error: (e) => { this.submitting = false; alert('Lưu user thất bại. Vui lòng thử lại.'); console.error(e); }
      });
    },
      error: (e) => {
        console.error(e);
        this.errorMessage = 'Không kiểm tra được username.';
      }
    });
  }

  ngAfterViewInit() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/edit')) {
      this.fullnameInput.nativeElement.focus();
    } else {
      this.usernameInput.nativeElement.focus();
    }
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}