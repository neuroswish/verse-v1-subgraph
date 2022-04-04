// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class PairCreated extends ethereum.Event {
  get params(): PairCreated__Params {
    return new PairCreated__Params(this);
  }
}

export class PairCreated__Params {
  _event: PairCreated;

  constructor(event: PairCreated) {
    this._event = event;
  }

  get exchangeAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get hyperobjectAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get name(): string {
    return this._event.parameters[2].value.toString();
  }

  get symbol(): string {
    return this._event.parameters[3].value.toString();
  }

  get creator(): Address {
    return this._event.parameters[4].value.toAddress();
  }
}

export class pairFactory__createResult {
  value0: Address;
  value1: Address;

  constructor(value0: Address, value1: Address) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    return map;
  }
}

export class pairFactory extends ethereum.SmartContract {
  static bind(address: Address): pairFactory {
    return new pairFactory("pairFactory", address);
  }

  bondingCurve(): Address {
    let result = super.call("bondingCurve", "bondingCurve():(address)", []);

    return result[0].toAddress();
  }

  try_bondingCurve(): ethereum.CallResult<Address> {
    let result = super.tryCall("bondingCurve", "bondingCurve():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  create(
    _name: string,
    _symbol: string,
    _reserveRatio: BigInt,
    _slopeInit: BigInt,
    _transactionShare: BigInt,
    _baseURI: string
  ): pairFactory__createResult {
    let result = super.call(
      "create",
      "create(string,string,uint256,uint256,uint256,string):(address,address)",
      [
        ethereum.Value.fromString(_name),
        ethereum.Value.fromString(_symbol),
        ethereum.Value.fromUnsignedBigInt(_reserveRatio),
        ethereum.Value.fromUnsignedBigInt(_slopeInit),
        ethereum.Value.fromUnsignedBigInt(_transactionShare),
        ethereum.Value.fromString(_baseURI)
      ]
    );

    return new pairFactory__createResult(
      result[0].toAddress(),
      result[1].toAddress()
    );
  }

  try_create(
    _name: string,
    _symbol: string,
    _reserveRatio: BigInt,
    _slopeInit: BigInt,
    _transactionShare: BigInt,
    _baseURI: string
  ): ethereum.CallResult<pairFactory__createResult> {
    let result = super.tryCall(
      "create",
      "create(string,string,uint256,uint256,uint256,string):(address,address)",
      [
        ethereum.Value.fromString(_name),
        ethereum.Value.fromString(_symbol),
        ethereum.Value.fromUnsignedBigInt(_reserveRatio),
        ethereum.Value.fromUnsignedBigInt(_slopeInit),
        ethereum.Value.fromUnsignedBigInt(_transactionShare),
        ethereum.Value.fromString(_baseURI)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new pairFactory__createResult(value[0].toAddress(), value[1].toAddress())
    );
  }

  exchangeLogic(): Address {
    let result = super.call("exchangeLogic", "exchangeLogic():(address)", []);

    return result[0].toAddress();
  }

  try_exchangeLogic(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "exchangeLogic",
      "exchangeLogic():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  hyperobjectLogic(): Address {
    let result = super.call(
      "hyperobjectLogic",
      "hyperobjectLogic():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_hyperobjectLogic(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "hyperobjectLogic",
      "hyperobjectLogic():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _bondingCurve(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreateCall extends ethereum.Call {
  get inputs(): CreateCall__Inputs {
    return new CreateCall__Inputs(this);
  }

  get outputs(): CreateCall__Outputs {
    return new CreateCall__Outputs(this);
  }
}

export class CreateCall__Inputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }

  get _name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _symbol(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _reserveRatio(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _slopeInit(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _transactionShare(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _baseURI(): string {
    return this._call.inputValues[5].value.toString();
  }
}

export class CreateCall__Outputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }

  get exchange(): Address {
    return this._call.outputValues[0].value.toAddress();
  }

  get hyperobject(): Address {
    return this._call.outputValues[1].value.toAddress();
  }
}
