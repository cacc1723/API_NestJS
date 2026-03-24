import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserDto {
  @ApiProperty({ description: 'User ID' })
  @IsNotEmpty({ message: 'El ID es obligatorio' })
  id: number;

  @ApiProperty({ description: 'Full name of the user' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name: string;

  @ApiPropertyOptional({ description: 'Email of the user' })
  @IsOptional()
  @IsEmail({}, { message: 'Formato de correo no válido' })
  @Transform(({ value }) =>
    value === '' ? undefined : (value as string | undefined),
  )
  email: string;

  @ApiPropertyOptional({ description: 'Password of the user' })
  @IsOptional()
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
// DTO para crear: sin ID
export class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}

// DTO para actualizar: email y name opcionales, ID requerido
export class UpdateUserDto extends PartialType(
  OmitType(UserDto, ['id'] as const),
) {
  @ApiProperty({ description: 'User ID to update' })
  @IsNotEmpty({ message: 'El ID es obligatorio para actualizar' })
  id: number;
}
