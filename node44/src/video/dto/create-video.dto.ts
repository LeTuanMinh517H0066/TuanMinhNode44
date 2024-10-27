import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, isEnum, IsNotEmpty } from "class-validator";
import { VideoType } from "../enum/video_type.enum.js";

export class CreateVideoDto {
    @IsNotEmpty({message: 'Video name không được để trống'})
    @ApiProperty() // show property ra giao diện swagger
    video_name: string;

    @IsNotEmpty({message: 'Thumbnail không được để trống'})
    @ApiProperty() // show property ra giao diện swagger
    thumbnail: string;

    @IsNotEmpty({message: 'Mô tả không được để trống'})
    @ApiProperty() // show property ra giao diện swagger
    description: string;

    @ApiProperty()
    views: number;

    @IsNotEmpty({message: 'Source video không được để trống'})
    @ApiProperty() // show property ra giao diện swagger
    source: string;

    user_id: number;

    @ApiProperty({enum: VideoType})
    @IsEnum(VideoType)
    type_id: number;
}
