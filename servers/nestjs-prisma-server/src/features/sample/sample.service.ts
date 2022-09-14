import { Injectable } from '@nestjs/common'

@Injectable()
export class SampleService {
  uptime(): number {
    return process.uptime()
  }
}
