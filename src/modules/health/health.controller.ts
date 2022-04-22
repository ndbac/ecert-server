import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * health endpoints will be useful when deploying in a container orchestration cluster i.e K8s
 */
@Controller('health')
@ApiTags('health')
export class HealthController {
  /**
   * if possible, should check healthy of external dependent service: Mongo, Redis, RMQ,...
   * which is crucial to application
   */
  @Get('ready')
  @ApiOperation({
    operationId: 'probeBackendReady',
  })
  async checkHealth() {
    return { msg: 'Hello world' };
  }
}
