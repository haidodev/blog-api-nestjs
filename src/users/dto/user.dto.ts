import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";

enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}
export class UserDTO {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'gender must be either MALE or FEMALE',
    })
    readonly gender: Gender;
}