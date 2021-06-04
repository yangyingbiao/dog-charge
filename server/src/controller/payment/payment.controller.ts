import { Body, Controller, Post } from '@nestjs/common';

@Controller('payment')
export class PaymentController {
    @Post('charge')
    charge(@Body() body) {
        if(body['event_type'] == 'TRANSACTION.SUCCESS') {
            
        }else {
            return {   
                "code": "SUCCESS",
                "message": "",
            }
        }
    }

    private notify() {

    }
}
