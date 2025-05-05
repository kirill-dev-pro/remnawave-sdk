import { BaseController } from "./base";
import {
  BulkResponseDto,
  UpdateUserFields,
} from "../models/users-bulk-actions";

export class UsersBulkActionsController extends BaseController {
  async bulkUpdateUsers(
    uuids: string[],
    fields: UpdateUserFields
  ): Promise<BulkResponseDto> {
    return this.post<BulkResponseDto>("/users/bulk-update", {
      uuids,
      fields,
    });
  }
}
