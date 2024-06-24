import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { CustomRpcException } from './CustomRpcException';

@Catch(CustomRpcException)
export class AllExceptionsFilter
  implements RpcExceptionFilter<CustomRpcException> {
  catch(exception: CustomRpcException): Observable<any> {
    const response = {
      statusCode: exception.getStatusCode(),
      message: exception.getError()['message'],
    };

    return throwError(() => response);
  }
}
