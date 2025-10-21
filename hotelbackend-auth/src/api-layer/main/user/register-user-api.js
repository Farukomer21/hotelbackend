const UserManager = require("./UserManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { UserRegisteredPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptRegisterUser, getUserByQuery } = require("dbLayer");

class RegisterUserManager extends UserManager {
  constructor(request, controllerType) {
    super(request, {
      name: "registerUser",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: false,
    });

    this.dataName = "user";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.userId = this.userId;
    jsonObj.avatar = this.avatar;
    jsonObj.socialCode = this.socialCode;
    jsonObj.password = this.password;
    jsonObj.fullname = this.fullname;
    jsonObj.email = this.email;
  }

  readRestParameters(request) {
    this.userId = request.body?.userId;
    this.avatar = request.body?.avatar;
    this.socialCode = request.body?.socialCode;
    this.password = request.body?.password;
    this.fullname = request.body?.fullname;
    this.email = request.body?.email;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.userId = request.mcpParams.userId;
    this.avatar = request.mcpParams.avatar;
    this.socialCode = request.mcpParams.socialCode;
    this.password = request.mcpParams.password;
    this.fullname = request.mcpParams.fullname;
    this.email = request.mcpParams.email;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async readRedisParameters() {
    this.socialProfile = this.socialCode
      ? await getRedisData(this.socialCode)
      : undefined;
  }

  async transformParameters() {
    try {
      this.avatar =
        this.socialProfile?.avatar ??
        (this.avatar
          ? this.avatar
          : `https://gravatar.com/avatar/${LIB.common.md5(this.email ?? "nullValue")}?s=200&d=identicon`);
    } catch (err) {
      hexaLogger.insertError(
        `Error transforming parameter avatar: ${err.message}`,
      );
      throw new BadRequestError(
        "errMsg_ErrorTransformingParameter",
        "SCRIPT_ERROR",
        {
          parameter: "avatar",
          script:
            "this.socialProfile?.avatar ?? (this.avatar ? this.avatar : `https://gravatar.com/avatar/${LIB.common.md5(this.email ?? 'nullValue')}?s=200&d=identicon`)",
          error: err.message,
        },
      );
    }
    try {
      this.password = this.socialProfile
        ? (this.password ?? LIB.common.randomCode())
        : this.password;
    } catch (err) {
      hexaLogger.insertError(
        `Error transforming parameter password: ${err.message}`,
      );
      throw new BadRequestError(
        "errMsg_ErrorTransformingParameter",
        "SCRIPT_ERROR",
        {
          parameter: "password",
          script:
            "this.socialProfile ? this.password ?? LIB.common.randomCode() : this.password",
          error: err.message,
        },
      );
    }
    try {
      this.fullname = this.socialProfile?.fullname ?? this.fullname;
    } catch (err) {
      hexaLogger.insertError(
        `Error transforming parameter fullname: ${err.message}`,
      );
      throw new BadRequestError(
        "errMsg_ErrorTransformingParameter",
        "SCRIPT_ERROR",
        {
          parameter: "fullname",
          script: "this.socialProfile?.fullname ?? this.fullname",
          error: err.message,
        },
      );
    }
    try {
      this.email = this.socialProfile?.email ?? this.email;
    } catch (err) {
      hexaLogger.insertError(
        `Error transforming parameter email: ${err.message}`,
      );
      throw new BadRequestError(
        "errMsg_ErrorTransformingParameter",
        "SCRIPT_ERROR",
        {
          parameter: "email",
          script: "this.socialProfile?.email ?? this.email",
          error: err.message,
        },
      );
    }
  }

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.userId = this.id;
    if (!this.userId) this.userId = newUUID(false);

    const dataClause = {
      id: this.userId,
      email: this.email,
      password: hashString(this.password),
      fullname: this.fullname,
      avatar: this.avatar,
      emailVerified: this.socialProfile?.emailVerified ?? false,
      roleId: this.socialProfile?.roleId ?? "user",
      isActive: true,
    };

    return dataClause;
  }

  checkParameterType_userId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_userId() {
    if (this.userId == null) return;

    if (Array.isArray(this.userId)) {
      throw new BadRequestError("errMsg_userIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_userId(this.userId)) {
      throw new BadRequestError("errMsg_userIdTypeIsNotValid");
    }
  }

  checkParameter_avatar() {
    if (this.avatar == null) return;

    if (Array.isArray(this.avatar)) {
      throw new BadRequestError("errMsg_avatarMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_socialCode() {
    if (this.socialCode == null) return;

    if (Array.isArray(this.socialCode)) {
      throw new BadRequestError("errMsg_socialCodeMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_password() {
    if (this.password == null) {
      throw new BadRequestError("errMsg_passwordisRequired");
    }

    if (Array.isArray(this.password)) {
      throw new BadRequestError("errMsg_passwordMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_fullname() {
    if (this.fullname == null) {
      throw new BadRequestError("errMsg_fullnameisRequired");
    }

    if (Array.isArray(this.fullname)) {
      throw new BadRequestError("errMsg_fullnameMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_email() {
    if (this.email == null) {
      throw new BadRequestError("errMsg_emailisRequired");
    }

    if (Array.isArray(this.email)) {
      throw new BadRequestError("errMsg_emailMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameters() {
    if (this.userId) this.checkParameter_userId();

    if (this.avatar) this.checkParameter_avatar();

    if (this.socialCode) this.checkParameter_socialCode();

    if (this.password) this.checkParameter_password();

    if (this.fullname) this.checkParameter_fullname();

    if (this.email) this.checkParameter_email();
  }

  async doBusiness() {
    const user = await dbScriptRegisterUser(this);
    return user;
  }

  async addToOutput() {}

  async raiseEvent() {
    UserRegisteredPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  async afterCheckParameters() {
    try {
      if (this.userId == null)
        this.deletedUser = await this.fetchhDeletedUser();
    } catch (err) {
      console.log("fetchhDeletedUser Action Error:", err.message);
      //**errorLog
      throw err;
    }

    try {
      if (this.deletedUser != null) await this.updateUserIdWithDeleted();
    } catch (err) {
      console.log("updateUserIdWithDeleted Action Error:", err.message);
      //**errorLog
      throw err;
    }
  }

  async afterBuildOutput() {
    try {
      await this.writeVerificationNeedsToResponse();
    } catch (err) {
      console.log(
        "writeVerificationNeedsToResponse Action Error:",
        err.message,
      );
      //**errorLog
      throw err;
    }
  }

  // Action Store

  /***********************************************************************
   ** Check and get if any deleted user exists with the same email
   ***********************************************************************/
  async fetchhDeletedUser() {
    // Fetch Object on childObject user

    const userQuery = { email: this.email, isActive: false };

    const { convertUserQueryToSequelizeQuery } = require("common");
    const scriptQuery = convertUserQueryToSequelizeQuery(userQuery);

    // get object from db
    const data = await getUserByQuery(scriptQuery);

    return data
      ? {
          id: data["id"],
        }
      : null;
  }

  /***********************************************************************
   ** Set the userId with the deleted user id to restore old record
   ***********************************************************************/
  async updateUserIdWithDeleted() {
    try {
      this["userId"] = this.deletedUser?.id ?? this.userId;

      return true;
    } catch (error) {
      console.error("AddToContextAction error:", error);
      throw error;
    }
  }

  /***********************************************************************
   ** Set if email or mobile verification needed
   ***********************************************************************/
  async writeVerificationNeedsToResponse() {
    try {
      this.output["emailVerificationNeeded"] = !this.emailVerified;

      this.output["mobileVerificationNeeded"] = false;

      return true;
    } catch (error) {
      console.error("AddToResponseAction error:", error);
      throw error;
    }
  }
}

module.exports = RegisterUserManager;
