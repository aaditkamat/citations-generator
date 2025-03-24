import {Controller, Post, Route, FormField, UploadedFile} from "tsoa";
import FileService from "./filesService";
import { CreateGraphRequestBody } from "./filesService";
@Route("files")
export class FilesController extends Controller {

  @Post()
  public async uploadFile(
      @FormField() title: string,
      @FormField() description: string,
      @UploadedFile() file: File,
  ): Promise<void> {
    console.log(file);
    await new FileService().createGraph(file);
    return;
  }
}
