import { PairCreated as PairCreatedEvent } from "../generated/pairFactory/pairFactory"
import { PairCreated } from "../generated/schema"

export function handlePairCreated(event: PairCreatedEvent): void {
  let entity = new PairCreated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.exchangeAddress = event.params.exchangeAddress
  entity.hyperobjectAddress = event.params.hyperobjectAddress
  entity.name = event.params.name
  entity.symbol = event.params.symbol
  entity.creator = event.params.creator
  entity.save()
}
