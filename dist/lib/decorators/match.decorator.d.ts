import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare function IsMatchPassword(property: string, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
export declare class MatchConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
}
