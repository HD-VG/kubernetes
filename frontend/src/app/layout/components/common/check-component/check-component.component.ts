import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-permissions-modal',
  template: `
    <div class="p-field">
      <label for="permisos">Permissions</label>
      <div *ngFor="let permission of permissions">
        <p-checkbox
          [(ngModel)]="permission.selected"
          [label]="permission.name">
        </p-checkbox>
      </div>
    </div>
  `,
})
export class PermissionsModalComponent implements OnInit {
  @Input() data: any; // Datos cargados desde el servicio o API
  permissions: { id: number; name: string; selected?: boolean }[] = [
    { id: 1, name: 'read' },
    { id: 2, name: 'create' },
    { id: 3, name: 'update' },
    { id: 4, name: 'delete' },
  ];

  ngOnInit(): void {
    this.initializePermissions();
  }

  // Inicializa los permisos marcados según los datos cargados
  initializePermissions(): void {
    if (this.data?.permisos) {
      this.permissions.forEach((permission) => {
        // Verifica si el permiso está en la lista de permisos del rol
        permission.selected = this.data.permisos.some(
          (perm: any) => perm.id_permission === permission.id
        );
      });
    }
  }
}
