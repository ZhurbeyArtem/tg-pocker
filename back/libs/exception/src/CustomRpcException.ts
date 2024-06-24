import { RpcException } from '@nestjs/microservices';

export class CustomRpcException extends RpcException {
  constructor(
    private readonly statusCode: number,
    message: string,
  ) {
    super({ statusCode, message });
  }

  getStatusCode(): number {
    return this.statusCode;
  }
}
