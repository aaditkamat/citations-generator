/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import { fetchMiddlewares, HapiTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FilesController } from './files/filesController';
import { boomify, isBoom, type Payload } from '@hapi/boom';
import type { Request, ResponseToolkit, RouteOptionsPreAllOptions } from '@hapi/hapi';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
};
const templateService = new HapiTemplateService(
  models,
  {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true},
  { boomify, isBoom },
);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(server: any) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        const argsFilesController_uploadFile: Record<string, TsoaRoute.ParameterSchema> = {
            title: {"in":"formData","name":"title","required":true,"dataType":"string"},
            description: {"in":"formData","name":"description","required":true,"dataType":"string"},
            file: {"in":"formData","name":"file","required":true,"dataType":"file"},
        };
        server.route({
            method: 'post',
            path: '/files',
            options: {
                pre: [
                    {
                      method: fileUploadMiddleware('file', false)
                    },
                    ...(fetchMiddlewares<RouteOptionsPreAllOptions>(FilesController)),
                    ...(fetchMiddlewares<RouteOptionsPreAllOptions>(FilesController.prototype.uploadFile)),
                ],
                payload: {
                  output: 'stream',
                  parse: true,
                  multipart: true,
                  allow: 'multipart/form-data',
                  maxBytes: 20 * 1024 * 1024
                },
                handler: function FilesController_uploadFile(request: Request, h: ResponseToolkit) {

                    let validatedArgs: any[] = [];
                    try {
                        validatedArgs = templateService.getValidatedArgs({ args: argsFilesController_uploadFile, request, h });
                    } catch (err) {
                        const error = err as any;
                        if (isBoom(error)) {
                            throw error;
                        }

                        const boomErr = boomify(error instanceof Error ? error : new Error(error.message));
                        boomErr.output.statusCode = error.status || 500;
                        boomErr.output.payload = {
                            name: error.name,
                            fields: error.fields,
                            message: error.message,
                        } as unknown as Payload;
                        throw boomErr;
                    }

                    const controller = new FilesController();

                    return templateService.apiHandler({
                      methodName: 'uploadFile',
                      controller,
                      h,
                      validatedArgs,
                      successStatus: undefined,
                    });
                }
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    function fileUploadMiddleware(fieldname: string, multiple: boolean = false) {
      return (request: Request, h: any) => {
        if (!request.payload[fieldname]) {
          return h.response(`${fieldname} is a required file(s).`).code(400);
        }

        const calculateFileInfo = (reqFile: any) => new Promise((resolve, reject) => {
          const originalname = reqFile.hapi.filename;
          const headers = reqFile.hapi.headers;
          const contentTransferEncoding = headers['content-transfer-encoding'];
          const encoding = contentTransferEncoding &&
            contentTransferEncoding[0] &&
            contentTransferEncoding[0].toLowerCase() || '7bit';
          const mimetype = headers['content-type'] || 'text/plain';
          const buffer = reqFile._data
          return resolve({
            fieldname,
            originalname,
            buffer,
            encoding,
            mimetype,
            filename: originalname,
            size: buffer.toString().length,
          })
        });

        if (!multiple) {
          return calculateFileInfo(request.payload[fieldname])
            .then(fileMetadata => {
              request.payload[fieldname] = fileMetadata;
              return h.continue;
            })
            .catch(err => h.response(err.toString()).code(500));
        } else {
          const promises = request.payload[fieldname].map((reqFile: any) => calculateFileInfo(reqFile));
          return Promise.all(promises)
            .then(filesMetadata => {
              request.payload[fieldname] = filesMetadata;
              return h.continue;
            })
            .catch(err => h.response(err.toString()).code(500));
        }
      };
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
