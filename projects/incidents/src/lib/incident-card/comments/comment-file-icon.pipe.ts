import { Pipe, PipeTransform } from '@angular/core';
import { IRMUserRole } from '@irm-ui/common';

@Pipe({
  name: 'commentFileIcon',
})
export class CommentFileIconPipe implements PipeTransform {
  transform(roles: IRMUserRole[]): string {
    return roles.includes(IRMUserRole.Store) ? 'store' : roles.includes(IRMUserRole.ServiceCompany) ? 'build' : 'comment';
  }
}
