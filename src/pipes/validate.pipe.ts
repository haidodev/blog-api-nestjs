import { ArgumentMetadata, BadRequestException, Injectable, UnprocessableEntityException, ValidationPipe } from "@nestjs/common";

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
    public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        try {
            return await super.transform(value, metadata);
        } catch (error){
            if (error instanceof BadRequestException) {
                throw new UnprocessableEntityException(this.handleError(error.getResponse()));
                throw new UnprocessableEntityException(error.getResponse());
            }
        }
    }
    private handleError(error) {
        if (typeof error == 'object') return error.message;
        return error;
    }
}