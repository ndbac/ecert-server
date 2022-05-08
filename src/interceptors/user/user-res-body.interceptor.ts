// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class UserResBodyInterceptor implements NestInterceptor {
//   intercept(
//     ctx: ExecutionContext,
//     next: CallHandler<{ data: any }>,
//   ): Observable<any> {
//     return next.handle().pipe((data) => {
//       console.log(data);
//       return data;
//     });
//   }
// }
