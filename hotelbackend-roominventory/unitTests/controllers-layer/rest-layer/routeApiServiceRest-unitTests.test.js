const { expect } = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");

describe("CreateRoomRestController", () => {
  let createRoom;
  let processRequestStub;
  let req, res, next;

  beforeEach(() => {
    req = { requestId: "req-456" };
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };
    next = sinon.stub();

    processRequestStub = sinon.stub();

    createRoom = proxyquire(
      "../../../src/controllers-layer/rest-layer/main/room/create-room-api.js",
      {
        serviceCommon: {
          HexaLogTypes: {},
          hexaLogger: { insertInfo: sinon.stub(), insertError: sinon.stub() },
        },
        apiLayer: {
          CreateRoomManager: sinon.stub(),
        },
        "../../RoomInventoryServiceRestController": class {
          constructor(name, routeName, _req, _res, _next) {
            this._req = _req;
            this._res = _res;
            this._next = _next;
            this.processRequest = processRequestStub;
          }
        },
      },
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create instance and call processRequest", async () => {
    await createRoom(req, res, next);

    expect(processRequestStub.calledOnce).to.be.true;
  });
});
